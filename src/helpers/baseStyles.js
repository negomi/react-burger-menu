'use strict';

function getMenuWrapTransforms(isOpen, right) {
  let value = ''
  if (isOpen) {
    if (right) {
      value = '0'
    } else {
      return ''
    }
  } else {
    if (right) {
      value = '100%'
    } else {
      value = '-100%'
    }
  }
  return 'translate3d(' + value + ', 0, 0)'
}

const styles = {
  overlay(isOpen) {
    return {
      position: 'fixed',
      zIndex: 1000,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      MozTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
      MsTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
      OTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
      WebkitTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
      transform: isOpen ? '' : 'translate3d(100%, 0, 0)',
      transition: isOpen ? 'opacity 0.3s' : 'opacity 0.3s, transform 0s 0.3s'
    };
  },

  menuWrap(isOpen, width, right) {
    return {
      position: 'fixed',
      right: right ? 0 : 'inherit',
      zIndex: 1100,
      width,
      height: '100%',
      MozTransform: getMenuWrapTransforms(isOpen, right),
      MsTransform: getMenuWrapTransforms(isOpen, right),
      OTransform: getMenuWrapTransforms(isOpen, right),
      WebkitTransform: getMenuWrapTransforms(isOpen, right),
      transform: getMenuWrapTransforms(isOpen, right),
      transition: 'transform 0.5s'
    };
  },

  menu() {
    return {
      height: '100%',
      boxSizing: 'border-box',
      overflow: 'auto'
    };
  },

  itemList() {
    return {
      height: '100%'
    };
  },

  item() {
    return {
      display: 'block'
    };
  }
};

export default styles;
