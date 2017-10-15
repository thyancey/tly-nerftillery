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