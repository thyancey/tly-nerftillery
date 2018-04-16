import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'store/actions';
import {fromJS, Map, List} from 'immutable';
import RoundTo from 'util/round-to';
import staticData from 'data/staticData.js';

import Header from 'components/header';
import MapController from 'components/map-controller';
import LocationSettings from 'components/location-settings';
import BackgroundBlocker from 'components/misc/background-blocker';

require('./style.less');


const MainContainerComponent = React.createClass({
  componentDidMount(){
    this.addListeners();

    this.getMapData();
  },

  componentWillUnmount(){
    this.removeListeners();
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
    document.addEventListener('keydown', this.onDocumentKeyDown);
  },

  removeListeners(){
    document.removeEventListener('keydown', this.onDocumentKeyDown);
  },

  onDocumentKeyDown(e){
    if(e.keyCode === 192){
      this.toggleDebugMode();
    }
  },

  toggleDebugMode(forceMode){
    if(forceMode !== undefined){
      this.props.setDebugMode(forceMode);
    }else{
      this.props.setDebugMode(!this.props.debugMode);
    }
  },

  onZoom(direction){
    const mapScale = this.props.mapScale;

    if(direction === 'out'){
      this.props.setMapScale(RoundTo(mapScale - .1, 2));
    }else if(direction === 'in'){
      this.props.setMapScale(RoundTo(mapScale + .1, 2));
    }
  },

  getLocationSettings(curLocation){
    if(curLocation && curLocation.get('type') === 'turret'){
      return  (
        <div>
          <LocationSettings location={curLocation} onCloseLocation={this.onCloseLocation}/>
          <BackgroundBlocker />
        </div>
      )
    }
  },

  render() {
    console.log('Main.render()')
    global.staticData = staticData;
    
    return (
      <div className="main">
        <Header scale={this.props.mapScale} onZoom={this.onZoom} />
        { this.getLocationSettings(this.props.curLocation) }
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
    mapScale: state.get('mapData').get('scale'),
    curLocation: state.get('curLocation'),
    debugMode: state.get('debugMode')
  };
}

export const MainContainer = connect(
  mapStateToProps,
  actions
)(MainContainerComponent);