import { expect } from 'chai';
import BurgerMenu from '../src/BurgerMenu';

describe('BurgerMenu', () => {
  it('exports correct animations', () => {
    expect(Object.keys(BurgerMenu)).to.have.length(10);
    expect(BurgerMenu).to.include.all.keys(
      'slide',
      'stack',
      'elastic',
      'bubble',
      'push',
      'pushRotate',
      'scaleDown',
      'scaleRotate',
      'fallDown',
      'reveal'
    );
  });
});
