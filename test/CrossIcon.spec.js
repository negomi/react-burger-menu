'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { assert, expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import CrossIcon from '../lib/CrossIcon';

describe('CrossIcon component', () => {

  let component;

  it('exists and is not undefined', () => {
    assert.isDefined(CrossIcon, 'CrossIcon component is defined');
  });

  describe('when rendered successfully', () => {

    beforeEach(() => {
      component = createShallowComponent(<CrossIcon />);
    });

    it('contains two span elements', () => {
      let spanElements = component.props.children.filter((child) => {
        return child.type === 'span';
      });

      expect(spanElements).to.have.length(2);
    });

    it('contains a button element', () => {
      expect(component.props.children[2].type).to.equal('button');
    });
  });

  describe('visual icon', () => {

    beforeEach(() => {
      component = createShallowComponent(<CrossIcon />);
    });

    it('has the correct class', () => {
      expect(component.props.children[0].props.className).to.contain('bm-cross');
      expect(component.props.children[1].props.className).to.contain('bm-cross');
    });

    it('has the correct styles', () => {
      const expected = {
        position: 'absolute',
        width: 3,
        height: 14,
        top: 14,
        right: 18,
        transform: 'rotate(45deg)',
        cursor: 'pointer',
        zIndex: 1
      };
      expect(component.props.children[0].props.style).to.deep.equal(expected);
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
      const button = component.props.children[2];
      const expected = {
        width: 14,
        height: 14,
        position: 'absolute',
        right: 13,
        top: 14,
        padding: 0,
        overflow: 'hidden',
        textIndent: 14,
        fontSize: 14,
        border: 'none',
        background: 'transparent',
        color: 'transparent',
        outline: 'none',
        zIndex: 1
      };
      expect(button.props.style).to.deep.equal(expected);
    });
  });
});
