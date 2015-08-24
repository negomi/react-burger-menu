'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _menuFactory = require('../menuFactory');

var _menuFactory2 = _interopRequireDefault(_menuFactory);

var _reactKitAppendVendorPrefix = require('react-kit/appendVendorPrefix');

var _reactKitAppendVendorPrefix2 = _interopRequireDefault(_reactKitAppendVendorPrefix);

var styles = {

  svg: {
    pathInitial: 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
    pathOpen: 'M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z',
    animate: function animate(path) {
      path.animate({ path: this.pathOpen }, 400, window.mina.easeinout);
    }
  },

  morphShape: function morphShape() {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      position: 'fixed',
      width: 120,
      height: '100%',
      right: 0
    });
  },

  menuWrap: function menuWrap(isOpen) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      position: 'fixed',
      zIndex: 2,
      width: 300,
      height: '100%',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-300px, 0, 0)',
      transition: 'all 0.3s'
    });
  },

  menu: function menu() {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      position: 'fixed',
      width: 'calc(100% - 120px)',
      height: '100%',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box'
    });
  },

  item: function item() {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      display: 'block',
      outline: 'none'
    });
  },

  overlay: function overlay(isOpen) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
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

  pageWrap: function pageWrap(isOpen) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100px, 0, 0)',
      transition: isOpen ? 'all 0.3s' : 'all 0.3s 0.1s'
    });
  },

  outerContainer: function outerContainer(isOpen) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      overflow: isOpen ? '' : 'hidden'
    });
  }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];