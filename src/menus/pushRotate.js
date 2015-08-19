'use strict';

import menuFactory from '../menuFactory';
import appendVendorPrefix from 'react-kit/appendVendorPrefix';

let styles = {

  menuWrap(isOpen) {
    return appendVendorPrefix({
      position: 'fixed',
      zIndex: 2,
      width: 300,
      height: '100%',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      transition: 'all 0.5s'
    });
  },

  menu() {
    return appendVendorPrefix({
      height: '100%'
    });
  },

  item() {
    return appendVendorPrefix({
      display: 'block',
      outline: 'none'
    });
  },

  overlay(isOpen) {
    return appendVendorPrefix({
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      transition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s',
      zIndex: 1
    });
  },

  pageWrap(isOpen) {
    return appendVendorPrefix({
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(300px, 0, 0) rotateY(-15deg)',
      transformOrigin: '0% 50%',
      transformStyle: 'preserve-3d',
      transition: 'all 0.5s'
    });
  },

  outerContainer(isOpen) {
    return appendVendorPrefix({
      perspective: '1500px',
      overflow: isOpen ? '' : 'hidden'
    });
  }
};

export default menuFactory(styles);
