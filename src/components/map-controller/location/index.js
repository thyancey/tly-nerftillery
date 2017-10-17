import React from 'react';

require('../style.less');

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
    console.log('percX: ', this.props.locationData.get('percX'));
    // console.log('onTouchStart');
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
    e.stopPropagation();
    this.setState({ isOpen:false });

    this.props.onLocationSettings(id);
  },

  renderCalibration(calibrationData){
    if(calibrationData){
      const turretMarkup = [];
      calibrationData.keySeq().forEach((turretId, idx) => {
        turretMarkup.push(
          <div key={idx}>
            <p>{turretId}</p>
            <ul>
              <li>{'rotX: ' + calibrationData.get(turretId).get('rotX') + '°'}</li>
              <li>{'rotY: ' + calibrationData.get(turretId).get('rotY') + '°'}</li>
            </ul>
          </div>
        );
      });

      if(turretMarkup.length > 0){
        return(
          <div className="calibration-group">
            <h4>{'Calibration:'}</h4>
            {turretMarkup}
          </div>
        );
      }else{
        return null;
      }
    }else{
      return null;
    }
  },

  render() {
    let className = 'target';
    if(this.state.isOpen) className += ' open';
    if(this.props.locationData.get('type')) className += ' type-' + this.props.locationData.get('type');
    const openLeft = this.props.locationData.get('percX') > .5;

    console.log('percX: ', this.props.locationData.get('percX'));
    if(openLeft) className += ' open-left';

    const openUp = this.props.locationData.get('percY') > .5;
    console.log('percY: ', this.props.locationData.get('percY'));
    if(openUp) className += ' open-up';



    return (
      <div  className={className} 
            onClick={this.onLocationClick} 
            onTouchStart={this.onTouchStart} 
            onMouseEnter={this.mouseEnter} 
            onMouseLeave={this.mouseLeave}
            style={{ left:this.props.locationData.get('x'), top:this.props.locationData.get('y') }} >
        {this.state.isOpen && (
          <div className="location-info">
            <div className="location-info-header">
              <h3 className="left">{this.props.locationData.get('title')}</h3>
              <div  className="right" 
                    onMouseDown={e => this.onSettings(e, this.props.id)} 
                    onTouchStart={e => this.onSettings(e, this.props.id)}/>
            </div>
            {this.props.locationData.get('description') && (<p>{this.props.locationData.get('description')}</p>)}
            {this.renderCalibration(this.props.locationData.get('calibration'))}
          </div>
        )}
        <div className="target-bg" />
      </div>
    );
  }
});