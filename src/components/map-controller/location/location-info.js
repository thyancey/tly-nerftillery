import React from 'react';

require('./location-info.less');

export default Location = React.createClass({

  renderCalibration(calibrationData){
    if(calibrationData){
      const turretMarkup = [];
        
      calibrationData.map((calObj, i) => {
        turretMarkup.push(
          <li key={i}>
            <div className="location-target-calibration">
              <h4>{calObj.get('id')}</h4>
              <p>{`rotX: ${calObj.get('rotX')}°`}</p>
              <p>{`rotY: ${calObj.get('rotY')}°`}</p>
              <button></button>
            </div>
          </li>
        );
      });

      if(turretMarkup.length > 0){
        return (
          <div className="calibration-group">
            <h4>{'Calibration:'}</h4>
            <ul>
              {turretMarkup}
            </ul>
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
          {this.props.type === 'turret' && (
            <div  className="right" 
                  onMouseDown={e => this.props.onSettings(e, this.props.id)} 
                  onTouchStart={e => this.props.onSettings(e, this.props.id)}/>
          )}
        </div>
        {this.props.description && (<p>{this.props.description}</p>)}
        {this.renderCalibration(this.props.calibrationData)}
        {this.props.calibrationData && this.renderFireButton()}
      </div>
    );
  }
});