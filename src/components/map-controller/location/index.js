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

  mouseDown(){
    this.startDragTimer();
  },

  mouseMove(e){
    if(this.state.isDragging){
      this.props.updateLocation(this.props.id, e.clientX, e.clientY);
    }
  },

  mouseUp(){
    this.killDragTimer();
    this.setState({ isDragging: false });
  },

  mouseEnter(){
    this.setState({ isOpen: true });
  },

  mouseLeave(){
    this.killDragTimer();
    this.setState({ isOpen: false, isDragging: false });
  },

  startDragTimer(){
    this.killDragTimer();

    this.dragTimer = global.setTimeout(t => {
      this.startDragging();
    }, 200);
  },

  killDragTimer(){
    if(this.dragTimer){
      global.clearTimeout(this.dragTimer);
      this.dragTimer = null;
    }
  },

  startDragging(){
    this.setState({'isDragging': true, 'isOpen': false});
  },

  render() {
    let className = 'target';
    if(this.state.isOpen) className += ' open';

    return (
      <div className={className} style={{left:this.props.locationData.get('x'), top:this.props.locationData.get('y')}} 
      onClick={this.onLocationClick} 
      onMouseEnter={this.mouseEnter} 
      onMouseLeave={this.mouseLeave}
      onMouseMove={this.mouseMove}
      onMouseDown={this.mouseDown}
      onMouseUp={this.mouseUp}>
        <div className="location-info">
          <h3>{this.props.locationData.get('title')}</h3>
          <p>{this.props.locationData.get('description') || 'no description'}</p>
        </div>
        <div className="target-bg"/>
      </div>
    );
  }
});