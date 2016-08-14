'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { assert, expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerIcon from '../lib/BurgerIcon';

describe('BurgerIcon component', () => {

  let component;
  const mockStylesProp = {
    bmBurgerButton: {
      width: '40px'
    },
    bmBurgerBars: {
      background: 'red'
    }
  };

  it('exists and is not undefined', () => {
    assert.isDefined(BurgerIcon, 'BurgerIcon component is defined');
  });

  describe('when rendered successfully', () => {

    beforeEach(() => {
      component = createShallowComponent(<BurgerIcon />);
    });

    it('contains three span elements', () => {
      expect(component.props.children[0].props.children).to.have.length(3);
    });

    it('contains a button element', () => {
      expect(component.props.children[1].type).to.equal('button');
    });

    it('has correct initial hover state', () => {
      expect(BurgerIcon.prototype.getInitialState().hover).to.be.false;
    });
  });

  describe('wrapper element', () => {

    it('has the correct class', () => {
      component = createShallowComponent(<BurgerIcon />);
      expect(component.props.className).to.contain('bm-burger-button');
    });

    it('can be styled with props', () => {
      component = createShallowComponent(<BurgerIcon styles={ mockStylesProp } />);
      expect(component.props.style.width).to.equal('40px');
    });
  });

  describe('visual icon', () => {

    let icon;

    beforeEach(() => {
      component = createShallowComponent(<BurgerIcon />);
      icon = component.props.children[0];
    });

    it('has the correct class', () => {
      expect(icon.props.children[0].props.className).to.contain('bm-burger-bars');
      expect(icon.props.children[1].props.className).to.contain('bm-burger-bars');
      expect(icon.props.children[2].props.className).to.contain('bm-burger-bars');
    });

    it('has the correct styles', () => {
      const expected = {
        position: 'absolute',
        height: '20%',
        top: '0%',
        left: 0,
        right: 0,
        opacity: 1
      };
      expect(icon.props.children[0].props.style).to.deep.equal(expected);
    });

    it('can be styled with props', () => {
      component = createShallowComponent(<BurgerIcon styles={ mockStylesProp } />);
      icon = component.props.children[0];
      expect(icon.props.children[0].props.style.background).to.equal('red');
      expect(icon.props.children[1].props.style.background).to.equal('red');
      expect(icon.props.children[2].props.style.background).to.equal('red');
    });

    it('can be a custom element', () => {
      const element = <img src="icon.jpg" />;
      component = createShallowComponent(<BurgerIcon customIcon={ element } />);
      expect(component.props.children[0].type).to.equal('img');
      expect(component.props.children[0].props.src).to.equal('icon.jpg');
    });
  });

  describe('button', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<BurgerIcon />);
    });

    it('contains descriptive text', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      expect(button.innerHTML).to.equal('Open Menu');
    });

    it('responds to hover events', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      TestUtils.SimulateNative.mouseOver(button);
      expect(component.state.hover).to.be.true;
      TestUtils.SimulateNative.mouseOut(button);
      expect(component.state.hover).to.be.false;
    });

    it('behaves correctly when clicked', () => {
      let clickHandled = false;
      function handleClick() { clickHandled = true; }
      component = TestUtils.renderIntoDocument(<BurgerIcon onClick={ handleClick } />);
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      TestUtils.Simulate.click(button);
      expect(clickHandled).to.be.true;
    });

    it('has the correct styles', () => {
      component = createShallowComponent(<BurgerIcon />);
      const button = component.props.children[1];
      const expected = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        border: 'none',
        opacity: 0,
        fontSize: 8
      };
      expect(button.props.style).to.deep.equal(expected);
    });
  });
});
