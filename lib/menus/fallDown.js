'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _menuFactory = require('../menuFactory');

var _menuFactory2 = _interopRequireDefault(_menuFactory);

var styles = {

  menuWrap: function menuWrap(isOpen, width, right, top, bottom) {
    var transform = !top && !bottom ? 'translate3d(0, -100%, 0)' : 'translate3d(-100%, 0, 0)';

    return {
      MozTransform: isOpen ? '' : transform,
      MsTransform: isOpen ? '' : transform,
      OTransform: isOpen ? '' : transform,
      WebkitTransform: isOpen ? '' : transform,
      transform: isOpen ? '' : transform,
      transition: 'all 0.5s ease-in-out'
    };
  },

  pageWrap: function pageWrap(isOpen, width, right, top, bottom) {
    var transform = right ? 'translate3d(-' + width + ', 0, 0)' : 'translate3d(' + width + ', 0, 0)';
    if (top) transform = 'translate3d(0, ' + width + ', 0)';
    if (bottom) transform = 'translate3d(0, -' + width + ', 0)';

    return {
      MozTransform: isOpen ? '' : transform,
      MsTransform: isOpen ? '' : transform,
      OTransform: isOpen ? '' : transform,
      WebkitTransform: isOpen ? '' : transform,
      transform: isOpen ? '' : transform,
      transition: 'all 0.5s'
    };
  },

  outerContainer: function outerContainer(isOpen) {
    return {
      perspective: '1500px',
      perspectiveOrigin: '0% 50%',
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];