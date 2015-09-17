'use strict';

import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import { expect } from 'chai';
import createShallowComponent from './utils/createShallowComponent';
import BurgerMenu from '../src/BurgerMenu';
const Menu = BurgerMenu.stack;

describe('stack', () => {

  let component, overlay, menuWrap, menu;

  beforeEach(() => {
    component = createShallowComponent(<Menu><div>An item</div></Menu>);
    overlay = component.props.children[0];
    menuWrap = component.props.children[1];
    menu = menuWrap.props.children[1];
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
    component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' }><div>An item</div></Menu>);
    expect(Object.keys(component.refs.item_0.props.style)).to.have.length(3);
  });
});
