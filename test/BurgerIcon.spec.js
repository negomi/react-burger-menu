'use strict';

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import { assert, expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerIcon from '../src/BurgerIcon';

describe('BurgerIcon component', () => {

  let component;

  it('exists and is not undefined', () => {
    assert.isDefined(BurgerIcon, 'BurgerIcon component is defined');
  });

  describe('when rendered successfully', () => {

    beforeEach(() => {
      component = createShallowComponent(<BurgerIcon />);
    });

    it('contains three span elements', () => {
      let spanElements = component.props.children.filter((child) => {
        return child.type === 'span';
      });

      expect(spanElements).to.have.length(3);
    });

    it('contains a button element', () => {
      expect(component.props.children[3].type).to.equal('button');
    });

    it('has correct initial hover state', () => {
      expect(BurgerIcon.prototype.getInitialState().hover).to.be.false;
    });
  });

  describe('visual icon', () => {

    beforeEach(() => {
      component = createShallowComponent(<BurgerIcon />);
    });

    it('has the correct class', () => {
      expect(component.props.children[0].props.className).to.contain('bm-burger-icon');
      expect(component.props.children[1].props.className).to.contain('bm-burger-icon');
      expect(component.props.children[2].props.className).to.contain('bm-burger-icon');
    });

    it('has the correct styles', () => {
      expect(Object.keys(component.props.children[0].props.style)).to.have.length(7);
      expect(Object.keys(component.props.children[1].props.style)).to.have.length(7);
      expect(Object.keys(component.props.children[2].props.style)).to.have.length(7);
    });
  });

  describe('button', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<BurgerIcon />);
    });

    it('contains descriptive text', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      expect(button.props.children).to.equal('Open Menu');
    });

    it('responds to hover events', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      TestUtils.SimulateNative.mouseOver(button.getDOMNode());
      expect(component.state.hover).to.be.true;
      TestUtils.SimulateNative.mouseOut(button.getDOMNode());
      expect(component.state.hover).to.be.false;
    });

    it('behaves correctly when clicked', () => {
      let clickHandled = false;
      function handleClick() { clickHandled = true; }
      component = TestUtils.renderIntoDocument(<BurgerIcon onClick={ handleClick } />);
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      TestUtils.Simulate.click(button.getDOMNode());
      expect(clickHandled).to.be.true;
    });

    it('has the correct styles', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      expect(Object.keys(button.props.style)).to.have.length(12);
    });
  });
});
