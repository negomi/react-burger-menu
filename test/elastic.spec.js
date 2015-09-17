'use strict';

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../src/BurgerMenu';
const Menu = BurgerMenu.elastic;

describe('elastic', () => {

  let component, overlay, menuWrap, morphShape, svg, menu;

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
    morphShape = menuWrap.props.children[0];
    svg = morphShape.props.children;
    menu = menuWrap.props.children[1];
    addWrapperElementsToDOM();
  });

  afterEach(() => {
    removeWrapperElementsFromDOM();
  });

  it('has correct overlay styles', () => {
    expect(Object.keys(overlay.props.style)).to.have.length(7);
  });

  it('has correct menuWrap styles', () => {
    expect(Object.keys(menuWrap.props.style)).to.have.length(5);
  });

  it('has correct menu styles', () => {
    expect(Object.keys(menu.props.style)).to.have.length(5);
    expect(menu.props.style.height).to.equal('100%');
  });

  it('has correct item styles', () => {
    component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' }><div>An item</div></Menu>);
    expect(Object.keys(component.refs.item_0.props.style)).to.have.length(2);
  });

  it('has correct morph shape styles', () => {
    expect(Object.keys(morphShape.props.style)).to.have.length(4);
  });

  it('has correct initial SVG path', () => {
    let path = svg.props.children;
    expect(path.props.d).to.equal('M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z');
  });
});
