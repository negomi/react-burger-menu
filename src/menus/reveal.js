'use strict';

import menuFactory from '../menuFactory';

const styles = {

  menuWrap(isOpen, width, right) {
    return {
      visibility: isOpen ? `visible` : `hidden`,
      MozTransform: `translate3d(0, 0, 0)`,
      MsTransform: `translate3d(0, 0, 0)`,
      OTransform: `translate3d(0, 0, 0)`,
      WebkitTransform: `translate3d(0, 0, 0)`,
      transform: `translate3d(0, 0, 0)`,
      zIndex: 1,
    };
  },

  overlay(isOpen, width, right) {
    return {
      zIndex: 4,
      MozTransform: isOpen ? right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      MsTransform: isOpen ? right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      OTransform: isOpen ? right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      WebkitTransform: isOpen ? right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      transform: isOpen ? right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      transition: 'all 0.5s',
      visibility: isOpen ? 'visible' : 'hidden'
    };
  },

  pageWrap(isOpen, width, right) {
    return {
      MozTransform: isOpen ? '' : right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`,
      MsTransform: isOpen ? '' : right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`,
      OTransform: isOpen ? '' : right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`,
      WebkitTransform: isOpen ? '' : right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`,
      transform: isOpen ? '' : right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`,
      transition: 'all 0.5s',
      zIndex: 2,
      position: `relative`
    };
  },

  burgerIcon(isOpen, width, right) {
    return {
      MozTransform: isOpen ? right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      MsTransform: isOpen ? right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      OTransform: isOpen ? right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      WebkitTransform: isOpen ? right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      transform: isOpen ? right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)` : `translate3d(0, 0, 0)`,
      transition: 'all 0.1s',
      position: 'relative',
      zIndex: 3
    }
  },

  outerContainer(isOpen) {
    return {
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

export default menuFactory(styles);
