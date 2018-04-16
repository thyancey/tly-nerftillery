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

const DEBUG_MESSAGE_TIMEOUT = 2000;


const MainContainerComponent = React.createClass({
  getInitialState() {
    return {
      debugMessages: [],
      debugMessageCounter: 0
    };
  },

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

  changeMap(mapId){
    this.props.getMapData({
      allMapData: fromJS(staticData.maps),
      defaultId: mapId
    });
  },

  onFireCommand(calibrationData){
    let fireMessage = '';

    if(calibrationData){
      calibrationData.map((cd, i) => {
        if(i !== 0){
          fireMessage += '\n';
        }
        fireMessage += `${this.state.debugMessageCounter} - ${cd.get('id')} - ( rotX: ${cd.get('rotX')}°, rotY: ${cd.get('rotY')}° )`;
      })

      this.addDebugMessage(fireMessage);
    }
  },

  renderDebugText(){
    //- and render em backwards so they look right!

    if(this.state.debugMessages.length > 0){
      return (
        <div id="debug-container">
          <ul>
            {this.state.debugMessages.slice(0).reverse().map((fm, idx) => (
              <li key={idx}>
                <div className="debug-container-child">
                  <h3>{fm}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }else{
      return null;
    }
  },

  render() {
    console.log('Main.render()')
    global.staticData = staticData;

    let headerMapData = null;

    global.testMain = this;

    if(this.props.allMapData){
      const maps = this.props.allMapData.map((m, idx) => (
        m.get('id')
      ));

      headerMapData = {
        current: this.props.mapData && this.props.mapData.get('id'),
        maps: maps
      }
    }

    return (
      <div className="main">
        <Header scale={this.props.mapScale} onZoom={this.onZoom} headerMapData={headerMapData} changeMap={this.changeMap}/>
        { this.getLocationSettings(this.props.curLocation) }
        <div className="container-map">
          { this.renderDebugText() }
          <MapController onFireCommand={this.onFireCommand} />
        </div>
      </div>
    );
  },














/* This is all for debugging coordinates. It's horrible and should be fixed, the timers aren't done in a good react way at all */
  killDebugTimer(){
    if(this.debugTimer){
      global.clearTimeout(this.debugTimer);
      this.debugTimer = null;
    }
  },

  startDebugTimer(){
    this.killDebugTimer();
    global.setTimeout(t => {
      this.removeDebugMessages();
    }, DEBUG_MESSAGE_TIMEOUT);
  },

  removeDebugMessages(){
    this.killDebugTimer();
    const fmLen = this.state.debugMessages.length;

    if(fmLen > 0){
      const fm = this.state.debugMessages;
      fm.shift();

      if(fmLen > 1){
        this.startDebugTimer();
      }
      this.setState({'debugMessages': fm});
    }
  },

  addDebugMessage(m){
    const debugMessages = this.state.debugMessages;
    debugMessages.push(m);
    const dbc = this.state.debugMessageCounter;
    this.setState({'debugMessages': debugMessages, 'debugMessageCounter': dbc + 1 });
    this.startDebugTimer();
  }
});

function mapStateToProps(state) {
  global.store = state;
  return {
    mapScale: state.get('mapData').get('scale'),
    allMapData: state.get('allMapData'),
    curLocation: state.get('curLocation'),
    debugMode: state.get('debugMode')
  };
}

export const MainContainer = connect(
  mapStateToProps,
  actions
)(MainContainerComponent);