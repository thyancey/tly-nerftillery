import React from 'react';

require('./style.less');


export default React.createClass({
  render() {
    
    return (
      <div id="header">
        <div className="menu-btn">
          <a title="menu" />
          <img/>
        </div>
        <div className="logo">
          <img/>
        </div>
      </div>
    );
  }
});
