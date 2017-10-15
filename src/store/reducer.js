import {Map} from 'immutable';
import log from 'util/logger.js';

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

    default: return state;
  }
}

function setItems(state, action){
  log('setItems', state.get('items'), 'reducer');

  const items = {
    test1: 'target 1',
    test2: 'target 2'
  }

  return state.withMutations((ctx) => {
    ctx.set('items', items);
  });
}



