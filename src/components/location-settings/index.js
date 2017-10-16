import React from 'react';

require('./style.less');


export default React.createClass({
  render() {
    
    return (
      <div id="location-settings">
        <div className="header">
          <h2 className="left">{'Edit Location'}</h2>
          <div className="right" onClick={this.props.onCloseLocation}/> 
        </div>
        <div className="body">
          <input type="text" placeholder="Name" defaultValue={this.props.location.get('title')} />
          <textarea placeholder="Description" defaultValue={this.props.location.get('description')}/>
          <select defaultValue={this.props.location.get('type') || 'location'}>
            <option value="location">{'Location'}</option>
            <option value="turret">{'Turret'}</option>
          </select>
        </div>
        <div className="footer">
          <button>{'CALIBRATE'}</button>
          <button className="buddies left" onClick={this.props.onUpdateLocation}>{'SAVE'}</button>
          <button className="buddies right" onClick={this.props.onCloseLocation}>{'CANCEL'}</button>
        </div>
      </div>
    );
  }
});
