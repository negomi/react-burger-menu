'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _menuFactory = require('../menuFactory');

var _menuFactory2 = _interopRequireDefault(_menuFactory);

var styles = {

  pageWrap: function pageWrap(isOpen, width) {
    return {
      MozTransform: isOpen ? '' : 'translate3d(0, 0, -' + width + ')',
      MsTransform: isOpen ? '' : 'translate3d(0, 0, -' + width + ')',
      OTransform: isOpen ? '' : 'translate3d(0, 0, -' + width + ')',
      WebkitTransform: isOpen ? '' : 'translate3d(0, 0, -' + width + ')',
      transform: isOpen ? '' : 'translate3d(0, 0, -' + width + ')',
      transformOrigin: '100%',
      transformStyle: 'preserve-3d',
      transition: 'all 0.5s'
    };
  },

  outerContainer: function outerContainer() {
    return {
      perspective: '1500px'
    };
  }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];