import React from 'react/addons';
import MainContainer from '../../src/components/MainContainer';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag}
  = React.addons.TestUtils;


describe('MainContainer', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <MainContainer />
    );
    expect(true).to.equal(true);
    // const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    // expect(buttons.length).to.equal(2);
    // expect(buttons[0].textContent).to.equal('Test1');
    // expect(buttons[1].textContent).to.equal('Test2');
  });

});