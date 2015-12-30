import { expect } from 'chai';
import baseStyles from '../lib/baseStyles';

describe('baseStyles', () => {

  it('has correct overlay styles', () => {
    const overlay = baseStyles.overlay(false);
    expect(overlay.position).to.equal('fixed');
    expect(overlay.zIndex).to.equal(1);
    expect(overlay.width).to.equal('100%');
    expect(overlay.height).to.equal('100%');
    expect(overlay.background).to.equal('rgba(0, 0, 0, 0.3)');
    expect(overlay.opacity).to.equal(0);
  });

  it('has correct menuWrap styles', () => {
    const menuWrap = baseStyles.menuWrap(false, 300);
    expect(menuWrap.position).to.equal('fixed');
    expect(menuWrap.zIndex).to.equal(2);
    expect(menuWrap.width).to.equal(300);
    expect(menuWrap.height).to.equal('100%');
  });

  it('has correct menu styles', () => {
    const menu = baseStyles.menu(false);
    expect(menu.height).to.equal('100%');
    expect(menu.boxSizing).to.equal('border-box');
  });

  it('has correct itemList styles', () => {
    const itemList = baseStyles.itemList();
    expect(itemList.height).to.equal('100%');
  });
});
