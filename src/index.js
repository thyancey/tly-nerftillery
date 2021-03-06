require('themes/app.less');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { setState } from './store/actions';
import reducer from './store/reducer';

import { MainContainer } from './components/main/main';
import staticData from './data/staticData.js';

const store = createStore(reducer);
let state = {
  title: 'Nerftillery',
  mapData:{}
};
store.dispatch(setState(state));

ReactDOM.render(
  <Provider store={store}>
    <MainContainer staticData={staticData} />
  </Provider>,
  document.getElementById('app')
)