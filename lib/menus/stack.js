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
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-320px, 0, 0)',
      transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
    });
  },

  menu: function menu() {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      height: '100%'
    });
  },

  item: function item(isOpen, nthChild) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      display: 'block',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
      transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)',
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
      transition: isOpen ? 'opacity 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'opacity 0.4s cubic-bezier(0.7, 0, 0.3, 1), transform 0s 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
    });
  }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];