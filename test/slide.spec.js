'use strict';

import React from 'react/addons';
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../src/BurgerMenu';
const Menu = BurgerMenu.slide;

describe('slide', () => {

  let component, overlay, menuWrap, menu, itemList, item;

  beforeEach(() => {
    component = createShallowComponent(<Menu><div>An item</div></Menu>);
    overlay = component.props.children[0];
    menuWrap = component.props.children[1];
    menu = menuWrap.props.children[1];
    itemList = menu.props.children;
    item = itemList.props.children;
  });

  it('has correct overlay styles', () => {
    expect(Object.keys(overlay.props.style)).to.have.length(7);
  });

  it('has correct menuWrap styles', () => {
    expect(Object.keys(menuWrap.props.style)).to.have.length(5);
  });

  it('has correct menu styles', () => {
    expect(Object.keys(menu.props.style)).to.have.length(1);
    expect(menu.props.style.height).to.equal('100%');
  });

  it('has correct item styles', () => {
    expect(Object.keys(item.props.style)).to.have.length(2);
  });
});
