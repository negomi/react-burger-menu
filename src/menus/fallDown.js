'use strict';

import menuFactory from '../menuFactory';

let styles = {

  menuWrap(isOpen) {
    return {
      position: 'fixed',
      zIndex: 2,
      width: 300,
      height: '100%',
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
      WebkitTransition: 'all 0.5s ease-in-out',
      transition: 'all 0.5s ease-in-out'
    };
  },

  menu() {
    return {
      height: '100%'
    };
  },

  item() {
    return {
      display: 'block',
      outline: 'none'
    };
  },

  overlay(isOpen) {
    return {
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      WebkitTransition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s',
      transition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s',
      zIndex: 1
    };
  },

  pageWrap(isOpen) {
    return {
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(300px, 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(300px, 0, 0)',
      WebkitTransition: 'all 0.5s',
      transition: 'all 0.5s'
    };
  },

  outerContainer(isOpen) {
    return {
      perspective: '1500px',
      perspectiveOrigin: '0% 50%',
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

export default menuFactory(styles);
