import React from 'react';

require('../style.less');

import LocationInfo from './location-info';

export default Location = React.createClass({
  getInitialState() {
    return {
      isOpen: false
    };
  },

  onTargetDown(e){
    console.log('onTargetDown')
    e.stopPropagation();
  },

  onTouchStart(e){
    console.log('onTouchStart')
    this.setState({ isOpen: !this.state.isOpen });
    e.stopPropagation();
  },

  mouseEnter(){
    // console.log('mouseEnter');
    this.setState({ isOpen: true });
  },

  mouseLeave(){
    // console.log('mouseLeave');
    this.setState({ isOpen: false });
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


  render() {
    let className = 'target';
    if(this.state.isOpen) className += ' open';
    if(this.props.locationData.get('type')) className += ' type-' + this.props.locationData.get('type');


    return (
      <div  className={className} 
            onClick={this.onLocationClick} 
            onTouchStart={this.onTouchStart} 
            onMouseEnter={this.mouseEnter} 
            onMouseLeave={this.mouseLeave}
            style={{ left:this.props.locationData.get('x'), top:this.props.locationData.get('y') }} >
        {this.state.isOpen && (
          <LocationInfo id={this.props.id}
                        title={this.props.locationData.get('title')}
                        description={this.props.locationData.get('description')}
                        calibrationData={this.props.locationData.get('calibration')}
                        openLeft={this.props.locationData.get('percX') > .5}
                        openUp={this.props.locationData.get('percY') > .5}
                        type={this.props.locationData.get('type')}
                        onSettings={this.onSettings} 
                        onButtonFire={this.props.fireCommand} />
        )}
        <div className="target-bg" />
      </div>
    );
  }
});