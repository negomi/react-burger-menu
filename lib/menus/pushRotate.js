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

  menuWrap: function menuWrap(isOpen) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      position: 'fixed',
      zIndex: 2,
      width: 300,
      height: '100%',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      transition: 'all 0.5s'
    });
  },

  menu: function menu() {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      height: '100%'
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
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      transition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s',
      zIndex: 1
    });
  },

  pageWrap: function pageWrap(isOpen) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(300px, 0, 0) rotateY(-15deg)',
      transformOrigin: '0% 50%',
      transformStyle: 'preserve-3d',
      transition: 'all 0.5s'
    });
  },

  outerContainer: function outerContainer(isOpen) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      perspective: '1500px',
      overflow: isOpen ? '' : 'hidden'
    });
  }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];