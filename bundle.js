require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function find(array, predicate, context) {
  if (typeof Array.prototype.find === 'function') {
    return array.find(predicate, context);
  }

  context = context || this;
  var length = array.length;
  var i;

  if (typeof predicate !== 'function') {
    throw new TypeError(predicate + ' is not a function');
  }

  for (i = 0; i < length; i++) {
    if (predicate.call(context, array[i], i, array)) {
      return array[i];
    }
  }
}

module.exports = find;

},{}],2:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define(function () {
			return ExecutionEnvironment;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());

},{}],3:[function(require,module,exports){
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('isobject');

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;
  
  if (isObjectObject(o) === false) return false;
  
  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;
  
  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;
  
  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }
  
  // Most likely a plain Object
  return true;
};

},{"isobject":4}],4:[function(require,module,exports){
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function isObject(val) {
  return val != null && typeof val === 'object'
    && !Array.isArray(val);
};

},{}],5:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
/* @flow */

'use strict';

var _camelCaseRegex = /([a-z])?([A-Z])/g;
var _camelCaseReplacer = function _camelCaseReplacer(match, p1, p2) {
  return (p1 || '') + '-' + p2.toLowerCase();
};
var _camelCaseToDashCase = function _camelCaseToDashCase(s) {
  return s.replace(_camelCaseRegex, _camelCaseReplacer);
};

var camelCasePropsToDashCase = function camelCasePropsToDashCase(prefixedStyle /*: Object*/) /*: Object*/ {
  // Since prefix is expected to work on inline style objects, we must
  // translate the keys to dash case for rendering to CSS.
  return Object.keys(prefixedStyle).reduce(function (result, key) {
    result[_camelCaseToDashCase(key)] = prefixedStyle[key];
    return result;
  }, {});
};

module.exports = camelCasePropsToDashCase;
},{}],7:[function(require,module,exports){
'use strict';

var React = require('react');

var Style = require('./style.js');
var printStyles = require('../print-styles.js');

var PrintStyle = React.createClass({
  displayName: 'PrintStyle',

  getInitialState: function getInitialState() {
    return this._getStylesState();
  },

  componentDidMount: function componentDidMount() {
    this.subscription = printStyles.subscribe(this._onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    this.subscription.remove();
  },

  _onChange: function _onChange() {
    this.setState(this._getStylesState());
  },

  _getStylesState: function _getStylesState() {
    return {
      styles: printStyles.getPrintStyles()
    };
  },

  render: function render() {
    return React.createElement(Style, { rules: {
        mediaQueries: {
          print: this.state.styles
        }
      } });
  }
});

module.exports = PrintStyle;
},{"../print-styles.js":24,"./style.js":8,"react":undefined}],8:[function(require,module,exports){
/* @flow */

'use strict';

var camelCasePropsToDashCase = require('../camel-case-props-to-dash-case');
var createMarkupForStyles = require('../create-markup-for-styles');
var Prefixer = require('../prefixer');

var React = require('react');

var buildCssString = function buildCssString(selector /*: string*/, rules /*: Object*/, prefix /*: (rules: Object, componentName: string) => Object*/) /*: ?string*/ {
  if (!selector || !rules) {
    return null;
  }

  var prefixedRules = prefix(rules, 'Style');
  var cssPrefixedRules = camelCasePropsToDashCase(prefixedRules);
  var serializedRules = createMarkupForStyles(cssPrefixedRules);

  return selector + '{' + serializedRules + '}';
};

var Style = React.createClass({
  displayName: 'Style',

  propTypes: {
    prefix: React.PropTypes.func.isRequired,

    rules: React.PropTypes.object,
    scopeSelector: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() /*: {scopeSelector: string}*/ {
    return {
      prefix: Prefixer.getPrefixedStyle,
      scopeSelector: ''
    };
  },

  _buildStyles: function _buildStyles(styles /*: Object*/) /*: string*/ {
    var _this = this;

    return Object.keys(styles).reduce(function (accumulator, selector) {
      var rules = styles[selector];

      if (selector === 'mediaQueries') {
        accumulator += _this._buildMediaQueryString(rules);
      } else {
        var completeSelector = (_this.props.scopeSelector ? _this.props.scopeSelector + ' ' : '') + selector;
        accumulator += buildCssString(completeSelector, rules, _this.props.prefix) || '';
      }

      return accumulator;
    }, '');
  },

  _buildMediaQueryString: function _buildMediaQueryString(stylesByMediaQuery /*: {[mediaQuery: string]: Object}*/) /*: string*/ {
    var _this2 = this;

    var contextMediaQueries = this._getContextMediaQueries();
    var mediaQueryString = '';

    Object.keys(stylesByMediaQuery).forEach(function (query) {
      var completeQuery = contextMediaQueries[query] ? contextMediaQueries[query] : query;
      mediaQueryString += '@media ' + completeQuery + '{' + _this2._buildStyles(stylesByMediaQuery[query]) + '}';
    });

    return mediaQueryString;
  },

  _getContextMediaQueries: function _getContextMediaQueries() /*: {[mediaQuery: string]: Object}*/ {
    var contextMediaQueries = {};
    if (this.context && this.context.mediaQueries) {
      Object.keys(this.context.mediaQueries).forEach((function (query) {
        contextMediaQueries[query] = this.context.mediaQueries[query].media;
      }).bind(this));
    }

    return contextMediaQueries;
  },

  render: function render() /*: ?ReactElement*/ {
    if (!this.props.rules) {
      return null;
    }

    var styles = this._buildStyles(this.props.rules);

    return React.createElement('style', { dangerouslySetInnerHTML: { __html: styles } });
  }
});

module.exports = Style;
},{"../camel-case-props-to-dash-case":6,"../create-markup-for-styles":9,"../prefixer":23,"react":undefined}],9:[function(require,module,exports){
/* @flow */

'use strict';

var createMarkupForStyles = function createMarkupForStyles(style /*: Object*/) /*: string*/ {
  var spaces /*: string*/ = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  return Object.keys(style).map(function (property) {
    return spaces + property + ': ' + style[property] + ';';
  }).join('\n');
};

module.exports = createMarkupForStyles;
},{}],10:[function(require,module,exports){
(function (process){
/* @flow */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('react');

var Component = _require.Component;

var resolveStyles = require('./resolve-styles.js');
var printStyles = require('./print-styles.js');

var KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES = ['arguments', 'callee', 'caller', 'length', 'name', 'prototype', 'type'];

var copyProperties = function copyProperties(source, target) {
  Object.getOwnPropertyNames(source).forEach(function (key) {
    if (KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES.indexOf(key) < 0 && !target.hasOwnProperty(key)) {
      var descriptor = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, descriptor);
    }
  });
};

var enhanceWithRadium = function enhanceWithRadium(configOrComposedComponent /*: constructor | Function | Object*/) /*: constructor*/ {
  var config /*:: ?: Object*/ = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (typeof configOrComposedComponent !== 'function') {
    var newConfig = _extends({}, config, configOrComposedComponent);
    return function (configOrComponent) {
      return enhanceWithRadium(configOrComponent, newConfig);
    };
  }

  var component /*: Function*/ = configOrComposedComponent;
  var ComposedComponent /*: constructor*/ = component;

  // Handle stateless components

  if (!ComposedComponent.render && !ComposedComponent.prototype.render) {
    ComposedComponent = (function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        _classCallCheck(this, _class);

        _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
      }

      _createClass(_class, [{
        key: 'render',
        value: function render() {
          return component(this.props);
        }
      }]);

      return _class;
    })(Component);
    ComposedComponent.displayName = component.displayName || component.name;
  }

  var RadiumEnhancer = (function (_ComposedComponent) {
    _inherits(RadiumEnhancer, _ComposedComponent);

    function RadiumEnhancer() {
      _classCallCheck(this, RadiumEnhancer);

      _get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'constructor', this).apply(this, arguments);

      this.state = this.state || {};
      this.state._radiumStyleState = {};
      this._radiumIsMounted = true;

      if (RadiumEnhancer.printStyleClass) {
        this.printStyleClass = RadiumEnhancer.printStyleClass;
      }
    }

    // Class inheritance uses Object.create and because of __proto__ issues
    // with IE <10 any static properties of the superclass aren't inherited and
    // so need to be manually populated.
    // See http://babeljs.io/docs/advanced/caveats/#classes-10-and-below-

    _createClass(RadiumEnhancer, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (_get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'componentWillUnmount', this)) {
          _get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'componentWillUnmount', this).call(this);
        }

        this._radiumIsMounted = false;

        if (this._radiumMouseUpListener) {
          this._radiumMouseUpListener.remove();
        }

        if (this._radiumMediaQueryListenersByQuery) {
          Object.keys(this._radiumMediaQueryListenersByQuery).forEach(function (query) {
            this._radiumMediaQueryListenersByQuery[query].remove();
          }, this);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var renderedElement = _get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'render', this).call(this);
        return resolveStyles(this, renderedElement, config);
      }
    }]);

    return RadiumEnhancer;
  })(ComposedComponent);

  copyProperties(ComposedComponent, RadiumEnhancer);

  if (process.env.NODE_ENV !== 'production') {
    // This also fixes React Hot Loader by exposing the original components top
    // level prototype methods on the Radium enhanced prototype as discussed in
    // https://github.com/FormidableLabs/radium/issues/219.
    copyProperties(ComposedComponent.prototype, RadiumEnhancer.prototype);
  }

  RadiumEnhancer.displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

  RadiumEnhancer.printStyleClass = printStyles.addPrintStyles(RadiumEnhancer);

  return RadiumEnhancer;
};

module.exports = enhanceWithRadium;
}).call(this,require('_process'))
},{"./print-styles.js":24,"./resolve-styles.js":25,"_process":5,"react":undefined}],11:[function(require,module,exports){
/* @flow */

'use strict';

var getStateKey = function getStateKey(elementKey /*: ?string*/) /*: string*/ {
  return elementKey === null || elementKey === undefined ? 'main' : elementKey.toString();
};

module.exports = getStateKey;
},{}],12:[function(require,module,exports){
/* @flow */

'use strict';

var getStateKey = require('./get-state-key');

var getState = function getState(state /*: {_radiumStyleState: {[key: string]: {[value: string]: boolean}}}*/, elementKey /*: string*/, value /*: string*/) /*: any*/ {
  var key = getStateKey(elementKey);

  return !!state && !!state._radiumStyleState && !!state._radiumStyleState[key] && state._radiumStyleState[key][value];
};

module.exports = getState;
},{"./get-state-key":11}],13:[function(require,module,exports){
'use strict';

var Enhancer = require('./enhancer');

module.exports = function (ComposedComponent /*: constructor*/) {
  return Enhancer(ComposedComponent);
};
module.exports.Plugins = require('./plugins');
module.exports.PrintStyleSheet = require('./components/print-style-sheet');
module.exports.Style = require('./components/style');
module.exports.getState = require('./get-state');
module.exports.keyframes = require('./keyframes');
module.exports.__clearStateForTests = require('./resolve-styles').__clearStateForTests;
},{"./components/print-style-sheet":7,"./components/style":8,"./enhancer":10,"./get-state":12,"./keyframes":14,"./plugins":17,"./resolve-styles":25}],14:[function(require,module,exports){
/* @flow */

'use strict';

var camelCasePropsToDashCase = require('./camel-case-props-to-dash-case');
var createMarkupForStyles = require('./create-markup-for-styles');
var Prefixer = require('./prefixer');

var ExecutionEnvironment = require('exenv');

var isAnimationSupported = false;
var keyframesPrefixed = 'keyframes';

if (ExecutionEnvironment.canUseDOM) {
  // Animation feature detection and keyframes prefixing from MDN:
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Detecting_CSS_animation_support
  var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
  var element = (document.createElement('div') /*: any*/);

  if (element.style.animationName !== undefined) {
    isAnimationSupported = true;
  } else {
    domPrefixes.some(function (prefix) {
      if (element.style[prefix + 'AnimationName'] !== undefined) {
        keyframesPrefixed = '-' + prefix.toLowerCase() + '-keyframes';
        isAnimationSupported = true;
        return true;
      }
      return false;
    });
  }
}

var animationIndex = 1;
var animationStyleSheet = null;

if (isAnimationSupported) {
  animationStyleSheet = (document.createElement('style') /*: any*/);
  document.head.appendChild(animationStyleSheet);
}

// Simple animation helper that injects CSS into a style object containing the
// keyframes, and returns a string with the generated animation name.
var keyframes = function keyframes(keyframeRules /*: {[percentage: string]: {[key: string]: string|number}}*/, componentName /*:: ?: string*/) /*: string*/ {
  var prefix /*: (style: Object, componentName: ?string) => Object*/ = arguments.length <= 2 || arguments[2] === undefined ? Prefixer.getPrefixedStyle : arguments[2];

  var name = 'Animation' + animationIndex;
  animationIndex += 1;

  if (!isAnimationSupported) {
    return name;
  }

  var rule = '@' + keyframesPrefixed + ' ' + name + ' {\n' + Object.keys(keyframeRules).map(function (percentage) {
    var props = keyframeRules[percentage];
    var prefixedProps = prefix(props, componentName);
    var cssPrefixedProps = camelCasePropsToDashCase(prefixedProps);
    var serializedProps = createMarkupForStyles(cssPrefixedProps, '  ');
    return '  ' + percentage + ' {\n  ' + serializedProps + '\n  }';
  }).join('\n') + '\n}\n';

  // for flow
  /* istanbul ignore next */
  if (!animationStyleSheet) {
    throw new Error('keyframes not initialized properly');
  }

  animationStyleSheet.sheet.insertRule(rule, animationStyleSheet.sheet.cssRules.length);
  return name;
};

module.exports = keyframes;
},{"./camel-case-props-to-dash-case":6,"./create-markup-for-styles":9,"./prefixer":23,"exenv":2}],15:[function(require,module,exports){
'use strict';

var isPlainObject = require('is-plain-object');

var shouldMerge = function shouldMerge(value) {
  // Don't merge objects overriding toString, since they should be converted
  // to string values.
  return isPlainObject(value) && value.toString === Object.prototype.toString;
};

// Merge style objects. Deep merge plain object values.
var mergeStyles = function mergeStyles(styles) {
  var result = {};

  styles.forEach(function (style) {
    if (!style || typeof style !== 'object') {
      return;
    }

    if (Array.isArray(style)) {
      style = mergeStyles(style);
    }

    Object.keys(style).forEach(function (key) {
      if (shouldMerge(style[key]) && shouldMerge(result[key])) {
        result[key] = mergeStyles([result[key], style[key]]);
      } else {
        result[key] = style[key];
      }
    });
  });

  return result;
};

module.exports = mergeStyles;
},{"is-plain-object":3}],16:[function(require,module,exports){
(function (process){
/* @flow */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*:: import type {PluginConfig, PluginResult} from '.';*/

var checkProps = (function () {} /*: any*/);

if (process.env.NODE_ENV !== 'production') {
  // Warn if you use longhand and shorthand properties in the same style
  // object.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties

  var shorthandPropertyExpansions = {
    'background': ['backgroundAttachment', 'backgroundBlendMode', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundPosition', 'backgroundPositionX', 'backgroundPositionY', 'backgroundRepeat', 'backgroundRepeatX', 'backgroundRepeatY', 'backgroundSize'],
    'border': ['borderBottom', 'borderBottomColor', 'borderBottomStyle', 'borderBottomWidth', 'borderColor', 'borderLeft', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRight', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderStyle', 'borderTop', 'borderTopColor', 'borderTopStyle', 'borderTopWidth', 'borderWidth'],
    'borderImage': ['borderImageOutset', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderImageWidth'],
    'borderRadius': ['borderBottomLeftRadius', 'borderBottomRightRadius', 'borderTopLeftRadius', 'borderTopRightRadius'],
    'font': ['fontFamily', 'fontKerning', 'fontSize', 'fontStretch', 'fontStyle', 'fontVariant', 'fontVariantLigatures', 'fontWeight', 'lineHeight'],
    'listStyle': ['listStyleImage', 'listStylePosition', 'listStyleType'],
    'margin': ['marginBottom', 'marginLeft', 'marginRight', 'marginTop'],
    'padding': ['paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop'],
    'transition': ['transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction']
  };

  checkProps = function (config /*: PluginConfig*/) /*: PluginResult*/ {
    var componentName = config.componentName;
    var style = config.style;

    if (typeof style !== 'object' || !style) {
      return;
    }

    var styleKeys = Object.keys(style);
    styleKeys.forEach(function (styleKey) {
      if (shorthandPropertyExpansions[styleKey] && shorthandPropertyExpansions[styleKey].some(function (sp) {
        return styleKeys.indexOf(sp) !== -1;
      })) {
        if (process.env.NODE_ENV !== 'production') {
          /* eslint-disable no-console */
          console.warn('Radium: property "' + styleKey + '" in style object', style, ': do not mix longhand and ' + 'shorthand properties in the same style object. Check the render ' + 'method of ' + componentName + '.', 'See https://github.com/FormidableLabs/radium/issues/95 for more ' + 'information.');
          /* eslint-enable no-console */
        }
      }
    });

    styleKeys.forEach(function (k) {
      return checkProps(_extends({}, config, { style: style[k] }));
    });
    return;
  };
}

module.exports = checkProps;
}).call(this,require('_process'))
},{"_process":5}],17:[function(require,module,exports){
/** @flow */
/* eslint-disable block-scoped-var */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

/*:: import type {Config} from '../config';*/

var checkPropsPlugin = require('./check-props-plugin');
var mergeStyleArrayPlugin = require('./merge-style-array-plugin');
var prefixPlugin = require('./prefix-plugin');
var resolveInteractionStylesPlugin = require('./resolve-interaction-styles-plugin');
var resolveMediaQueriesPlugin = require('./resolve-media-queries-plugin');

/*:: export type PluginConfig = {
  // May not be readable if code has been minified
  componentName: string,

  // The Radium configuration
  config: Config,

  // Retrieve the value of a field on the component
  getComponentField: (key: string) => any,

  // Retrieve the value of a field global to the Radium module
  // Used so that tests can easily clear global state.
  getGlobalState: (key: string) => any,

  // Retrieve the value of some state specific to the rendered element.
  // Requires the element to have a unique key or ref or for an element key
  // to be passed in.
  getState: (stateKey: string, elementKey?: string) => any,

  // Access to the mergeStyles utility
  mergeStyles: (styles: Array<Object>) => Object,

  // The props of the rendered element. This can be changed by each plugin,
  // and successive plugins will see the result of previous plugins.
  props: Object,

  // Calls setState on the component with the given key and value.
  // By default this is specific to the rendered element, but you can override
  // by passing in the `elementKey` parameter.
  setState: (stateKey: string, value: any, elementKey?: string) => void,

  // The style prop of the rendered element. This can be changed by each plugin,
  // and successive plugins will see the result of previous plugins. Kept
  // separate from `props` for ease of use.
  style: Object,

  // uses the exenv npm module
  ExecutionEnvironment: {
    canUseEventListeners: bool,
    canUseDOM: bool,
  }
};*/
/*:: export type PluginResult = ?{
  // Merged into the component directly. Useful for storing things for which you
  // don't need to re-render, event subscriptions, for instance.
  componentFields?: Object,

  // Merged into a Radium controlled global state object. Use this instead of
  // module level state for ease of clearing state between tests.
  globalState?: Object,

  // Merged into the rendered element's props.
  props?: Object,

  // Replaces (not merged into) the rendered element's style property.
  style?: Object,
};*/

module.exports = {
  checkProps: checkPropsPlugin,
  mergeStyleArray: mergeStyleArrayPlugin,
  prefix: prefixPlugin,
  resolveInteractionStyles: resolveInteractionStylesPlugin,
  resolveMediaQueries: resolveMediaQueriesPlugin
};

// May not be readable if code has been minified

// The Radium configuration

// Retrieve the value of a field on the component

// Retrieve the value of a field global to the Radium module
// Used so that tests can easily clear global state.

// Retrieve the value of some state specific to the rendered element.
// Requires the element to have a unique key or ref or for an element key
// to be passed in.

// Access to the mergeStyles utility

// The props of the rendered element. This can be changed by each plugin,
// and successive plugins will see the result of previous plugins.

// Calls setState on the component with the given key and value.
// By default this is specific to the rendered element, but you can override
// by passing in the `elementKey` parameter.

// The style prop of the rendered element. This can be changed by each plugin,
// and successive plugins will see the result of previous plugins. Kept
// separate from `props` for ease of use.

// uses the exenv npm module

// Merged into the component directly. Useful for storing things for which you
// don't need to re-render, event subscriptions, for instance.

// Merged into a Radium controlled global state object. Use this instead of
// module level state for ease of clearing state between tests.

// Merged into the rendered element's props.

// Replaces (not merged into) the rendered element's style property.
},{"./check-props-plugin":16,"./merge-style-array-plugin":18,"./prefix-plugin":20,"./resolve-interaction-styles-plugin":21,"./resolve-media-queries-plugin":22}],18:[function(require,module,exports){
/* @flow */

'use strict';

// Convenient syntax for multiple styles: `style={[style1, style2, etc]}`
// Ignores non-objects, so you can do `this.state.isCool && styles.cool`.
/*:: import type {PluginConfig, PluginResult} from '.';*/var mergeStyleArrayPlugin = function mergeStyleArrayPlugin(_ref /*: PluginConfig*/) /*: PluginResult*/ {
  var style = _ref.style;
  var mergeStyles = _ref.mergeStyles;

  var newStyle = Array.isArray(style) ? mergeStyles(style) : style;
  return { style: newStyle };
};

module.exports = mergeStyleArrayPlugin;
},{}],19:[function(require,module,exports){
/* @flow */

'use strict';

var _callbacks = [];
var _mouseUpListenerIsActive = false;

var _handleMouseUp = function _handleMouseUp(ev) {
  _callbacks.forEach(function (callback) {
    callback(ev);
  });
};

var subscribe = function subscribe(callback /*: () => void*/) /*: {remove: () => void}*/ {
  if (_callbacks.indexOf(callback) === -1) {
    _callbacks.push(callback);
  }

  if (!_mouseUpListenerIsActive) {
    window.addEventListener('mouseup', _handleMouseUp);
    _mouseUpListenerIsActive = true;
  }

  return {
    remove: function remove() {
      var index = _callbacks.indexOf(callback);
      _callbacks.splice(index, 1);

      if (_callbacks.length === 0 && _mouseUpListenerIsActive) {
        window.removeEventListener('mouseup', _handleMouseUp);
        _mouseUpListenerIsActive = false;
      }
    }
  };
};

module.exports = {
  subscribe: subscribe
};
},{}],20:[function(require,module,exports){
/* @flow */

'use strict';

/*:: import type {PluginConfig, PluginResult} from '.';*/

var Prefixer = require('../prefixer');

var prefixPlugin = function prefixPlugin(_ref /*: PluginConfig*/) /*: PluginResult*/ {
  var componentName = _ref.componentName;
  var style = _ref.style;

  var newStyle = Prefixer.getPrefixedStyle(style, componentName);
  return { style: newStyle };
};

module.exports = prefixPlugin;
},{"../prefixer":23}],21:[function(require,module,exports){
/** @flow */

'use strict';

/*:: import type {PluginConfig, PluginResult} from '.';*/

var MouseUpListener = require('./mouse-up-listener');

var _isInteractiveStyleField = function _isInteractiveStyleField(styleFieldName) {
  return styleFieldName === ':hover' || styleFieldName === ':active' || styleFieldName === ':focus';
};

var resolveInteractionStyles = function resolveInteractionStyles(config /*: PluginConfig*/) /*: PluginResult*/ {
  var ExecutionEnvironment = config.ExecutionEnvironment;
  var getComponentField = config.getComponentField;
  var getState = config.getState;
  var mergeStyles = config.mergeStyles;
  var props = config.props;
  var setState = config.setState;
  var style = config.style;

  var newComponentFields = {};
  var newProps = {};

  // Only add handlers if necessary
  if (style[':hover']) {
    // Always call the existing handler if one is already defined.
    // This code, and the very similar ones below, could be abstracted a bit
    // more, but it hurts readability IMO.
    var existingOnMouseEnter = props.onMouseEnter;
    newProps.onMouseEnter = function (e) {
      existingOnMouseEnter && existingOnMouseEnter(e);
      setState(':hover', true);
    };

    var existingOnMouseLeave = props.onMouseLeave;
    newProps.onMouseLeave = function (e) {
      existingOnMouseLeave && existingOnMouseLeave(e);
      setState(':hover', false);
    };
  }

  if (style[':active']) {
    var existingOnMouseDown = props.onMouseDown;
    newProps.onMouseDown = function (e) {
      existingOnMouseDown && existingOnMouseDown(e);
      newComponentFields._lastMouseDown = Date.now();
      setState(':active', 'viamousedown');
    };

    var existingOnKeyDown = props.onKeyDown;
    newProps.onKeyDown = function (e) {
      existingOnKeyDown && existingOnKeyDown(e);
      if (e.key === ' ' || e.key === 'Enter') {
        setState(':active', 'viakeydown');
      }
    };

    var existingOnKeyUp = props.onKeyUp;
    newProps.onKeyUp = function (e) {
      existingOnKeyUp && existingOnKeyUp(e);
      if (e.key === ' ' || e.key === 'Enter') {
        setState(':active', false);
      }
    };
  }

  if (style[':focus']) {
    var existingOnFocus = props.onFocus;
    newProps.onFocus = function (e) {
      existingOnFocus && existingOnFocus(e);
      setState(':focus', true);
    };

    var existingOnBlur = props.onBlur;
    newProps.onBlur = function (e) {
      existingOnBlur && existingOnBlur(e);
      setState(':focus', false);
    };
  }

  if (style[':active'] && !getComponentField('_radiumMouseUpListener') && ExecutionEnvironment.canUseEventListeners) {
    newComponentFields._radiumMouseUpListener = MouseUpListener.subscribe(function () {
      Object.keys(getComponentField('state')._radiumStyleState).forEach(function (key) {
        if (getState(':active') === 'viamousedown') {
          setState(':active', false, key);
        }
      });
    });
  }

  // Merge the styles in the order they were defined
  var interactionStyles = Object.keys(style).filter(function (name) {
    return _isInteractiveStyleField(name) && getState(name);
  }).map(function (name) {
    return style[name];
  });

  var newStyle = mergeStyles([style].concat(interactionStyles));

  // Remove interactive styles
  newStyle = Object.keys(newStyle).reduce(function (styleWithoutInteractions, name) {
    if (!_isInteractiveStyleField(name)) {
      styleWithoutInteractions[name] = newStyle[name];
    }
    return styleWithoutInteractions;
  }, {});

  return {
    componentFields: newComponentFields,
    props: newProps,
    style: newStyle
  };
};

module.exports = resolveInteractionStyles;
},{"./mouse-up-listener":19}],22:[function(require,module,exports){
/** @flow */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*:: import type {MatchMediaType} from '../config';*/
/*:: import type {PluginConfig, PluginResult} from '.';*/

var _windowMatchMedia;
var _getWindowMatchMedia = function _getWindowMatchMedia(ExecutionEnvironment) {
  if (_windowMatchMedia === undefined) {
    _windowMatchMedia = !!ExecutionEnvironment.canUseDOM && !!window && !!window.matchMedia && function (mediaQueryString) {
      return window.matchMedia(mediaQueryString);
    } || null;
  }
  return _windowMatchMedia;
};

var resolveMediaQueries = function resolveMediaQueries(_ref /*: PluginConfig*/) /*: PluginResult*/ {
  var ExecutionEnvironment = _ref.ExecutionEnvironment;
  var getComponentField = _ref.getComponentField;
  var getGlobalState = _ref.getGlobalState;
  var config = _ref.config;
  var mergeStyles = _ref.mergeStyles;
  var setState = _ref.setState;
  var style = _ref.style;

  var newComponentFields = {};
  var newStyle = style;
  var matchMedia /*: ?MatchMediaType*/ = config.matchMedia || _getWindowMatchMedia(ExecutionEnvironment);
  if (!matchMedia) {
    return newStyle;
  }

  var mediaQueryListByQueryString = getGlobalState('mediaQueryListByQueryString') || {};

  Object.keys(style).filter(function (name) {
    return name.indexOf('@media') === 0;
  }).map(function (query) {
    var mediaQueryStyles = style[query];
    query = query.replace('@media ', '');

    // Create a global MediaQueryList if one doesn't already exist
    var mql = mediaQueryListByQueryString[query];
    if (!mql && matchMedia) {
      mediaQueryListByQueryString[query] = mql = matchMedia(query);
    }

    var listenersByQuery = getComponentField('_radiumMediaQueryListenersByQuery');

    if (!listenersByQuery || !listenersByQuery[query]) {
      var listener = function listener() {
        return setState(query, mql.matches, '_all');
      };
      mql.addListener(listener);
      newComponentFields._radiumMediaQueryListenersByQuery = _extends({}, listenersByQuery);
      newComponentFields._radiumMediaQueryListenersByQuery[query] = {
        remove: function remove() {
          mql.removeListener(listener);
        }
      };
    }

    // Apply media query states
    if (mql.matches) {
      newStyle = mergeStyles([newStyle, mediaQueryStyles]);
    }
  });

  // Remove media queries
  newStyle = Object.keys(newStyle).reduce(function (styleWithoutMedia, key) {
    if (key.indexOf('@media') !== 0) {
      styleWithoutMedia[key] = newStyle[key];
    }
    return styleWithoutMedia;
  }, {});

  return {
    componentFields: newComponentFields,
    globalState: { mediaQueryListByQueryString: mediaQueryListByQueryString },
    style: newStyle
  };
};

module.exports = resolveMediaQueries;
},{}],23:[function(require,module,exports){
(function (process){
/**
 * Based on https://github.com/jsstyles/css-vendor, but without having to
 * convert between different cases all the time.
 *
 * @flow
 */

'use strict';

var ExecutionEnvironment = require('exenv');
var arrayFind = require('array-find');

var VENDOR_PREFIX_REGEX = /-(moz|webkit|ms|o)-/;

var vendorPrefixes = ['Webkit', 'ms', 'Moz', 'O'];

var infoByCssPrefix = {
  '-moz-': {
    cssPrefix: '-moz-',
    jsPrefix: 'Moz',
    alternativeProperties: {
      // OLD - Firefox 19-
      alignItems: ['MozBoxAlign'],
      flex: ['MozBoxFlex'],
      flexDirection: ['MozBoxOrient'],
      justifyContent: ['MozBoxPack'],
      order: ['MozBoxOrdinalGroup']
    },
    alternativeValues: {
      // OLD - Firefox 19-
      alignItems: {
        'flex-start': ['start'],
        'flex-end': ['end']
      },
      display: {
        flex: ['-moz-box']
      },
      flexDirection: {
        column: ['vertical'],
        row: ['horizontal']
      },
      justifyContent: {
        'flex-start': ['start'],
        'flex-end': ['end'],
        'space-between': ['justify']
      }
    }
  },
  '-ms-': {
    cssPrefix: '-ms-',
    jsPrefix: 'ms',
    alternativeProperties: {
      // TWEENER - IE 10
      alignContent: ['msFlexLinePack'],
      alignItems: ['msFlexAlign'],
      alignSelf: ['msFlexAlignItem'],
      justifyContent: ['msFlexPack'],
      order: ['msFlexOrder']
    },
    alternativeValues: {
      // TWEENER - IE 10
      alignContent: {
        'flex-start': ['start'],
        'flex-end': ['end'],
        'space-between': ['justify'],
        'space-around': ['distribute']
      },
      alignItems: {
        'flex-start': ['start'],
        'flex-end': ['end']
      },
      alignSelf: {
        'flex-start': ['start'],
        'flex-end': ['end']
      },
      display: {
        flex: ['-ms-flexbox'],
        'inline-flex': ['-ms-inline-flexbox']
      },
      justifyContent: {
        'flex-start': ['start'],
        'flex-end': ['end'],
        'space-between': ['justify'],
        'space-around': ['distribute']
      }
    }
  },
  '-o-': {
    cssPrefix: '-o-',
    jsPrefix: 'O'
  },
  '-webkit-': {
    cssPrefix: '-webkit-',
    jsPrefix: 'Webkit',
    alternativeProperties: {
      // OLD - iOS 6-, Safari 3.1-6
      alignItems: ['WebkitBoxAlign'],
      flex: ['MozBoxFlex'],
      flexDirection: ['WebkitBoxOrient'],
      justifyContent: ['WebkitBoxPack'],
      order: ['WebkitBoxOrdinalGroup']
    },
    alternativeValues: {
      // OLD - iOS 6-, Safari 3.1-6
      alignItems: {
        'flex-start': ['start'],
        'flex-end': ['end']
      },
      display: {
        flex: ['-webkit-box']
      },
      flexDirection: {
        row: ['horizontal'],
        column: ['vertical']
      },
      justifyContent: {
        'flex-start': ['start'],
        'flex-end': ['end'],
        'space-between': ['justify']
      }
    }
  }
};

/**
 * CSS properties which accept numbers but are not in units of "px".
 * Copied from React core June 22, 2015.
 * https://github.com/facebook/react/blob/
 * ba81b60ad8e93b747be42a03b797065932c49c96/
 * src/renderers/dom/shared/CSSProperty.js
 */
var isUnitlessNumber = {
  boxFlex: true,
  boxFlexGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

var domStyle = {};
var prefixedPropertyCache = {};
var prefixedValueCache = {};
var prefixInfo = {
  cssPrefix: '',
  jsPrefix: ''
};

if (ExecutionEnvironment.canUseDOM) {
  domStyle = (document /*: any*/).createElement('p').style;

  // older Firefox versions may have no float property in style object
  // so we need to add it manually
  if (domStyle.float === undefined) {
    domStyle.float = '';
  }

  // Based on http://davidwalsh.name/vendor-prefix
  var prefixMatch;
  var windowStyles = window.getComputedStyle(document.documentElement, '');

  // Array.prototype.slice.call(windowStyles) fails with
  // "Uncaught TypeError: undefined is not a function"
  // in older versions Android (KitKat) web views
  for (var i = 0; i < windowStyles.length; i++) {
    prefixMatch = windowStyles[i].match(VENDOR_PREFIX_REGEX);

    if (prefixMatch) {
      break;
    }
  }

  var cssVendorPrefix = prefixMatch && prefixMatch[0];

  prefixInfo = cssVendorPrefix && infoByCssPrefix[cssVendorPrefix] ? infoByCssPrefix[cssVendorPrefix] : prefixInfo;
}

var getPrefixedPropertyName = function getPrefixedPropertyName(property /*: string*/) /*: string*/ {
  if (prefixedPropertyCache.hasOwnProperty(property)) {
    return prefixedPropertyCache[property];
  }

  var unprefixed = property;

  // Try the prefixed version first. Chrome in particular has the `filter` and
  // `webkitFilter` properties availalbe on the style object, but only the
  // prefixed version actually works.
  var possiblePropertyNames = [
  // Prefixed
  prefixInfo.jsPrefix + property[0].toUpperCase() + property.slice(1), unprefixed];

  // Alternative property names
  if (prefixInfo.alternativeProperties && prefixInfo.alternativeProperties[property]) {
    possiblePropertyNames = possiblePropertyNames.concat(prefixInfo.alternativeProperties[property]);
  }

  var workingProperty = arrayFind(possiblePropertyNames, function (possiblePropertyName) {
    if (possiblePropertyName in domStyle) {
      return possiblePropertyName;
    }
  }) || false;

  prefixedPropertyCache[property] = workingProperty;

  return prefixedPropertyCache[property];
};

// We are un-prefixing values before checking for isUnitlessNumber,
// otherwise we are at risk of being in a situation where someone
// explicitly passes something like `MozBoxFlex: 1` and that will
// in turn get transformed into `MozBoxFlex: 1px`.
var _getUnprefixedProperty = function _getUnprefixedProperty(property) {
  var noPrefixProperty = property;

  vendorPrefixes.some(function (prefix) {
    // Let's check if the property starts with a vendor prefix
    if (property.indexOf(prefix) === 0) {
      noPrefixProperty = noPrefixProperty.replace(prefix, '');

      // We have removed the vendor prefix, however the first
      // character is going to be uppercase hence won't match
      // any of the `isUnitlessNumber` keys as they all start
      // with lower case. Let's ensure that the first char is
      // lower case.
      noPrefixProperty = noPrefixProperty.charAt(0).toLowerCase() + noPrefixProperty.slice(1);

      return true;
    }
  });

  return noPrefixProperty;
};

// React is planning to deprecate adding px automatically
// (https://github.com/facebook/react/issues/1873), and if they do, this
// should change to a warning or be removed in favor of React's warning.
// Same goes for below.
var _addPixelSuffixToValueIfNeeded = function _addPixelSuffixToValueIfNeeded(originalProperty, value) {
  var unPrefixedProperty = _getUnprefixedProperty(originalProperty);

  if (value !== 0 && !isNaN(value) && !isUnitlessNumber[unPrefixedProperty]) {
    return value + 'px';
  }
  return value;
};

var _getPrefixedValue = function _getPrefixedValue(componentName, property, value, originalProperty) {
  if (!Array.isArray(value)) {
    // don't test numbers (pure or stringy), but do add 'px' prefix if needed
    if (!isNaN(value) && value !== null) {
      return _addPixelSuffixToValueIfNeeded(originalProperty, value);
    }

    if (typeof value !== 'string') {
      if (value !== null && value !== undefined) {
        value = value.toString();
      } else {
        return value;
      }
    }

    // don't test numbers with units (e.g. 10em)
    if (!isNaN(parseInt(value, 10))) {
      return value;
    }
  }

  var cacheKey = Array.isArray(value) ? value.join(' || ') : property + value;

  if (prefixedValueCache.hasOwnProperty(cacheKey)) {
    return prefixedValueCache[cacheKey];
  }

  var possibleValues;
  if (Array.isArray(value)) {
    // Add px for the same values React would, otherwise the testing below will
    // fail and it will try to fallback.
    possibleValues = value.map(function (v) {
      return _addPixelSuffixToValueIfNeeded(originalProperty, v);
    });

    // Add prefixed versions
    possibleValues = possibleValues.concat(value.filter(function (v) {
      return !isNaN(v);
    }) // Don't prefix numbers
    .map(function (v) {
      return prefixInfo.cssPrefix + v;
    }));
  } else {
    possibleValues = [
    // Unprefixed
    value,
    // Prefixed
    prefixInfo.cssPrefix + value];
  }

  // Alternative values
  if (prefixInfo.alternativeValues && prefixInfo.alternativeValues[originalProperty] && prefixInfo.alternativeValues[originalProperty][value]) {
    possibleValues = possibleValues.concat(prefixInfo.alternativeValues[originalProperty][value]);
  }

  // Test possible value in order
  var workingValue = arrayFind(possibleValues, function (possibleValue) {
    domStyle[property] = '';
    domStyle[property] = possibleValue;

    // Note that we just make sure it is not an empty string. Browsers will
    // sometimes rewrite values, but still accept them. They will set the value
    // to an empty string if not supported.
    // E.g. for border, "solid 1px black" becomes "1px solid black"
    //      but "foobar" becomes "", since it is not supported.
    return !!domStyle[property];
  });

  if (workingValue) {
    prefixedValueCache[cacheKey] = workingValue;
  } else {
    // Unsupported, assume unprefixed works, but warn
    prefixedValueCache[cacheKey] = value;

    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable no-console */
      if (console && console.warn) {
        var componentContext = componentName ? ' in component "' + componentName + '"' : '';

        console.warn('Unsupported CSS value "' + value + '" for property "' + property + '"' + componentContext);
      }
      /* eslint-enable no-console */
    }
  }

  return prefixedValueCache[cacheKey];
};

// Returns a new style object with vendor prefixes added to property names
// and values.
var getPrefixedStyle = function getPrefixedStyle(style /*: Object*/, componentName /*: ?string*/) /*: Object*/ {
  if (!ExecutionEnvironment.canUseDOM) {
    return Object.keys(style).reduce(function (newStyle, key) {
      var value = style[key];
      var newValue = Array.isArray(value) ? value[0] : value;
      newStyle[key] = newValue;
      return newStyle;
    }, {});
  }

  var prefixedStyle = {};
  Object.keys(style).forEach(function (property) {
    var value = style[property];

    var newProperty = getPrefixedPropertyName(property);
    if (!newProperty) {
      // Ignore unsupported properties
      if (process.env.NODE_ENV !== 'production') {
        /* eslint-disable no-console */
        if (console && console.warn) {
          var componentContext = componentName ? ' in component "' + componentName + '"' : '';

          console.warn('Unsupported CSS property "' + property + '"' + componentContext);
        }
        /* eslint-enable no-console */
        return;
      }
    }

    var newValue = _getPrefixedValue(componentName, newProperty, value, property);

    prefixedStyle[newProperty] = newValue;
  });
  return prefixedStyle;
};

module.exports = {
  getPrefixedStyle: getPrefixedStyle,
  cssPrefix: prefixInfo.cssPrefix,
  jsPrefix: prefixInfo.jsPrefix
};
}).call(this,require('_process'))
},{"_process":5,"array-find":1,"exenv":2}],24:[function(require,module,exports){
/* @flow */

"use strict";

var allPrintStyles = {};
var listeners = [];

var subscribe = function subscribe(listener /*: () => void*/) /*: {remove: () => void}*/ {
  if (listeners.indexOf(listener) === -1) {
    listeners.push(listener);
  }

  return {
    remove: function remove() {
      var listenerIndex = listeners.indexOf(listener);

      if (listenerIndex > -1) {
        listeners.splice(listenerIndex, 1);
      }
    }
  };
};

var _emitChange = function _emitChange() {
  listeners.forEach(function (listener) {
    return listener();
  });
};

var _appendImportantToEachValue = function _appendImportantToEachValue(styleObj) {
  var importantStyleObj = {};

  Object.keys(styleObj).forEach(function (key) {
    var value = styleObj[key];

    // This breaks unitless values but they'll be deprecated soon anyway
    // https://github.com/facebook/react/issues/1873
    value = value + " !important";
    importantStyleObj[key] = value;
  });

  return importantStyleObj;
};

var addPrintStyles = function addPrintStyles(Component /*: constructor*/) {
  if (!Component.printStyles) {
    return;
  }

  var printStyleClass = {};

  Object.keys(Component.printStyles).forEach(function (key) {
    var styles = Component.printStyles[key];
    var className = "Radium-" + Component.displayName + "-" + key;
    allPrintStyles["." + className] = _appendImportantToEachValue(styles);
    printStyleClass[key] = className;
  });

  // Allows for lazy loading of JS that then calls Radium to update the
  // print styles
  _emitChange();
  return printStyleClass;
};

var getPrintStyles = function getPrintStyles() /*: Object*/ {
  return allPrintStyles;
};

module.exports = {
  addPrintStyles: addPrintStyles,
  getPrintStyles: getPrintStyles,
  subscribe: subscribe
};
},{}],25:[function(require,module,exports){
/* @flow */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/*:: import type {Config} from './config';*/

var _getState = require('./get-state');
var getStateKey = require('./get-state-key');
var mergeStyles = require('./merge-styles');
var Plugins = require('./plugins/');

var ExecutionEnvironment = require('exenv');
var React = require('react');

var DEFAULT_CONFIG = {
  plugins: [Plugins.mergeStyleArray, Plugins.checkProps, Plugins.resolveMediaQueries, Plugins.resolveInteractionStyles, Plugins.prefix, Plugins.checkProps]
};

// Gross
var globalState = {};

// Declare early for recursive helpers.
var resolveStyles = ((null /*: any*/) /*: (
                                        component: any, // ReactComponent, flow+eslint complaining
                                        renderedElement: any,
                                        config: Config,
                                        existingKeyMap?: {[key: string]: bool}
                                      ) => any*/);

var _resolveChildren = function _resolveChildren(_ref) {
  var children = _ref.children;
  var component = _ref.component;
  var config = _ref.config;
  var existingKeyMap = _ref.existingKeyMap;

  if (!children) {
    return children;
  }

  var childrenType = typeof children;

  if (childrenType === 'string' || childrenType === 'number') {
    // Don't do anything with a single primitive child
    return children;
  }

  if (childrenType === 'function') {
    // Wrap the function, resolving styles on the result
    return function () {
      var result = children.apply(this, arguments);
      if (React.isValidElement(result)) {
        return resolveStyles(component, result, config, existingKeyMap);
      }
      return result;
    };
  }

  if (React.Children.count(children) === 1 && children.type) {
    // If a React Element is an only child, don't wrap it in an array for
    // React.Children.map() for React.Children.only() compatibility.
    var onlyChild = React.Children.only(children);
    return resolveStyles(component, onlyChild, config, existingKeyMap);
  }

  return React.Children.map(children, function (child) {
    if (React.isValidElement(child)) {
      return resolveStyles(component, child, config, existingKeyMap);
    }

    return child;
  });
};

// Recurse over props, just like children
var _resolveProps = function _resolveProps(_ref2) {
  var component = _ref2.component;
  var config = _ref2.config;
  var existingKeyMap = _ref2.existingKeyMap;
  var props = _ref2.props;

  var newProps = props;

  Object.keys(props).forEach(function (prop) {
    // We already recurse over children above
    if (prop === 'children') {
      return;
    }

    var propValue = props[prop];
    if (React.isValidElement(propValue)) {
      newProps = _extends({}, newProps);
      newProps[prop] = resolveStyles(component, propValue, config, existingKeyMap);
    }
  });

  return newProps;
};

var _buildGetKey = function _buildGetKey(renderedElement, existingKeyMap) {
  // We need a unique key to correlate state changes due to user interaction
  // with the rendered element, so we know to apply the proper interactive
  // styles.
  var originalKey = typeof renderedElement.ref === 'string' ? renderedElement.ref : renderedElement.key;
  var key = getStateKey(originalKey);

  var alreadyGotKey = false;
  var getKey = function getKey() {
    if (alreadyGotKey) {
      return key;
    }

    alreadyGotKey = true;

    if (existingKeyMap[key]) {
      throw new Error('Radium requires each element with interactive styles to have a unique ' + 'key, set using either the ref or key prop. ' + (originalKey ? 'Key "' + originalKey + '" is a duplicate.' : 'Multiple elements have no key specified.'));
    }

    existingKeyMap[key] = true;

    return key;
  };

  return getKey;
};

var _setStyleState = function _setStyleState(component, key, stateKey, value) {
  if (!component._radiumIsMounted) {
    return;
  }

  var existing = component._lastRadiumState || component.state && component.state._radiumStyleState || {};

  var state = { _radiumStyleState: _extends({}, existing) };
  state._radiumStyleState[key] = _extends({}, state._radiumStyleState[key]);
  state._radiumStyleState[key][stateKey] = value;

  component._lastRadiumState = state._radiumStyleState;
  component.setState(state);
};

var _runPlugins = function _runPlugins(_ref3) {
  var component = _ref3.component;
  var config = _ref3.config;
  var existingKeyMap = _ref3.existingKeyMap;
  var props = _ref3.props;
  var renderedElement = _ref3.renderedElement;

  // Don't run plugins if renderedElement is not a simple ReactDOMElement or has
  // no style.
  if (!React.isValidElement(renderedElement) || typeof renderedElement.type !== 'string' || !props.style) {
    return props;
  }

  var newProps = props;

  var plugins = config.plugins || DEFAULT_CONFIG.plugins;

  var getKey = _buildGetKey(renderedElement, existingKeyMap);

  var newStyle = props.style;
  plugins.forEach(function (plugin) {
    var result = plugin({
      ExecutionEnvironment: ExecutionEnvironment,
      componentName: component.constructor.displayName || component.constructor.name,
      config: config,
      getComponentField: function getComponentField(key) {
        return component[key];
      },
      getGlobalState: function getGlobalState(key) {
        return globalState[key];
      },
      getState: function getState(stateKey, elementKey) {
        return _getState(component.state, elementKey || getKey(), stateKey);
      },
      mergeStyles: mergeStyles,
      props: newProps,
      setState: function setState(stateKey, value, elementKey) {
        return _setStyleState(component, elementKey || getKey(), stateKey, value);
      },
      style: newStyle
    }) || {};

    newStyle = result.style || newStyle;

    newProps = result.props && Object.keys(result.props).length ? _extends({}, newProps, result.props) : newProps;

    var newComponentFields = result.componentFields || {};
    Object.keys(newComponentFields).forEach(function (fieldName) {
      component[fieldName] = newComponentFields[fieldName];
    });

    var newGlobalState = result.globalState || {};
    Object.keys(newGlobalState).forEach(function (key) {
      globalState[key] = newGlobalState[key];
    });
  });

  if (newStyle !== props.style) {
    newProps = _extends({}, newProps, { style: newStyle });
  }

  return newProps;
};

// Wrapper around React.cloneElement. To avoid processing the same element
// twice, whenever we clone an element add a special prop to make sure we don't
// process this element again.
var _cloneElement = function _cloneElement(renderedElement, newProps, newChildren) {
  // Only add flag if this is a normal DOM element
  if (typeof renderedElement.type === 'string') {
    newProps = _extends({}, newProps, { _radiumDidResolveStyles: true });
  }

  return React.cloneElement(renderedElement, newProps, newChildren);
};

//
// The nucleus of Radium. resolveStyles is called on the rendered elements
// before they are returned in render. It iterates over the elements and
// children, rewriting props to add event handlers required to capture user
// interactions (e.g. mouse over). It also replaces the style prop because it
// adds in the various interaction styles (e.g. :hover).
//
resolveStyles = function (component /*: any*/, // ReactComponent, flow+eslint complaining
renderedElement /*: any*/, // ReactElement
config /*: Config*/, existingKeyMap /*:: ?: {[key: string]: boolean}*/) /*: any*/ {
  if (config === undefined) config = DEFAULT_CONFIG;
  // ReactElement
  existingKeyMap = existingKeyMap || {};

  if (!renderedElement ||
  // Bail if we've already processed this element. This ensures that only the
  // owner of an element processes that element, since the owner's render
  // function will be called first (which will always be the case, since you
  // can't know what else to render until you render the parent component).
  renderedElement.props && renderedElement.props._radiumDidResolveStyles) {
    return renderedElement;
  }

  var newChildren = _resolveChildren({
    children: renderedElement.props.children,
    component: component,
    config: config,
    existingKeyMap: existingKeyMap
  });

  var newProps = _resolveProps({
    component: component,
    config: config,
    existingKeyMap: existingKeyMap,
    props: renderedElement.props
  });

  newProps = _runPlugins({
    component: component,
    config: config,
    existingKeyMap: existingKeyMap,
    props: newProps,
    renderedElement: renderedElement
  });

  // If nothing changed, don't bother cloning the element. Might be a bit
  // wasteful, as we add the sentinal to stop double-processing when we clone.
  // Assume benign double-processing is better than unneeded cloning.
  if (newChildren === renderedElement.props.children && newProps === renderedElement.props) {
    return renderedElement;
  }

  return _cloneElement(renderedElement, newProps !== renderedElement.props ? newProps : {}, newChildren);
};

// Only for use by tests
resolveStyles.__clearStateForTests = function () {
  globalState = {};
};

module.exports = resolveStyles;
// ReactComponent, flow+eslint complaining
},{"./get-state":12,"./get-state-key":11,"./merge-styles":15,"./plugins/":17,"exenv":2,"react":undefined}],26:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _radium = require('radium');
var _radium2 = _interopRequireDefault(_radium);
var BurgerIcon = (0, _radium2['default'])(_react2['default'].createClass({
        getLineStyle: function getLineStyle(index) {
            return {
                position: 'absolute',
                height: '20%',
                left: 0,
                right: 0,
                top: 20 * (index * 2) + '%',
                opacity: this.state.hover ? 0.6 : 1
            };
        },
        handleHover: function handleHover() {
            this.setState({ hover: !this.state.hover });
        },
        getInitialState: function getInitialState() {
            return { hover: false };
        },
        render: function render() {
            var buttonStyle = {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    margin: 0,
                    padding: 0,
                    border: 'none',
                    fontSize: 14,
                    color: 'transparent',
                    background: 'transparent',
                    outline: 'none'
                };
            return _react2['default'].createElement('div', {
                className: 'bm-burger-button',
                style: { zIndex: 1 }
            }, _react2['default'].createElement('span', {
                className: 'bm-burger-bars',
                style: this.getLineStyle(0)
            }), _react2['default'].createElement('span', {
                className: 'bm-burger-bars',
                style: this.getLineStyle(1)
            }), _react2['default'].createElement('span', {
                className: 'bm-burger-bars',
                style: this.getLineStyle(2)
            }), _react2['default'].createElement('button', {
                onClick: this.props.onClick,
                onMouseEnter: this.handleHover,
                onMouseLeave: this.handleHover,
                style: buttonStyle
            }, 'Open Menu'));
        }
    }));
exports['default'] = BurgerIcon;
module.exports = exports['default'];
},{"radium":13,"react":undefined}],27:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _radium = require('radium');
var _radium2 = _interopRequireDefault(_radium);
var CrossIcon = (0, _radium2['default'])(_react2['default'].createClass({
        getCrossStyle: function getCrossStyle(type) {
            return {
                position: 'absolute',
                width: 3,
                height: 14,
                top: 14,
                right: 18,
                cursor: 'pointer',
                transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)',
                zIndex: 1
            };
        },
        render: function render() {
            var buttonStyle = {
                    width: 14,
                    height: 14,
                    position: 'absolute',
                    right: 13,
                    top: 14,
                    padding: 0,
                    overflow: 'hidden',
                    textIndent: 14,
                    fontSize: 14,
                    border: 'none',
                    background: 'transparent',
                    color: 'transparent',
                    outline: 'none',
                    zIndex: 1
                };
            return _react2['default'].createElement('div', null, _react2['default'].createElement('span', {
                className: 'bm-cross',
                style: this.getCrossStyle('before')
            }), _react2['default'].createElement('span', {
                className: 'bm-cross',
                style: this.getCrossStyle('after')
            }), _react2['default'].createElement('button', {
                onClick: this.props.onClick,
                style: buttonStyle
            }, 'Close Menu'));
        }
    }));
exports['default'] = CrossIcon;
module.exports = exports['default'];
},{"radium":13,"react":undefined}],28:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var styles = {
        overlay: function overlay(isOpen) {
            return {
                position: 'fixed',
                zIndex: 1,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: isOpen ? 'opacity 0.3s' : 'opacity 0.3s, transform 0s 0.3s'
            };
        },
        menuWrap: function menuWrap(isOpen, width, right) {
            return {
                position: 'fixed',
                right: right ? 0 : 'inherit',
                zIndex: 2,
                width: width,
                height: '100%',
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: 'all 0.5s'
            };
        },
        menu: function menu() {
            return {
                height: '100%',
                boxSizing: 'border-box'
            };
        },
        itemList: function itemList() {
            return { height: '100%' };
        },
        item: function item() {
            return {
                display: 'block',
                outline: 'none'
            };
        }
    };
exports['default'] = styles;
module.exports = exports['default'];
},{}],29:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _radium = require('radium');
var _radium2 = _interopRequireDefault(_radium);
var _baseStyles = require('./baseStyles');
var _baseStyles2 = _interopRequireDefault(_baseStyles);
var _BurgerIcon = require('./BurgerIcon');
var _BurgerIcon2 = _interopRequireDefault(_BurgerIcon);
var _CrossIcon = require('./CrossIcon');
var _CrossIcon2 = _interopRequireDefault(_CrossIcon);
exports['default'] = function (styles) {
    return (0, _radium2['default'])(_react2['default'].createClass({
        propTypes: {
            id: _react2['default'].PropTypes.string,
            isOpen: _react2['default'].PropTypes.bool,
            outerContainerId: _react2['default'].PropTypes.string,
            pageWrapId: _react2['default'].PropTypes.string,
            right: _react2['default'].PropTypes.bool,
            width: _react2['default'].PropTypes.number
        },
        toggleMenu: function toggleMenu() {
            this.applyWrapperStyles();
            this.setState({ isOpen: !this.state.isOpen });
        },
        applyWrapperStyles: function applyWrapperStyles() {
            if (styles.pageWrap && this.props.pageWrapId) {
                this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, true);
            }
            if (styles.outerContainer && this.props.outerContainerId) {
                this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, true);
            }
        },
        clearWrapperStyles: function clearWrapperStyles() {
            if (styles.pageWrap && this.props.pageWrapId) {
                this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, false);
            }
            if (styles.outerContainer && this.props.outerContainerId) {
                this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, false);
            }
        },
        handleExternalWrapper: function handleExternalWrapper(id, wrapperStyles, set) {
            var wrapper = document.getElementById(id);
            if (!wrapper) {
                console.error('Element with ID \'' + id + '\' not found');
                return;
            }
            wrapperStyles = wrapperStyles(this.state.isOpen, this.props.width, this.props.right);
            for (var prop in wrapperStyles) {
                if (wrapperStyles.hasOwnProperty(prop)) {
                    wrapper.style[prop] = set ? wrapperStyles[prop] : '';
                }
            }
        },
        listenForClose: function listenForClose(e) {
            e = e || window.event;
            if (this.state.isOpen && (e.key === 'Escape' || e.keyCode === 27)) {
                this.toggleMenu();
            }
        },
        getDefaultProps: function getDefaultProps() {
            return {
                id: '',
                isOpen: false,
                outerContainerId: '',
                pageWrapId: '',
                right: false,
                width: 300
            };
        },
        getInitialState: function getInitialState() {
            return { isOpen: false };
        },
        componentWillMount: function componentWillMount() {
            if (!styles) {
                throw new Error('No styles supplied');
            }
            if (styles.pageWrap && !this.props.pageWrapId) {
                console.warn('No pageWrapId supplied');
            }
            if (styles.outerContainer && !this.props.outerContainerId) {
                console.warn('No outerContainerId supplied');
            }
            if (this.props.isOpen !== this.state.isOpen) {
                this.toggleMenu();
            }
        },
        componentDidMount: function componentDidMount() {
            window.onkeydown = this.listenForClose;
        },
        componentWillUnmount: function componentWillUnmount() {
            window.onkeydown = null;
            this.clearWrapperStyles();
        },
        componentDidUpdate: function componentDidUpdate() {
            var _this = this;
            if (styles.svg && this.isMounted()) {
                (function () {
                    var snap = undefined;
                    try {
                        snap = function () {
                            throw new Error('Cannot find module \'imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js\' from \'/Users/imogen/code/react-burger-menu/src\'');
                        }();
                    } catch (e) {
                        snap = require('snapsvg');
                    }
                    var morphShape = document.getElementsByClassName('bm-morph-shape')[0];
                    var s = snap(morphShape);
                    var path = s.select('path');
                    if (_this.state.isOpen) {
                        styles.svg.animate(path);
                    } else {
                        setTimeout(function () {
                            path.attr('d', styles.svg.pathInitial);
                        }, 300);
                    }
                }());
            }
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            if (nextProps.isOpen !== this.state.isOpen) {
                this.toggleMenu();
            }
        },
        render: function render() {
            var _this2 = this;
            var items = undefined, svg = undefined;
            var menuWrapStyles = [_baseStyles2['default'].menuWrap(this.state.isOpen, this.props.width, this.props.right)];
            var menuStyles = [_baseStyles2['default'].menu(this.state.isOpen)];
            var itemListStyles = [_baseStyles2['default'].itemList()];
            var closeButtonStyles = undefined;
            if (styles.menuWrap) {
                menuWrapStyles.push(styles.menuWrap(this.state.isOpen, this.props.width, this.props.right));
            }
            if (styles.menu) {
                menuStyles.push(styles.menu(this.state.isOpen, this.props.width, this.props.right));
            }
            if (styles.itemList) {
                itemListStyles.push(styles.itemList(this.props.right));
            }
            if (styles.closeButton) {
                closeButtonStyles = styles.closeButton(this.state.isOpen, this.props.width, this.props.right);
            }
            if (this.props.children) {
                items = _react2['default'].Children.map(this.props.children, function (item, index) {
                    var itemStyles = [_baseStyles2['default'].item(_this2.state.isOpen)];
                    if (styles.item) {
                        itemStyles.push(styles.item(_this2.state.isOpen, _this2.props.width, index + 1, _this2.props.right));
                    }
                    var extraProps = {
                            key: index,
                            style: itemStyles
                        };
                    return _react2['default'].cloneElement(item, extraProps);
                });
            }
            if (styles.svg) {
                svg = _react2['default'].createElement('div', {
                    className: 'bm-morph-shape',
                    style: styles.morphShape(this.props.right)
                }, _react2['default'].createElement('svg', {
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: '100%',
                    height: '100%',
                    viewBox: '0 0 100 800',
                    preserveAspectRatio: 'none'
                }, _react2['default'].createElement('path', { d: styles.svg.pathInitial })));
            }
            return _react2['default'].createElement('div', null, _react2['default'].createElement('div', {
                className: 'bm-overlay',
                onClick: this.toggleMenu,
                style: _baseStyles2['default'].overlay(this.state.isOpen)
            }), _react2['default'].createElement('div', {
                id: this.props.id,
                className: 'bm-menu-wrap',
                style: menuWrapStyles
            }, svg, _react2['default'].createElement('div', {
                className: 'bm-menu',
                style: menuStyles
            }, _react2['default'].createElement('nav', {
                className: 'bm-item-list',
                style: itemListStyles
            }, items)), _react2['default'].createElement('div', { style: closeButtonStyles }, _react2['default'].createElement(_CrossIcon2['default'], { onClick: this.toggleMenu }))), _react2['default'].createElement(_BurgerIcon2['default'], { onClick: this.toggleMenu }));
        }
    }));
};
module.exports = exports['default'];
},{"./BurgerIcon":26,"./CrossIcon":27,"./baseStyles":28,"radium":13,"react":undefined,"snapsvg":undefined}],30:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
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
                    if (pos > stepsTotal - 1)
                        return;
                    path.animate({ path: steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function () {
                        nextStep();
                    });
                    pos++;
                };
                nextStep(pos);
            }
        },
        morphShape: function morphShape(right) {
            return {
                position: 'fixed',
                width: '100%',
                height: '100%',
                right: right ? 'inherit' : 0,
                left: right ? 0 : 'inherit',
                transform: right ? 'rotateY(180deg)' : 'rotateY(0deg)'
            };
        },
        menuWrap: function menuWrap(isOpen, width, right) {
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
            };
        },
        menu: function menu(isOpen, width, right) {
            width -= 140;
            return {
                position: 'fixed',
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + 'px, 0, 0)' : 'translate3d(-' + width + 'px, 0, 0)',
                transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                opacity: isOpen ? 1 : 0
            };
        },
        item: function item(isOpen, width, nthChild, right) {
            width -= 140;
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + 'px, 0, 0)' : 'translate3d(-' + width + 'px, 0, 0)',
                transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                opacity: isOpen ? 1 : 0
            };
        },
        closeButton: function closeButton(isOpen, width, right) {
            width -= 140;
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + 'px, 0, 0)' : 'translate3d(-' + width + 'px, 0, 0)',
                transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                opacity: isOpen ? 1 : 0
            };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":29}],31:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        svg: {
            pathInitial: 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
            pathOpen: 'M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z',
            animate: function animate(path) {
                path.animate({ path: this.pathOpen }, 400, window.mina.easeinout);
            }
        },
        morphShape: function morphShape(right) {
            return {
                position: 'fixed',
                width: 120,
                height: '100%',
                right: right ? 'inherit' : 0,
                left: right ? 0 : 'inherit',
                transform: right ? 'rotateY(180deg)' : 'rotateY(0deg)'
            };
        },
        menuWrap: function menuWrap(isOpen, width, right) {
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: 'all 0.3s'
            };
        },
        menu: function menu(isOpen, width, right) {
            return {
                position: 'fixed',
                right: right ? 0 : 'inherit',
                width: 'calc(100% - 120px)',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box'
            };
        },
        itemList: function itemList(right) {
            if (right) {
                return {
                    position: 'relative',
                    left: '-110px'
                };
            }
        },
        pageWrap: function pageWrap(isOpen, width, right) {
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(-100px, 0, 0)' : 'translate3d(100px, 0, 0)',
                transition: isOpen ? 'all 0.3s' : 'all 0.3s 0.1s'
            };
        },
        outerContainer: function outerContainer(isOpen) {
            return { overflow: isOpen ? '' : 'hidden' };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":29}],32:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        menuWrap: function menuWrap(isOpen) {
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
                transition: 'all 0.5s ease-in-out'
            };
        },
        pageWrap: function pageWrap(isOpen, width, right) {
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(-' + width + 'px, 0, 0)' : 'translate3d(' + width + 'px, 0, 0)',
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
},{"../menuFactory":29}],33:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        pageWrap: function pageWrap(isOpen, width, right) {
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(-' + width + 'px, 0, 0)' : 'translate3d(' + width + 'px, 0, 0)',
                transition: 'all 0.5s'
            };
        },
        outerContainer: function outerContainer(isOpen) {
            return { overflow: isOpen ? '' : 'hidden' };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":29}],34:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        pageWrap: function pageWrap(isOpen, width, right) {
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(-' + width + 'px, 0, 0) rotateY(15deg)' : 'translate3d(' + width + 'px, 0, 0) rotateY(-15deg)',
                transformOrigin: right ? '100% 50%' : '0% 50%',
                transformStyle: 'preserve-3d',
                transition: 'all 0.5s'
            };
        },
        outerContainer: function outerContainer(isOpen) {
            return {
                perspective: '1500px',
                overflow: isOpen ? '' : 'hidden'
            };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":29}],35:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        pageWrap: function pageWrap(isOpen, width) {
            return {
                transform: isOpen ? 'translate3d(0, 0, 1px)' : 'translate3d(0, 0, -' + width + 'px)',
                transformOrigin: '100%',
                transformStyle: 'preserve-3d',
                transition: 'all 0.5s'
            };
        },
        outerContainer: function outerContainer() {
            return { perspective: '1500px' };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":29}],36:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        pageWrap: function pageWrap(isOpen, width, right) {
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(-100px, 0, -600px) rotateY(20deg)' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                transformStyle: 'preserve-3d',
                transition: 'all 0.5s',
                overflow: isOpen ? '' : 'hidden'
            };
        },
        outerContainer: function outerContainer(isOpen) {
            return {
                perspective: '1500px',
                overflow: isOpen ? '' : 'hidden'
            };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":29}],37:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {};
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":29}],38:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var styles = {
        menuWrap: function menuWrap(isOpen, width, right) {
            width += 20;
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(' + width + 'px, 0, 0)' : 'translate3d(-' + width + 'px, 0, 0)',
                transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
            };
        },
        item: function item(isOpen, width, nthChild) {
            return {
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)'
            };
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":29}],"react-burger-menu":[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports['default'] = {
    slide: require('./menus/slide'),
    stack: require('./menus/stack'),
    elastic: require('./menus/elastic'),
    bubble: require('./menus/bubble'),
    push: require('./menus/push'),
    pushRotate: require('./menus/pushRotate'),
    scaleDown: require('./menus/scaleDown'),
    scaleRotate: require('./menus/scaleRotate'),
    fallDown: require('./menus/fallDown')
};
module.exports = exports['default'];
},{"./menus/bubble":30,"./menus/elastic":31,"./menus/fallDown":32,"./menus/push":33,"./menus/pushRotate":34,"./menus/scaleDown":35,"./menus/scaleRotate":36,"./menus/slide":37,"./menus/stack":38}]},{},[]);
