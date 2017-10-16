import {Map, List} from 'immutable';
import log from 'util/logger.js';
import roundTo from 'util/round-to';


const SNAP_SENSITIVITY = 4; //- how many decimals for x/y percentages to keep

export default function(state = Map({ title: '' }), action) {
  switch (action.type) {
    case 'SET_STATE':
      console.log('reducer.SET_STATE');
      return state.merge(action.state);

    case 'GET_MAP_DATA':
      console.log('reducer.GET_MAP_DATA');
      return getMapData(state, action);

    case 'GET_LOCATIONS':
      console.log('reducer.GET_LOCATIONS');
      return getLocations(state, action);

    case 'ADD_LOCATION':
      console.log('reducer.ADD_LOCATION');
      return addLocation(state, action);

    case 'SET_MAP_SCALE':
      console.log('reducer.SET_MAP_SCALE');
      return setMapScale(state, action);

    case 'UPDATE_LOCATION':
      console.log('reducer.UPDATE_LOCATION');
      return updateLocation(state, action);

    case 'LOAD_LOCATION_SETTINGS':
      console.log('reducer.LOAD_LOCATION_SETTINGS');
      return loadLocationSettings(state, action);


    default: return state;
  }
}


/*
eventaully will be fired from database info, 
expects action.payload to be 
{
  allMapData: a List of Maps containing map and location information
  defaultId: key to retrieve for the default map to display
}
*/
function getMapData(state, action){
  const mapId = action.payload.defaultId;
  const allMapData = action.payload.allMapData;

  const foundMap = allMapData.filter(md => md.get('id') === mapId).first();
  if(!foundMap){
    //- some kind of default stuff so error can render out nicely
    return state;
  }

  const scale = foundMap.get('data').get('scale') || 1;

  //- do any scaling and mutate saved format into a more usable flat object
  const mapData = refreshMapData(foundMap.get('data'), scale).merge({
    id: foundMap.get('id'),
    title: foundMap.get('title'),
    image: foundMap.get('image')
  });

  //- get updated scaled position for all locaiton markers
  const locations = refreshLocations(mapData, foundMap.get('locations'));

  return state.withMutations((ctx) => {
    ctx.set('mapData', mapData).set('allMapData', allMapData).set('locations', locations);
  });
}

//- not used ATM
//- expects a List of location data Maps (should have title, percX and percY)
function getLocations(state, action){
  console.log('getLocations', action.payload)
  const locations = refreshLocations(state.get('mapData'), action.payload)

  return state.withMutations((ctx) => {
    ctx.set('locations', locations);
  });
}



function getLocationX(orig, mapData){
  return roundTo((orig / (mapData.get('origWidth') * mapData.get('scale'))), SNAP_SENSITIVITY);
}

function getLocationY(orig, mapData){
  return roundTo((orig / (mapData.get('origHeight') * mapData.get('scale'))), SNAP_SENSITIVITY);
}

//- action.payload is an x/y coordinate based on real position on the current map image
function addLocation(state, action){
  // log('addLocation', action.payload, 'reducer');

  const locations = state.get('locations') || new List();

  const mapData = state.get('mapData');
  const percX = getLocationX(action.payload.x, mapData);
  const percY = getLocationY(action.payload.y, mapData);

  return state.withMutations((ctx) => {
    ctx.set('locations', locations.push(new Map({
      title: action.payload.title,
      description: action.payload.description,
      percX: percX,
      percY: percY,
      x: action.payload.x,
      y: action.payload.y
    })));
  });
}


function setMapScale(state, action){
  // log('setMapScale', action.payload, 'reducer');
  const mapData = state.get('mapData');
  const scale = action.payload;

  const newMapData = refreshMapData(mapData, scale);

  const locations = refreshLocations(newMapData, state.get('locations'));

  return state.withMutations((ctx) => {
    ctx.set('mapData', newData).set('locations', locations);
  });
}

function updateLocation(state, action){
  const location = getLocationWithId(state.get('locations'), action.payload.id);

  if(location){
    const mapData = state.get('mapData');
    const fixedLocation = refreshLocation(mapData, location.merge({
      percX: getLocationX(action.payload.x, mapData),
      percY: getLocationY(action.payload.y, mapData)
    }));
    const locations = state.get('locations').set(action.payload.id, fixedLocation);

    return state.withMutations((ctx) => {
      ctx.set('locations', locations);
    });
  }else{
    return state;
  }
}

function loadLocationSettings(state, action){
  const location = getLocationWithId(state.get('locations'), action.payload);

  return state.withMutations((ctx) => {
    ctx.set('curLocation', location);
  });
}

function getLocationWithId(locations, id){
  const location = locations.filter((loc, idx) => idx === id).first();
  if(!location){
    console.warn('could not find location with id ' + id);
  }
  return location;
}

function refreshMapData(mapData, scale){
  return mapData.merge({
    scale: scale,
    width: scale * mapData.get('origWidth'),
    height: scale * mapData.get('origHeight')
  });
}

function refreshLocations(mapData, locations){
  return locations.map((location, idx) => {
    return (
      location.merge({
        x: (location.get('percX') || 0) * mapData.get('width'),
        y: (location.get('percY') || 0) * mapData.get('height')
      })
    )
  });
}

function refreshLocation(mapData, location){
  return (
    location.merge({
      x: (location.get('percX') || 0) * mapData.get('width'),
      y: (location.get('percY') || 0) * mapData.get('height')
    })
  );
}
