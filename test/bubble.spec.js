'use strict';

import React from 'react';
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../src/BurgerMenu';
const Menu = BurgerMenu.bubble.default;

describe('bubble', () => {
  let component,
    menuWrap,
    morphShape,
    svg,
    menu,
    closeButton,
    itemList,
    firstItem;

  beforeEach(() => {
    component = createShallowComponent(
      <Menu>
        <div>An item</div>
      </Menu>
    );
    menuWrap = component.props.children[2];
    morphShape = menuWrap.props.children[0];
    svg = morphShape.props.children;
    menu = menuWrap.props.children[1];
    itemList = menu.props.children;
    closeButton = menuWrap.props.children[2];
    firstItem = menu.props.children.props.children[0];
  });

  it('has correct menuWrap styles', () => {
    expect(menuWrap.props.style.position).to.equal('fixed');
    expect(menuWrap.props.style.zIndex).to.equal(1100);
    expect(menuWrap.props.style.width).to.equal('300px');
    expect(menuWrap.props.style.height).to.equal('100%');
  });

  it('has correct menu styles', () => {
    expect(menu.props.style.position).to.equal('fixed');
    expect(menu.props.style.height).to.equal('100%');
    expect(menu.props.style.opacity).to.equal(0);
    expect(menu.props.style.boxSizing).to.equal('border-box');
  });

  it('has correct itemList styles', () => {
    expect(itemList.props.style.height).to.equal('100%');
  });

  it('has correct item styles', () => {
    expect(firstItem.props.style.display).to.equal('block');
    expect(firstItem.props.style.opacity).to.equal(0);
  });

  it('has correct morph shape styles', () => {
    expect(morphShape.props.style.position).to.equal('absolute');
    expect(morphShape.props.style.width).to.equal('100%');
    expect(morphShape.props.style.height).to.equal('100%');
    expect(morphShape.props.style.right).to.equal(0);
  });

  it('has correct initial SVG path', () => {
    let path = svg.props.children;
    expect(path.props.d).to.equal(
      'M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z'
    );
  });

  it('has correct close button styles', () => {
    expect(closeButton.props.style.opacity).to.equal(0);
  });

  it('can be positioned on the right', () => {
    component = createShallowComponent(
      <Menu right>
        <div>An item</div>
      </Menu>
    );
    menuWrap = component.props.children[2];
    morphShape = menuWrap.props.children[0];

    expect(menuWrap.props.style.right).to.equal(0);
    expect(morphShape.props.style.transform).to.equal('rotateY(180deg)');
    expect(morphShape.props.style.left).to.equal(0);
  });
});
