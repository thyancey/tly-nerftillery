export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}
export function setDebugMode(isDebugOn) {
  return {
    type: 'SET_DEBUG_MODE',
    payload: isDebugOn
  };
}


export function setTitle(payload) {
  return {
    type: 'SET_TITLE',
    payload
  };
}



export function setItems(payload) {
  return {
    type: 'SET_ITEMS',
    payload
  };
}


export function addLocation(payload) {
  return {
    type: 'ADD_LOCATION',
    payload
  };
}

export function setMapScale(payload) {
  return {
    type: 'SET_MAP_SCALE',
    payload
  };
}


export function getLocations(payload) {
  return {
    type: 'GET_LOCATIONS',
    payload
  };
}



export function getMapData(payload) {
  return {
    type: 'GET_MAP_DATA',
    payload
  };
}

export function updateLocation(payload) {
  return {
    type: 'UPDATE_LOCATION',
    payload
  };
}

export function loadLocationSettings(payload){
  return{
    type: 'LOAD_LOCATION_SETTINGS',
    payload
  }
}