import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'store/actions';
import {fromJS, Map, List} from 'immutable';

import staticData from 'data/staticData.js';

import Header from 'components/header';
import MapController from 'components/map-controller';

require('./style.less');


const MainContainerComponent = React.createClass({
  componentDidMount(){
    this.addListeners();

    this.getMapData();
  },

  getMapData(){
    this.props.getMapData({
      allMapData: fromJS(staticData.maps),
      defaultId: staticData.defaultId
    });
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
    global.staticData = staticData;
    
    return (
      <div className="main">
        <Header />
        <div className="container-map">
          <MapController />
        </div>
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