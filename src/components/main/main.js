import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'store/actions';
import {fromJS, Map, List} from 'immutable';

import staticData from 'data/staticData.js';

import Header from 'components/header';
import MapController from 'components/map-controller';

require('./style.less');


const MainContainerComponent = React.createClass({
  componentDidMount(){
    this.addListeners();

    this.getMapData();
  },

  getMapData(){
    this.props.getMapData({
      allMapData: fromJS(staticData.maps),
      defaultId: staticData.defaultId
    });
  },

  addListeners(){
    // window.addEventListener('contextmenu', e => {
    //   e.preventDefault();
    //   this.openContextMenu(e);
    // });
  },

  openContextMenu(e){
    console.log('open context menu at (' + e.clientX + ', ' + e.clientY + ')');
  },


  render() {
    console.log('Main.render()')
    global.staticData = staticData;
    
    return (
      <div className="main">
        <Header />
        <div className="container-map">
          <MapController />
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  global.store = state;
  return {
  };
}

export const MainContainer = connect(
  mapStateToProps,
  actions
)(MainContainerComponent);