import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'store/actions';

require('./style.less');

const MapComponent = React.createClass({
  getInitialState() {
    return {
      headerHeight: 0
    };
  },

  onMapClick(e){
    this.addTarget(e.clientX, e.clientY);
  },

  addTarget(x, y){
    console.log('click (' + x + ', ' + y + ')')
    const offsetX = $('.container-map').scrollLeft();
    const offsetY = 0 - this.state.headerHeight + $('.container-map').scrollTop();

    this.props.addTarget({
      title: 'buddyboy',
      x: x + offsetX,
      y: y + offsetY
    });
  },

  componentDidMount(){
    this.setState({
      headerHeight: global.$('#header').outerHeight()
    });
  },

  getMapStyle(){
    return {
      width: this.props.mapScaledWidth,
      height: this.props.mapScaledHeight
    }
  },

  renderTarget(tData, idx){
    return(
      <div key={'t-' + idx} className="target" style={{left:tData.x, top:tData.y}}>
        <div className="target-bg"/>
      </div>
    )
  },

  render() {
    global.testo = this;
    
    return (
      <div className="map" onClick={this.onMapClick} style={this.getMapStyle()}>
        <div className="container-targets" style={this.getMapStyle()}>
          {this.props.targets.map((t, idx) => (
            this.renderTarget(t, idx)
          ))}
        </div>
        <div className="map-image"/>
      </div>
    );
  }
});

function mapStateToProps(state) {
  global.store = state;
  return {
    targets: state.get('targets'),
    mapScale: state.get('map').get('scale'),
    mapWidth: state.get('map').get('width'),
    mapHeight: state.get('map').get('height'),
    mapScaledWidth: state.get('map').get('width') * state.get('map').get('scale'),
    mapScaledHeight: state.get('map').get('height') * state.get('map').get('scale')
  };
}

const MapController = connect(
  mapStateToProps,
  actions
)(MapComponent);

export default MapController;