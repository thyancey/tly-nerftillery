import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'store/actions';

import staticData from 'data/staticData.js';

import Header from 'components/header';

require('./style.less');


const MainContainerComponent = React.createClass({
  componentDidMount(){
    this.addListeners();
  },


  componentDidUpdate(prevProps, prevState){
  },

  addListeners(){
    const instance = this;
    window.addEventListener('scroll', function(){
      instance.checkScrollStuff();
    })
  },

  //- TODO, reduce the number of times this gets called on each scroll
  checkScrollStuff(){
    if($(document).scrollTop() >= $(document).innerHeight() - $(window).innerHeight()){
      console.log("YOU HIT THE BOTTOM");
    }
  },

  render() {
    console.log('Main.render()')
    global.data = staticData;
    
    return (
      <div className="main">
        <Header />
        <div className="container-map">
          <div className="map">
            <div className="map-image"/>
          </div>
        </div>
        <div className="sample-image" />
      </div>
    );
  }
});

function mapStateToProps(state) {
  global.store = state;
  return {
    title: state.get('title'),
    items: state.get('items')
  };
}

export const MainContainer = connect(
  mapStateToProps,
  actions
)(MainContainerComponent);