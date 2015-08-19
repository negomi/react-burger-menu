'use strict';

import menuFactory from '../menuFactory';

let styles = {

  menuWrap(isOpen) {
    return {
      position: 'fixed',
      zIndex: 2,
      width: 300,
      height: '100%',
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-320px, 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-320px, 0, 0)',
      WebkitTransition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)',
      transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
    };
  },

  menu() {
    return {
      height: '100%'
    };
  },

  item(isOpen, nthChild) {
    return {
      display: 'block',
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
      WebkitTransition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)',
      transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)',
      outline: 'none'
    };
  },

  overlay(isOpen) {
    return {
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      WebkitTransition: isOpen ? 'opacity 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'opacity 0.4s cubic-bezier(0.7, 0, 0.3, 1), transform 0s 0.4s cubic-bezier(0.7, 0, 0.3, 1)',
      transition: isOpen ? 'opacity 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'opacity 0.4s cubic-bezier(0.7, 0, 0.3, 1), transform 0s 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
    };
  }
};

export default menuFactory(styles);
