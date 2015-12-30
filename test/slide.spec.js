'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../lib/BurgerMenu';
const Menu = BurgerMenu.slide;

describe('slide', () => {

  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<Menu><div>An item</div></Menu>);
  });

  it('has correct menuWrap styles', () => {
    component = createShallowComponent(<Menu><div>An item</div></Menu>);
    const menuWrap = component.props.children[1];
    expect(menuWrap.props.style.position).to.equal('fixed');
    expect(menuWrap.props.style.zIndex).to.equal(2);
    expect(menuWrap.props.style.width).to.equal(300);
    expect(menuWrap.props.style.height).to.equal('100%');
  });

  it('has correct menu styles', () => {
    const menu = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu');
    expect(menu.style.height).to.equal('100%');
    expect(menu.style.boxSizing).to.equal('border-box');
  });

  it('has correct itemList styles', () => {
    const itemList = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-item-list');
    expect(itemList.style.height).to.equal('100%');
  });

  it('has correct item styles', () => {
    const firstItem = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-item-list').children[0];
    expect(firstItem.style.display).to.equal('block');
    expect(firstItem.style.outline).to.equal('none');
  });

  it('can be positioned on the right', () => {
    component = TestUtils.renderIntoDocument(<Menu right><div>An item</div></Menu>);
    const menuWrap = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu-wrap');
    expect(menuWrap.style.right).to.equal('0px');
  });
});
