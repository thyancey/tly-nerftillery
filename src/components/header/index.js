import React from 'react';

import Zoom from './zoom';

require('./style.less');


export default React.createClass({
  onChangeMap(e){
    // console.log(e.target.value);
    this.props.changeMap(e.target.value);
  },

  /* TODO, this is just for testing, store access and display should be refactored if actually used */
  renderMapDropdown(){
    if(this.props.headerMapData){
      // const mapsArray = this.props.allMapData && this.props.allMapData.toJS();

      return (
        <div id="map-dropdown">
          <select defaultValue={this.props.headerMapData.current} onChange={this.onChangeMap}>
            {
              this.props.headerMapData.maps.map((m, idx) => (
                <option key={idx} value={m}>{m}</option>
              ))
            }
          </select>
        </div>
      );
    }else{
      return null;
    }
  },

  render() {
    return (
      <div id="header">
        { this.renderMapDropdown() }
        {/*
        <div className="menu-btn">
          <a title="menu" />
          <img/>
        </div>
      */}
        <Zoom scale={this.props.scale} onZoom={this.props.onZoom}/>
        <div className="logo">
          <img/>
        </div>
      </div>
    );
  }
});
