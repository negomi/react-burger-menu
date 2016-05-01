'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _radiumPluginPrefixAll = require('radium-plugin-prefix-all');

var _radiumPluginPrefixAll2 = _interopRequireDefault(_radiumPluginPrefixAll);

exports['default'] = function (component) {
  return (0, _radium2['default'])({
    plugins: [_radium2['default'].Plugins.mergeStyleArray, _radium2['default'].Plugins.checkProps, _radium2['default'].Plugins.resolveMediaQueries, _radium2['default'].Plugins.resolveInteractionStyles, _radiumPluginPrefixAll2['default'], _radium2['default'].Plugins.checkProps]
  })(component);
};

module.exports = exports['default'];