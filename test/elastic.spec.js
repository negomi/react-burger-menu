'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../lib/BurgerMenu';
const Menu = BurgerMenu.elastic;

describe('elastic', () => {

  let component, menuWrap, morphShape, svg, menu, itemList, firstItem;

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
    component = createShallowComponent(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' }><div>An item</div></Menu>);
    menuWrap = component.props.children[1];
    morphShape = menuWrap.props.children[0];
    svg = morphShape.props.children;
    menu = menuWrap.props.children[1];
    itemList = menu.props.children;
    firstItem = menu.props.children.props.children[0];
    addWrapperElementsToDOM();
  });

  afterEach(() => {
    removeWrapperElementsFromDOM();
  });

  it('has correct menuWrap styles', () => {
    expect(menuWrap.props.style.position).to.equal('fixed');
    expect(menuWrap.props.style.zIndex).to.equal(2);
    expect(menuWrap.props.style.width).to.equal(300);
    expect(menuWrap.props.style.height).to.equal('100%');
  });

  it('has correct menu styles', () => {
    expect(menu.props.style.height).to.equal('100%');
    expect(menu.props.style.position).to.equal('fixed');
    expect(menu.props.style.width).to.contain('calc(100% - 120px)');
    expect(menu.props.style.whiteSpace).to.equal('nowrap');
    expect(menu.props.style.boxSizing).to.equal('border-box');
  });

  it('has correct itemList styles', () => {
    expect(itemList.props.style.height).to.equal('100%');
  });

  it('has correct item styles', () => {
    expect(firstItem.props.style.display).to.equal('block');
    expect(firstItem.props.style.outline).to.equal('none');
  });

  it('has correct morph shape styles', () => {
    expect(morphShape.props.style.position).to.equal('fixed');
    expect(morphShape.props.style.width).to.equal(120);
    expect(morphShape.props.style.height).to.equal('100%');
    expect(morphShape.props.style.right).to.equal(0);
  });

  it('has correct initial SVG path', () => {
    let path = svg.props.children;
    expect(path.props.d).to.equal('M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z');
  });

  it('can be positioned on the right', () => {
    component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' } right><div>An item</div></Menu>);
    menuWrap = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu-wrap');
    menu = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu');
    morphShape = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-morph-shape');
    itemList = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-item-list');
    expect(menuWrap.style.right).to.equal('0px');
    expect(morphShape.style.transform).to.equal('rotateY(180deg)');
    expect(morphShape.style.left).to.equal('0px');
    expect(menu.style.right).to.equal('0px');
    expect(itemList.style.height).to.equal('100%');
    expect(itemList.style.position).to.equal('relative');
    expect(itemList.style.left).to.equal('-110px');
  });
});
