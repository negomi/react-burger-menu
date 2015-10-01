'use strict';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../src/BurgerMenu';
const Menu = BurgerMenu.stack;

describe('stack', () => {

  let component, overlay, menuWrap, menu, firstItem;

  beforeEach(() => {
    component = createShallowComponent(<Menu><div>An item</div></Menu>);
    overlay = component.props.children[0];
    menuWrap = component.props.children[1];
    menu = menuWrap.props.children[1];
    firstItem = menu.props.children.props.children[0];
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
    expect(Object.keys(firstItem.props.style)).to.have.length(4);
  });
});
