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
    pathInitial: 'M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z',
    pathOpen: 'M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z',
    animate: function animate(path) {
      var pos = 0;
      var steps = this.pathOpen.split(';');
      var stepsTotal = steps.length;
      var mina = window.mina;

      var nextStep = function nextStep() {
        if (pos > stepsTotal - 1) return;

        path.animate({ path: steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function () {
          nextStep();
        });

        pos++;
      };

      nextStep(pos);
    }
  },

  morphShape: function morphShape() {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      position: 'fixed',
      width: '100%',
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
      transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
    });
  },

  menu: function menu(isOpen) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      position: 'fixed',
      height: '100%',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-160px, 0, 0)',
      transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    });
  },

  item: function item(isOpen) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      display: 'block',
      outline: 'none',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-160px, 0, 0)',
      transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    });
  },

  closeButton: function closeButton(isOpen) {
    return (0, _reactKitAppendVendorPrefix2['default'])({
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-160px, 0, 0)',
      transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
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
      transition: isOpen ? 'opacity 0.4s' : 'opacity 0.4s, transform 0s 0.4s'
    });
  }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];