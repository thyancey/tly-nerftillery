import React from 'react';

import Zoom from './zoom';

require('./style.less');


export default React.createClass({
  render() {
    
    return (
      <div id="header">
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
