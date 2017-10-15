import {Map, List} from 'immutable';
import log from 'util/logger.js';
import roundTo from 'util/round-to';

export default function(state = Map({ title: '' }), action) {
  switch (action.type) {
    case 'SET_STATE':
      console.log('reducer.SET_STATE');
      return state.merge(action.state);
    case 'SET_TITLE':
      console.log('reducer.SET_TITLE');
      return state.set('title', action.payload);

    case 'SET_ITEMS':
      console.log('reducer.SET_ITEMS');
      return setItems(state, action);

    case 'GET_MAP_DATA':
      console.log('reducer.GET_MAP_DATA');
      return getMapData(state, action);

    case 'GET_TARGETS':
      console.log('reducer.GET_TARGETS');
      return getTargets(state, action);

    case 'ADD_TARGET':
      console.log('reducer.ADD_TARGET');
      return addTarget(state, action);

    case 'SET_MAP_SCALE':
      console.log('reducer.SET_MAP_SCALE');
      return setMapScale(state, action);

    default: return state;
  }
}

function setItems(state, action){
  // log('setItems', state.get('items'), 'reducer');

  const items = {
    test1: 'target 1',
    test2: 'target 2'
  }

  return state.withMutations((ctx) => {
    ctx.set('items', items);
  });
}

/*
eventaully will be fired from database info, 
expects action.payload to be 
{
  allMapData: a List of Maps containing map and target information
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
  const mapData = refreshMapData(foundMap.get('data'), scale).merge({
    id: foundMap.get('id'),
    title: foundMap.get('title'),
    image: foundMap.get('image')
  });
  console.log("mapData", mapData.toJS())
  const targets = refreshTargets(mapData, foundMap.get('targets'));

  return state.withMutations((ctx) => {
    ctx.set('mapData', mapData).set('allMapData', allMapData).set('targets', targets);
  });
}

//- not used ATM
//- expects a List of target data Maps (should have title, percX and percY)
function getTargets(state, action){
  console.log('getTargets', action.payload)
  const targets = refreshTargets(state.get('mapData'), action.payload)

  return state.withMutations((ctx) => {
    ctx.set('targets', targets);
  });
}


function addTarget(state, action){
  // log('addTarget', action.payload, 'reducer');

  const targets = state.get('targets') || new List();

  const mapData = state.get('mapData');
  const percX = roundTo((action.payload.x / (mapData.get('origWidth') * mapData.get('scale'))), 2);
  const percY = roundTo((action.payload.y / (mapData.get('origHeight') * mapData.get('scale'))), 2);

  return state.withMutations((ctx) => {
    ctx.set('targets', targets.push(new Map({
      title: action.payload.title,
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

  const targets = refreshTargets(newMapData, state.get('targets'));

  return state.withMutations((ctx) => {
    ctx.set('mapData', newData).set('targets', targets);
  });
}

function refreshMapData(mapData, scale){
  return mapData.merge({
    scale: scale,
    width: scale * mapData.get('origWidth'),
    height: scale * mapData.get('origHeight')
  });
}

function refreshTargets(mapData, targets){
  return targets.map((target, idx) => {
    return (
      target.merge({
        x: (target.get('percX') || 0) * mapData.get('width'),
        y: (target.get('percY') || 0) * mapData.get('height')
      })
    )
  });
}
