import React from 'react';

require('./style.less');

export default React.createClass({
  onBackgroundBlocker(e){
    e.preventDefault(e);
    e.stopPropagation(e);

    this.props.onSelected && this.props.onSelected(e);
  },

  render() {
    return (
      <div  id='background-blocker' 
            onTouchStart={e => this.onBackgroundBlocker(e)} 
            onMouseDown={e => this.onBackgroundBlocker(e)}
            onContextMenu={e => this.onBackgroundBlocker(e)} />
    );
  }
});
