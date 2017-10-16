import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'store/actions';
import {fromJS, Map, List} from 'immutable';

import staticData from 'data/staticData.js';

import Header from 'components/header';
import MapController from 'components/map-controller';
import LocationSettings from 'components/location-settings';

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

  onCloseLocation(){
    this.props.loadLocationSettings(null);
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
        {this.props.curLocation && (
          <LocationSettings location={this.props.curLocation} onCloseLocation={this.onCloseLocation}/>
        )}
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
    curLocation: state.get('curLocation')
  };
}

export const MainContainer = connect(
  mapStateToProps,
  actions
)(MainContainerComponent);