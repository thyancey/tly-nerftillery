import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'store/actions';
import {fromJS, Map, List} from 'immutable';
import RoundTo from 'util/round-to';
import staticData from 'data/staticData.js';

import Header from 'components/header';
import MapController from 'components/map-controller';
import TurretSettings from 'components/location-settings/turret';

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

  onZoom(direction){
    const mapScale = this.props.mapScale;

    if(direction === 'out'){
      this.props.setMapScale(RoundTo(mapScale - .1, 2));
    }else if(direction === 'in'){
      this.props.setMapScale(RoundTo(mapScale + .1, 2));
    }
  },

  getMarker(curLocation){
    if(curLocation && curLocation.get('type') === 'turret'){
      return  (<TurretSettings location={curLocation} onCloseLocation={this.onCloseLocation}/>)
    }
  },

  render() {
    console.log('Main.render()')
    global.staticData = staticData;
    
    return (
      <div className="main">
        <Header scale={this.props.mapScale} onZoom={this.onZoom} />
        { this.getMarker(this.props.curLocation) }
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
    curLocation: state.get('curLocation')
  };
}

export const MainContainer = connect(
  mapStateToProps,
  actions
)(MainContainerComponent);