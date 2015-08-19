'use strict';

import menuFactory from '../menuFactory';
import appendVendorPrefix from 'react-kit/appendVendorPrefix';

let styles = {

  svg: {
    pathInitial: 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
    pathOpen: 'M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z',
    animate(path) {
      path.animate({ path: this.pathOpen }, 400, window.mina.easeinout);
    }
  },

  morphShape() {
    return appendVendorPrefix({
      position: 'fixed',
      width: 120,
      height: '100%',
      right: 0
    });
  },

  menuWrap(isOpen) {
    return appendVendorPrefix({
      position: 'fixed',
      zIndex: 2,
      width: 300,
      height: '100%',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-300px, 0, 0)',
      transition: 'all 0.3s'
    });
  },

  menu() {
    return appendVendorPrefix({
      position: 'fixed',
      width: 'calc(100% - 120px)',
      height: '100%',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box'
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
      zIndex: 1,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      transition: isOpen ? 'opacity 0.3s' : 'opacity 0.3s, transform 0s 0.3s'
    });
  },

  pageWrap(isOpen) {
    return appendVendorPrefix({
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100px, 0, 0)',
      transition: isOpen ? 'all 0.3s' : 'all 0.3s 0.1s'
    });
  },

  outerContainer(isOpen) {
    return appendVendorPrefix({
      overflow: isOpen ? '' : 'hidden'
    });
  }
};

export default menuFactory(styles);
