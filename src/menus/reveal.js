'use strict';

import menuFactory from '../menuFactory';

const styles = {
  menuWrap(isOpen, width, right) {
    return {
      MozTransform: 'translate3d(0, 0, 0)',
      MsTransform: 'translate3d(0, 0, 0)',
      OTransform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      transform: 'translate3d(0, 0, 0)',
      zIndex: isOpen ? 1000 : -1
    };
  },

  overlay(isOpen, width, right) {
    return {
      zIndex: 1400,
      MozTransform: isOpen
        ? right
          ? `translate3d(-${width}, 0, 0)`
          : `translate3d(${width}, 0, 0)`
        : 'translate3d(0, 0, 0)',
      MsTransform: isOpen
        ? right
          ? `translate3d(-${width}, 0, 0)`
          : `translate3d(${width}, 0, 0)`
        : 'translate3d(0, 0, 0)',
      OTransform: isOpen
        ? right
          ? `translate3d(-${width}, 0, 0)`
          : `translate3d(${width}, 0, 0)`
        : 'translate3d(0, 0, 0)',
      WebkitTransform: isOpen
        ? right
          ? `translate3d(-${width}, 0, 0)`
          : `translate3d(${width}, 0, 0)`
        : 'translate3d(0, 0, 0)',
      transform: isOpen
        ? right
          ? `translate3d(-${width}, 0, 0)`
          : `translate3d(${width}, 0, 0)`
        : 'translate3d(0, 0, 0)',
      transition: 'all 0.5s',
      visibility: isOpen ? 'visible' : 'hidden'
    };
  },

  pageWrap(isOpen, width, right) {
    return {
      MozTransform: isOpen
        ? ''
        : right
        ? `translate3d(-${width}, 0, 0)`
        : `translate3d(${width}, 0, 0)`,
      MsTransform: isOpen
        ? ''
        : right
        ? `translate3d(-${width}, 0, 0)`
        : `translate3d(${width}, 0, 0)`,
      OTransform: isOpen
        ? ''
        : right
        ? `translate3d(-${width}, 0, 0)`
        : `translate3d(${width}, 0, 0)`,
      WebkitTransform: isOpen
        ? ''
        : right
        ? `translate3d(-${width}, 0, 0)`
        : `translate3d(${width}, 0, 0)`,
      transform: isOpen
        ? ''
        : right
        ? `translate3d(-${width}, 0, 0)`
        : `translate3d(${width}, 0, 0)`,
      transition: 'all 0.5s',
      zIndex: 1200,
      position: 'relative'
    };
  },

  burgerIcon(isOpen, width, right) {
    return {
      MozTransform: isOpen
        ? right
          ? `translate3d(${width}, 0, 0)`
          : `translate3d(-${width}, 0, 0)`
        : 'translate3d(0, 0, 0)',
      MsTransform: isOpen
        ? right
          ? `translate3d(${width}, 0, 0)`
          : `translate3d(-${width}, 0, 0)`
        : 'translate3d(0, 0, 0)',
      OTransform: isOpen
        ? right
          ? `translate3d(${width}, 0, 0)`
          : `translate3d(-${width}, 0, 0)`
        : 'translate3d(0, 0, 0)',
      WebkitTransform: isOpen
        ? right
          ? `translate3d(${width}, 0, 0)`
          : `translate3d(-${width}, 0, 0)`
        : 'translate3d(0, 0, 0)',
      transform: isOpen
        ? right
          ? `translate3d(${width}, 0, 0)`
          : `translate3d(-${width}, 0, 0)`
        : 'translate3d(0, 0, 0)',
      transition: 'all 0.1s',
      position: 'relative',
      zIndex: 1300
    };
  },

  outerContainer(isOpen) {
    return {
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

export default menuFactory(styles);
