'use strict';

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import { assert, expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import CrossIcon from '../src/CrossIcon';

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
      expect(Object.keys(component.props.children[0].props.style)).to.have.length(8);
      expect(Object.keys(component.props.children[1].props.style)).to.have.length(8);
    });
  });

  describe('button', () => {

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<CrossIcon />);
    });

    it('contains descriptive text', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      expect(button.props.children).to.equal('Close Menu');
    });

    it('behaves correctly when clicked', () => {
      let clickHandled = false;
      function handleClick() { clickHandled = true; }
      component = TestUtils.renderIntoDocument(<CrossIcon onClick={ handleClick } />);
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      TestUtils.Simulate.click(button.getDOMNode());
      expect(clickHandled).to.be.true;
    });

    it('has the correct styles', () => {
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
      expect(Object.keys(button.props.style)).to.have.length(14);
    });
  });
});
