import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'store/actions';

import Location from './location';

require('./style.less');

const MapComponent = React.createClass({
  getInitialState() {
    return {
      headerHeight: 0
    };
  },

  onMapClick(e){
    this.addLocation(e.clientX, e.clientY);
  },

  addLocation(x, y){
    console.log('click (' + x + ', ' + y + ')')
    const offsetX = $('.container-map').scrollLeft();
    const offsetY = 0 - this.state.headerHeight + $('.container-map').scrollTop();

    this.props.addLocation({
      title: 'new location',
      x: x + offsetX,
      y: y + offsetY
    });
  },

  componentDidMount(){
    this.setState({
      headerHeight: global.$('#header').outerHeight()
    });
  },

  //- for debugging for now
  setMapScale(scaleValue){
    this.props.setMapScale(scaleValue);
  },

  getSizing(){
    return {
      width: this.props.mapWidth,
      height: this.props.mapHeight
    }
  },

  render() {
    global.testo = this;
    if(this.props.mapImage){
      return (
        <div className="map" onClick={this.onMapClick} style={this.getSizing()}>
          <div className="container-locations" style={this.getSizing()}>
            {this.props.locations.map((l, idx) => (
              <Location key={idx} locationData={l}/> 
            ))}
          </div>
          <div className="map-image" style={{backgroundImage: 'url("' + this.props.mapImage + '")'}}/>
        </div>
      );
    }else{
      return (
        <div>
          <h1>{'Map loading'}</h1>
        </div>
      );
    }
  }
});

function mapStateToProps(state) {
  global.store = state;
  return {
    locations: state.get('locations'),
    mapScale: state.get('mapData').get('scale'),
    mapWidth: state.get('mapData').get('width'),
    mapHeight: state.get('mapData').get('height'),
    mapImage: state.get('mapData').get('image'),
    mapTitle: state.get('mapData').get('title')
  };
}

const MapController = connect(
  mapStateToProps,
  actions
)(MapComponent);

export default MapController;