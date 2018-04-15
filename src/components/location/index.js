import React from 'react';

require('./style.less');

import Tooltip from './tooltip';

export default React.createClass({
  getInitialState() {
    return {
      isOpen: false
    };
  },

  onContextMenu(e){
    console.log('contextMenu',e);
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isOpen: true });
  },

  onSettings(e, id){
    console.log('onSetting')
    e.stopPropagation();
    if(this.props.locationData.get('type') === 'turret'){
      this.setState({ isOpen:false });
    }else{
      console.log('NOPE!')
    }

    this.props.onLocationSettings(id);
  },

  onButtonFire(e){
    console.log('onButtonFire', e.button);

    if(e.button === 0){
      const calibrationData = this.props.locationData.get('calibration')
      this.props.fireCommand(calibrationData);
    }
  },

  render() {
    let className = 'location';
    if(this.state.isOpen) className += ' open';
    if(this.props.locationData.get('type')) className += ' type-' + this.props.locationData.get('type');

    return (
      <div  className={className}
            onTouchStart={this.onButtonFire}
            onMouseDown={this.onButtonFire}
            onContextMenu={this.onContextMenu}
            style={{ left:this.props.locationData.get('x'), top:this.props.locationData.get('y') }} >
        {this.state.isOpen && (
          <Tooltip id={this.props.id}
                            title={this.props.locationData.get('title')}
                            description={this.props.locationData.get('description')}
                            calibrationData={this.props.locationData.get('calibration')}
                            openLeft={this.props.locationData.get('percX') > .5}
                            openUp={this.props.locationData.get('percY') > .5}
                            type={this.props.locationData.get('type')}
                            onSettings={this.onSettings}
                            onButtonFire={this.props.fireCommand} />
        )}
        <div className="marker-bg" />
      </div>
    );
  }
});
