'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../lib/BurgerMenu';
const Menu = BurgerMenu.scaleRotate;

describe('scaleRotate', () => {

  let component, menuWrap, menu, itemList, firstItem;

  function addWrapperElementsToDOM() {
    let outerContainer = document.createElement('div');
    outerContainer.setAttribute('id', 'outer-container');
    let pageWrap = document.createElement('div');
    pageWrap.setAttribute('id', 'page-wrap');
    outerContainer.appendChild(pageWrap);
    document.body.appendChild(outerContainer);
  }

  function removeWrapperElementsFromDOM() {
    let outerContainer = document.getElementById('outer-container');
    document.body.removeChild(outerContainer);
  }

  beforeEach(() => {
    addWrapperElementsToDOM();
  });

  afterEach(() => {
    removeWrapperElementsFromDOM();
  });

  it('has default menuWrap styles', () => {
    component = createShallowComponent(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' }><div>An item</div></Menu>);
    menuWrap = component.props.children[1];
    expect(menuWrap.props.style.position).to.equal('fixed');
    expect(menuWrap.props.style.zIndex).to.equal(2);
    expect(menuWrap.props.style.width).to.equal(300);
    expect(menuWrap.props.style.height).to.equal('100%');
  });

  it('has correct menu styles', () => {
    component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' }><div>An item</div></Menu>);
    menu = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu');
    expect(menu.style.height).to.equal('100%');
    expect(menu.style.boxSizing).to.equal('border-box');
  });

  it('has correct itemList styles', () => {
    component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' }><div>An item</div></Menu>);
    itemList = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-item-list');
    expect(itemList.style.height).to.equal('100%');
  });

  it('has correct item styles', () => {
    component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' }><div>An item</div></Menu>);
    firstItem = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-item-list').children[0];
    expect(firstItem.style.display).to.equal('block');
    expect(firstItem.style.outline).to.equal('none');
  });

  it('can be positioned on the right', () => {
    component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' } right><div>An item</div></Menu>);
    menuWrap = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu-wrap');
    expect(menuWrap.style.right).to.equal('0px');
  });
});
