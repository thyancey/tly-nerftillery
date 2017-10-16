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

  render() {

    let className = 'target';
    if(this.state.isOpen) className += ' open';

    return (
      <div className={className} style={{left:this.props.locationData.get('x'), top:this.props.locationData.get('y')}} onClick={this.onLocationClick}>
        <div className="location-info">
          <h2>{this.props.locationData.get('title')}</h2>
          <p>{this.props.locationData.get('description') || 'no description'}</p>
        </div>
        <div className="target-bg"/>
      </div>
    );
  }
});