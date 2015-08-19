'use strict';

import React from 'react/addons';
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../src/BurgerMenu';
const Menu = BurgerMenu.bubble;

describe('bubble', () => {

  let component, overlay, menuWrap, morphShape, svg, menu, itemList, item, closeButton;

  beforeEach(() => {
    component = createShallowComponent(<Menu><div>An item</div></Menu>);
    overlay = component.props.children[0];
    menuWrap = component.props.children[1];
    morphShape = menuWrap.props.children[0];
    svg = morphShape.props.children;
    menu = menuWrap.props.children[1];
    closeButton = menuWrap.props.children[2];
    itemList = menu.props.children;
    item = itemList.props.children;
  });

  it('has correct overlay styles', () => {
    expect(Object.keys(overlay.props.style)).to.have.length(10);
  });

  it('has correct menuWrap styles', () => {
    expect(Object.keys(menuWrap.props.style)).to.have.length(8);
  });

  it('has correct menu styles', () => {
    expect(Object.keys(menu.props.style)).to.have.length(7);
    expect(menu.props.style.height).to.equal('100%');
  });

  it('has correct item styles', () => {
    expect(Object.keys(item.props.style)).to.have.length(7);
  });

  it('has correct morph shape styles', () => {
    expect(Object.keys(morphShape.props.style)).to.have.length(4);
  });

  it('has correct initial SVG path', () => {
    let path = svg.props.children;
    expect(path.props.d).to.equal('M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z');
  });

  it('has correct close button styles', () => {
		expect(Object.keys(closeButton.props.style)).to.have.length(5);
  });
});
