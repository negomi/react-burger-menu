'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../src/BurgerMenu';
const Menu = BurgerMenu.slide;

describe('slide', () => {

  let component, menuWrap, menu, firstItem;

  beforeEach(() => {
    component = createShallowComponent(<Menu><div>An item</div></Menu>);
    menuWrap = component.props.children[1];
  });

  it('has correct menuWrap styles', () => {
    expect(menuWrap.props.style.position).to.equal('fixed');
    expect(menuWrap.props.style.zIndex).to.equal(2);
    expect(menuWrap.props.style.width).to.equal('300px');
    expect(menuWrap.props.style.height).to.equal('100%');
  });

  it('has correct menu styles', () => {
    component = TestUtils.renderIntoDocument(<Menu><div>An item</div></Menu>);
    menu = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu');
    expect(menu.style.height).to.equal('100%');
		expect(menu.style.boxSizing).to.equal('border-box');
  });

  it('has correct item styles', () => {
    component = TestUtils.renderIntoDocument(<Menu><div>An item</div></Menu>);
    firstItem = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-item-list').children[0];
    expect(firstItem.style.display).to.equal('block');
    expect(firstItem.style.outline).to.equal('none');
  });
});
