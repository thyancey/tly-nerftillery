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

    case 'ADD_TARGET':
      console.log('reducer.ADD_TARGET');
      return addTarget(state, action);

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



function addTarget(state, action){
  log('addTarget', action.payload, 'reducer');

  const targets = state.get('targets') || new List();

  const map = state.get('map');
  const scaleX = roundTo((action.payload.x / (map.get('width') * map.get('scale'))), 3);
  const scaleY = roundTo((action.payload.y / (map.get('height') * map.get('scale'))), 3);


  // return state.withMutations((ctx) => {
  //   ctx.set('targets', targets.push({
  //     title: action.payload.title,
  //     x: action.payload.x,
  //     y: action.payload.y,
  //     scaleX: action.payload.scaleX,
  //     scaleY: action.payload.scaleY
  //   }));
  // });

  return state.withMutations((ctx) => {
    ctx.set('targets', targets.push({
      title: action.payload.title,
      x: action.payload.x,
      y: action.payload.y,
      scaleX: scaleX,
      scaleY: scaleY
    }));
  });
}


