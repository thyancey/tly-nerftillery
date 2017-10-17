import React from 'react';

require('../style.less');


export default React.createClass({

  render() {
    
    return (
      <div className="zoom">
        <div className="zoom-button">
          <button id="zoomOut" onClick={() => this.props.onZoom('out')}>{'-'}</button>
        </div>
        <div className="zoom-text">
          <h3>{this.props.scale}</h3>
          <h3>{'zoom'}</h3>
        </div>
        <div className="zoom-button">
          <button id="zoomIn" onClick={() => this.props.onZoom('in')}>{'+'}</button>
        </div>
      </div>
    );
  }
});
