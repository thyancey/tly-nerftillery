import React from 'react';

require('./location-info.less');

export default Location = React.createClass({

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

  onButtonFire(e){
    console.log('onButtonFIre!')
    e.stopPropagation();

    this.props.onButtonFire(this.props.calibrationData);
  },

  renderFireButton(){
    return (
      <div className="button-container">
        <button onTouchStart={e => this.onButtonFire(e)} onMouseDown={e => this.onButtonFire(e)}>{'FIRE'}</button>
      </div>
    );
  },

  render() {
    let className = "location-info";
    if(this.props.openLeft) className += ' open-left';
    if(this.props.openUp) className += ' open-up';

    return (
      <div className={className}>
        <div className="location-info-header">
          <h3 className="left">{this.props.title}</h3>
          <div  className="right" 
                onMouseDown={e => this.props.onSettings(e, this.props.id)} 
                onTouchStart={e => this.props.onSettings(e, this.props.id)}/>
        </div>
        {this.props.description && (<p>{this.props.description}</p>)}
        {this.renderCalibration(this.props.calibrationData)}
        {this.props.calibrationData && this.renderFireButton()}
      </div>
    );
  }
});