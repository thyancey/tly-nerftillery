import React from 'react';

require('../style.less');

export default Location = React.createClass({
  getInitialState() {
    return {
      isOpen: false
    };
  },

  onLocationClick(e){
    this.setState({ isOpen: !this.state.isOpen });
    e.stopPropagation();
  },

  mouseEnter(){
    this.setState({ isOpen: true });
  },

  mouseLeave(){
    this.setState({ isOpen: false, isDragging: false });
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

    return (
      <div  className={className} 
            onClick={this.onLocationClick} 
            onMouseEnter={this.mouseEnter} 
            onMouseLeave={this.mouseLeave}
            style={{left:this.props.locationData.get('x'), top:this.props.locationData.get('y')}} >
        <div className="location-info">
          <h3>{this.props.locationData.get('title')}</h3>
          {this.props.locationData.get('description') && (<p>{this.props.locationData.get('description')}</p>)}
          {this.renderCalibration(this.props.locationData.get('calibration'))}
        </div>
        <div className="target-bg"/>
      </div>
    );
  }
});