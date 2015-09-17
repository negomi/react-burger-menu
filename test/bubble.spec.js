'use strict';

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../src/BurgerMenu';
const Menu = BurgerMenu.bubble;

describe('bubble', () => {

  let component, overlay, menuWrap, morphShape, svg, menu, closeButton;

  beforeEach(() => {
    component = createShallowComponent(<Menu><div>An item</div></Menu>);
    overlay = component.props.children[0];
    menuWrap = component.props.children[1];
    morphShape = menuWrap.props.children[0];
    svg = morphShape.props.children;
    menu = menuWrap.props.children[1];
    closeButton = menuWrap.props.children[2];
  });

  it('has correct overlay styles', () => {
    expect(Object.keys(overlay.props.style)).to.have.length(7);
  });

  it('has correct menuWrap styles', () => {
    expect(Object.keys(menuWrap.props.style)).to.have.length(5);
  });

  it('has correct menu styles', () => {
    expect(Object.keys(menu.props.style)).to.have.length(4);
    expect(menu.props.style.height).to.equal('100%');
  });

  it('has correct item styles', () => {
    component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' }><div>An item</div></Menu>);
    expect(Object.keys(component.refs.item_0.props.style)).to.have.length(4);
  });

  it('has correct morph shape styles', () => {
    expect(Object.keys(morphShape.props.style)).to.have.length(4);
  });

  it('has correct initial SVG path', () => {
    let path = svg.props.children;
    expect(path.props.d).to.equal('M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z');
  });

  it('has correct close button styles', () => {
    expect(Object.keys(closeButton.props.style)).to.have.length(2);
  });
});
