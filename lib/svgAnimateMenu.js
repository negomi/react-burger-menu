'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _baseMenu = require('./baseMenu');

var _baseMenu2 = _interopRequireDefault(_baseMenu);

var svgAnimateMenu = function svgAnimateMenu(styles) {
  var menu = (0, _baseMenu2['default'])(styles);

  menu.componentDidUpdate = function () {
    var _this = this;

    if (styles.svg && this.isMounted()) {
      (function () {
        // Snap.svg workaround for Webpack using imports-loader (https://github.com/webpack/imports-loader).
        var snap = undefined;
        try {
          snap = require('imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');
        } catch (e) {
          snap = require('snapsvg');
        }

        var morphShape = _reactDom2['default'].findDOMNode(_this, 'bm-morph-shape');
        var s = snap(morphShape);
        var path = s.select('path');

        if (_this.state.isOpen) {
          // Animate SVG path.
          styles.svg.animate(path);
        } else {
          // Reset path (timeout ensures animation happens off screen).
          setTimeout(function () {
            path.attr('d', styles.svg.pathInitial);
          }, 300);
        }
      })();
    }
  };

  return menu;
};

exports['default'] = svgAnimateMenu;
module.exports = exports['default'];