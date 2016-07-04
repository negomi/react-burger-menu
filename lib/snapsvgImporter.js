'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  var Snap = undefined;
  try {
    // This will throw with Webpack.
    Snap = require('snapsvg');
  } finally {
    return Snap;
  }
};

module.exports = exports['default'];