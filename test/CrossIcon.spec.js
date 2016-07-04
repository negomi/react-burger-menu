'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { assert, expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import CrossIcon from '../lib/CrossIcon';

describe('CrossIcon component', () => {

  let component;
  const mockStylesProp = {
    bmCross: {
      background: 'red'
    },
    bmCrossButton: {
      height: '30px'
    }
  };

  it('exists and is not undefined', () => {
    assert.isDefined(CrossIcon, 'CrossIcon component is defined');
  });

  describe('when rendered successfully', () => {

    beforeEach(() => {
      component = createShallowComponent(<CrossIcon />);
    });

    it('contains two span elements', () => {
      expect(component.props.children[0].props.children).to.have.length(2);
    });

    it('contains a button element', () => {
      expect(component.props.children[1].type).to.equal('button');
    });
  });

  describe('wrapper element', () => {

    it('has the correct class', () => {
      component = createShallowComponent(<CrossIcon />);
      expect(component.props.className).to.contain('bm-cross-button');
    });

    it('can be styled with props', () => {
      component = createShallowComponent(<CrossIcon styles={ mockStylesProp } />);
      expect(component.props.style.height).to.equal('30px');
    });
  });

  describe('visual icon', () => {

    let icon;

    beforeEach(() => {
      component = createShallowComponent(<CrossIcon />);
      icon = component.props.children[0];
    });

    it('has the correct class', () => {
      expect(icon.props.children[0].props.className).to.contain('bm-cross');
      expect(icon.props.children[1].props.className).to.contain('bm-cross');
    });

    it('has the correct styles', () => {
      const expected = {
        position: 'absolute',
        width: 3,
        height: 14,
        transform: 'rotate(45deg)'
      };
      expect(icon.props.children[0].props.style).to.contain(expected);
    });

    it('can be styled with props', () => {
      component = createShallowComponent(<CrossIcon styles={ mockStylesProp } />);
      icon = component.props.children[0];
      expect(icon.props.children[0].props.style.background).to.equal('red');
      expect(icon.props.children[1].props.style.background).to.equal('red');
    });

    it('can be a custom element', () => {
      const element = <img src="icon.jpg" />;
      component = createShallowComponent(<CrossIcon customIcon={ element } />);
      expect(component.props.children[0].type).to.equal('img');
      expect(component.props.children[0].props.src).to.equal('icon.jpg');
    });
  });

  describe('button', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<CrossIcon />);
    });

    it('contains descriptive text', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      expect(button.innerHTML).to.equal('Close Menu');
    });

    it('behaves correctly when clicked', () => {
      let clickHandled = false;
      function handleClick() { clickHandled = true; }
      component = TestUtils.renderIntoDocument(<CrossIcon onClick={ handleClick } />);
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      TestUtils.Simulate.click(button);
      expect(clickHandled).to.be.true;
    });

    it('has the correct styles', () => {
      component = createShallowComponent(<CrossIcon />);
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
        textIndent: -9999,
        background: 'transparent',
        outline: 'none'
      };
      expect(button.props.style).to.deep.equal(expected);
    });
  });
});
