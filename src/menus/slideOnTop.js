var menuFactory = require('../menuFactory');
var appendVendorPrefix = require('react-kit/appendVendorPrefix');

var styles = {

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
      zIndex: 1,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
      transition: 'opacity 0.5s'
    });
  }
};

export default menuFactory(styles);
