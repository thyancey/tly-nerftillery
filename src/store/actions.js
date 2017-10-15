export function setState(state) {
  return {
    type: 'SET_STATE',
    state
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


export function addTarget(payload) {
  return {
    type: 'ADD_TARGET',
    payload
  };
}

export function setMapScale(payload) {
  return {
    type: 'SET_MAP_SCALE',
    payload
  };
}


export function getTargets(payload) {
  return {
    type: 'GET_TARGETS',
    payload
  };
}



export function getMapData(payload) {
  return {
    type: 'GET_MAP_DATA',
    payload
  };
}
