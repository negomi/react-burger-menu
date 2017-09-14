'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _snapsvgImporter = require('../snapsvgImporter');

var _snapsvgImporter2 = _interopRequireDefault(_snapsvgImporter);

var _menuFactory = require('../menuFactory');

var _menuFactory2 = _interopRequireDefault(_menuFactory);

var styles = {

  svg: {
    lib: _snapsvgImporter2['default'],
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

      nextStep();
    }
  },

  morphShape: function morphShape(isOpen, width, right, top, bottom) {
    var transform = right ? 'rotateY(180deg)' : 'rotateY(0deg)';
    if (top) transform = 'rotateY(0)';
    if (bottom) transform = 'rotateY(0)';

    return {
      position: 'absolute',
      width: '100%',
      height: '100%',
      right: right ? 'inherit' : 0,
      left: right ? 0 : 'inherit',
      bottom: bottom ? 0 : 'initial',
      top: top ? 0 : 'initial',
      MozTransform: transform,
      MsTransform: transform,
      OTransform: transform,
      WebkitTransform: transform,
      transform: transform
    };
  },

  menuWrap: function menuWrap(isOpen, width, right, top, bottom) {
    var transform = right ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)';
    if (top) transform = 'translate3d(0, -100%, 0)';
    if (bottom) transform = 'translate3d(0, 100%, 0)';

    return {
      MozTransform: isOpen ? 'translate3d(0, 0, 0)' : transform,
      MsTransform: isOpen ? 'translate3d(0, 0, 0)' : transform,
      OTransform: isOpen ? 'translate3d(0, 0, 0)' : transform,
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : transform,
      transform: isOpen ? 'translate3d(0, 0, 0)' : transform,
      transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
    };
  },

  menu: function menu(isOpen, width, right, top, bottom) {
    width -= 140;
    var transform = right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)';
    if (top) transform = 'translate3d(0, ' + width + ', 0)';
    if (bottom) transform = 'translate3d(0, -' + width + ', 0)';

    return {
      width: top || bottom ? '100%' : 'initial',
      position: 'fixed',
      MozTransform: isOpen ? '' : transform,
      MsTransform: isOpen ? '' : transform,
      OTransform: isOpen ? '' : transform,
      WebkitTransform: isOpen ? '' : transform,
      transform: isOpen ? '' : transform,
      transition: isOpen ? 'opacity 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    };
  },

  item: function item(isOpen, width, right, nthChild) {
    width -= 140;
    return {
      MozTransform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
      MsTransform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
      OTransform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
      transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    };
  },

  closeButton: function closeButton(isOpen, width, right) {
    width -= 140;
    return {
      MozTransform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
      MsTransform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
      OTransform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + ', 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
      transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    };
  }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];