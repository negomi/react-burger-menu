'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _baseMenu = require('./baseMenu');

var _baseMenu2 = _interopRequireDefault(_baseMenu);

exports['default'] = function (styles) {
  return (0, _radium2['default'])(_react2['default'].createClass((0, _baseMenu2['default'])(styles)));
};

module.exports = exports['default'];