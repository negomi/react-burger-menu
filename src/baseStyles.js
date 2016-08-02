'use strict';

let styles = {

  overlay(isOpen) {
    var transform = isOpen ? '' : 'translate3d(-100%, 0, 0)';
    return {
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      transform: transform,
      WebkitTransform: transform,
      transition: isOpen ? 'opacity 0.3s' : 'opacity 0.3s, transform 0s 0.3s'
    };
  },

  menuWrap(isOpen, width, right) {
    var transform = isOpen ? '' : right ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)';
    return {
      position: 'fixed',
      right: right ? 0 : 'inherit',
      zIndex: 2,
      width,
      height: '100%',
      transform: transform,
      WebkitTransform: transform,
      transition: 'all 0.5s'
    };
  },

  menu() {
    return {
      height: '100%',
      boxSizing: 'border-box'
    };
  },

  itemList() {
    return {
      height: '100%'
    };
  },

  item() {
    return {
      display: 'block',
      outline: 'none'
    };
  }

};

export default styles;
