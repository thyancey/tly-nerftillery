import React from 'react';

require('./style.less');

import Tooltip from './tooltip';
import BackgroundBlocker from '../misc/background-blocker';

export default React.createClass({
  getInitialState() {
    return {
      isOpen: false
    };
  },

  onContextMenu(e){
    if(!this.props.debugMode){
      // console.log('location.contextMenu',e);
      e.preventDefault();
      e.stopPropagation();
      this.setState({ isOpen: true });
    }
  },

  onSettings(e, id){
    // console.log('onSettings');
    e.stopPropagation();
    if(this.props.locationData.get('type') === 'turret'){
      this.setState({ isOpen:false });
    }else{
      // console.log('only turrets can set location settings');
    }

    this.props.onLocationSettings(id);
  },

  onButtonFire(e){
    // console.log('onButtonFire', e.button);

    if(e.button === 0 && this.props.locationData.get('type') === 'target'){
      const calibrationData = this.props.locationData.get('calibration')
      this.props.fireCommand(calibrationData);
    }
  },

  onBackgroundBlocker(e){
    // console.log('Location.onBackgroundBlocker', e.type);
    this.setState({ isOpen:false });
  },

  renderMarker(){
    return (
      <div  className='marker-bg' 
            onTouchStart={this.onButtonFire}
            onMouseDown={this.onButtonFire}
            onContextMenu={this.onContextMenu}/>
    );
  },

  render() {
    let className = 'location';
    if(this.state.isOpen) className += ' open';
    if(this.props.locationData.get('type')) className += ' type-' + this.props.locationData.get('type');

    const positionStyle = { left:this.props.locationData.get('x'), top:this.props.locationData.get('y') };

    if(this.state.isOpen){
      return (
        <div className={className} style={positionStyle} >
          <Tooltip  id={this.props.id}
                    title={this.props.locationData.get('title')}
                    description={this.props.locationData.get('description')}
                    calibrationData={this.props.locationData.get('calibration')}
                    openLeft={this.props.locationData.get('percX') > .5}
                    openUp={this.props.locationData.get('percY') > .5}
                    type={this.props.locationData.get('type')}
                    onSettings={this.onSettings}
                    onButtonFire={this.props.fireCommand} />
          { this.renderMarker() }
          <BackgroundBlocker onSelected={this.onBackgroundBlocker}/>
        </div>
      );
    }else{
      return (
        <div className={className} style={positionStyle} >
          { this.renderMarker() }
        </div>
      );
    }
  }
});
