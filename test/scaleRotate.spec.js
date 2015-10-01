'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../src/BurgerMenu';
const Menu = BurgerMenu.scaleRotate;

describe('scaleRotate', () => {

  let component, overlay, menuWrap, menu, firstItem;

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
    overlay = component.props.children[0];
    menuWrap = component.props.children[1];
    menu = menuWrap.props.children[1];
    firstItem = menu.props.children.props.children[0];
    addWrapperElementsToDOM();
  });

  afterEach(() => {
    removeWrapperElementsFromDOM();
  });

  it('has correct overlay styles', () => {
    expect(Object.keys(overlay.props.style)).to.have.length(8);
  });

  it('has correct menuWrap styles', () => {
    expect(Object.keys(menuWrap.props.style)).to.have.length(6);
  });

  it('has correct menu styles', () => {
    expect(Object.keys(menu.props.style)).to.have.length(1);
    expect(menu.props.style.height).to.equal('100%');
  });

  it('has correct item styles', () => {
    expect(Object.keys(firstItem.props.style)).to.have.length(2);
  });
});
