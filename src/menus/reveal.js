'use strict';

import menuFactory from '../menuFactory';

const styles = {

  menuWrap(isOpen, width, right) {
    return {
      visibility: isOpen ? 'visible' : 'hidden',
      MozTransform: 'translate3d(0, 0, 0)',
      MsTransform: 'translate3d(0, 0, 0)',
      OTransform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      transform: 'translate3d(0, 0, 0)',
      zIndex: 1,
    };
  },

  overlay(isOpen, width, right, top, bottom) {
    let transform = right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`;
    if (top)
      transform = `translate3d(0, ${width}, 0)`;
    if (bottom)
      transform = `translate3d(0, -${width}, 0)`;

    return {
      zIndex: 4,
      MozTransform: isOpen ? transform : `translate3d(0, 0, 0)`,
      MsTransform: isOpen ? transform : `translate3d(0, 0, 0)`,
      OTransform: isOpen ? transform : `translate3d(0, 0, 0)`,
      WebkitTransform: isOpen ? transform : `translate3d(0, 0, 0)`,
      transform: isOpen ? transform : `translate3d(0, 0, 0)`,
      transition: 'all 0.5s',
      visibility: isOpen ? 'visible' : 'hidden'
    };
  },

  pageWrap(isOpen, width, right, top, bottom) {
    let transform = right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`;
    if (top)
      transform = `translate3d(0, ${width}, 0)`;
    if (bottom)
      transform = `translate3d(0, -${width}, 0)`;

    return {
      MozTransform: isOpen ? '' : transform,
      MsTransform: isOpen ? '' : transform,
      OTransform: isOpen ? '' : transform,
      WebkitTransform: isOpen ? '' : transform,
      transform: isOpen ? '' : transform,
      transition: 'all 0.5s',
      zIndex: 2,
      position: 'relative'
    };
  },

  burgerIcon(isOpen, width, right) {
    return {
      MozTransform: isOpen ? right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      MsTransform: isOpen ? right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      OTransform: isOpen ? right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      WebkitTransform: isOpen ? right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      transform: isOpen ? right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      transition: 'all 0.5s',
      position: 'relative',
      zIndex: isOpen ? 0 : 3
    }
  },

  outerContainer(isOpen) {
    return {
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

export default menuFactory(styles);
