(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BurgerMenu = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var getVendorPropertyName = require('./getVendorPropertyName');

module.exports = function(target, sources) {
  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  var prefixed = {};
  for (var key in to) {
    prefixed[getVendorPropertyName(key)] = to[key]
  }

  return prefixed
}

},{"./getVendorPropertyName":2}],2:[function(require,module,exports){
'use strict';

var div = document.createElement('div');
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
var domVendorPrefix;

// Helper function to get the proper vendor property name. (transition => WebkitTransition)
module.exports = function(prop) {

  if (prop in div.style) return prop;

  var prop = prop.charAt(0).toUpperCase() + prop.substr(1);
  if (domVendorPrefix) {
    return domVendorPrefix + prop;
  } else {
    for (var i = 0; i < prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop;
      if (vendorProp in div.style) {
        domVendorPrefix = prefixes[i];
        return vendorProp;
      }
    }
  }
}

},{}],3:[function(require,module,exports){
(function (global){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _react = typeof window !== 'undefined' ? window['React'] : typeof global !== 'undefined' ? global['React'] : null;
var _react2 = _interopRequireDefault(_react);
var _reactKitAppendVendorPrefix = require('react-kit/appendVendorPrefix');
var _reactKitAppendVendorPrefix2 = _interopRequireDefault(_reactKitAppendVendorPrefix);
var BurgerIcon = _react2['default'].createClass({
        displayName: 'BurgerIcon',
        getLineStyle: function getLineStyle(index) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                position: 'fixed',
                height: 6,
                width: 36,
                left: 36,
                top: 36 + 12 * index,
                zIndex: 1,
                opacity: this.state.hover ? 0.6 : 1
            });
        },
        handleHover: function handleHover() {
            this.setState({ hover: !this.state.hover });
        },
        getInitialState: function getInitialState() {
            return { hover: false };
        },
        render: function render() {
            var buttonStyle = (0, _reactKitAppendVendorPrefix2['default'])({
                    position: 'fixed',
                    zIndex: 1,
                    margin: 24,
                    padding: 0,
                    width: 60,
                    height: 54,
                    border: 'none',
                    textIndent: 60,
                    fontSize: 24,
                    color: 'transparent',
                    background: 'transparent',
                    outline: 'none'
                });
            return _react2['default'].createElement('div', null, _react2['default'].createElement('span', {
                className: 'bm-burger-icon',
                style: this.getLineStyle(0)
            }), _react2['default'].createElement('span', {
                className: 'bm-burger-icon',
                style: this.getLineStyle(1)
            }), _react2['default'].createElement('span', {
                className: 'bm-burger-icon',
                style: this.getLineStyle(2)
            }), _react2['default'].createElement('button', {
                onClick: this.props.onClick,
                onMouseEnter: this.handleHover,
                onMouseLeave: this.handleHover,
                style: buttonStyle
            }, 'Open Menu'));
        }
    });
exports['default'] = BurgerIcon;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-kit/appendVendorPrefix":1}],4:[function(require,module,exports){
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
},{"./menus/bubble":7,"./menus/elastic":8,"./menus/fallDown":9,"./menus/push":10,"./menus/pushRotate":11,"./menus/scaleDown":12,"./menus/scaleRotate":13,"./menus/slide":14,"./menus/stack":15}],5:[function(require,module,exports){
(function (global){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _react = typeof window !== 'undefined' ? window['React'] : typeof global !== 'undefined' ? global['React'] : null;
var _react2 = _interopRequireDefault(_react);
var _reactKitAppendVendorPrefix = require('react-kit/appendVendorPrefix');
var _reactKitAppendVendorPrefix2 = _interopRequireDefault(_reactKitAppendVendorPrefix);
var CrossIcon = _react2['default'].createClass({
        displayName: 'CrossIcon',
        getCrossStyle: function getCrossStyle(type) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                position: 'absolute',
                width: 3,
                height: 14,
                top: 14,
                right: 18,
                cursor: 'pointer',
                transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)',
                zIndex: 1
            });
        },
        render: function render() {
            var buttonStyle = (0, _reactKitAppendVendorPrefix2['default'])({
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
                });
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
    });
exports['default'] = CrossIcon;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-kit/appendVendorPrefix":1}],6:[function(require,module,exports){
(function (global){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _react = typeof window !== 'undefined' ? window['React'] : typeof global !== 'undefined' ? global['React'] : null;
var _react2 = _interopRequireDefault(_react);
var _BurgerIcon = require('./BurgerIcon');
var _BurgerIcon2 = _interopRequireDefault(_BurgerIcon);
var _CrossIcon = require('./CrossIcon');
var _CrossIcon2 = _interopRequireDefault(_CrossIcon);
var snap = undefined;
try {
    snap = function () {
        throw new Error('Cannot find module \'imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js\' from \'/Users/imogen/code/react-burger-menu/src\'');
    }();
} catch (e) {
    snap = require('snapsvg');
}
exports['default'] = function (styles) {
    return _react2['default'].createClass({
        propTypes: {
            id: _react2['default'].PropTypes.string,
            outerContainerId: _react2['default'].PropTypes.string,
            pageWrapId: _react2['default'].PropTypes.string
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
            wrapperStyles = wrapperStyles(this.state.isOpen);
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
                outerContainerId: '',
                pageWrapId: ''
            };
        },
        getInitialState: function getInitialState() {
            return { isOpen: false };
        },
        componentWillMount: function componentWillMount() {
            if (!styles || !Object.keys(styles).length) {
                throw new Error('No styles supplied');
            }
            if (styles.pageWrap && !this.props.pageWrapId) {
                console.warn('No pageWrapId supplied');
            }
            if (styles.outerContainer && !this.props.outerContainerId) {
                console.warn('No outerContainerId supplied');
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
            if (styles.svg) {
                (function () {
                    var s = snap(_react2['default'].findDOMNode(_this, '.bm-morph-shape'));
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
        render: function render() {
            var _this2 = this;
            var items = undefined, svg = undefined;
            if (this.props.children) {
                items = _react2['default'].Children.map(this.props.children, function (item, index) {
                    var extraProps = {
                            key: index,
                            ref: 'item_' + index,
                            style: styles.item(_this2.state.isOpen, index + 1)
                        };
                    return _react2['default'].cloneElement(item, extraProps);
                });
            }
            if (styles.svg) {
                svg = _react2['default'].createElement('div', {
                    className: 'bm-morph-shape',
                    style: styles.morphShape()
                }, _react2['default'].createElement('svg', {
                    xmlns: 'http://www.w3.org/2000/svg',
                    width: '100%',
                    height: '100%',
                    viewBox: '0 0 100 800',
                    preserveAspectRatio: 'none'
                }, _react2['default'].createElement('path', { d: styles.svg.pathInitial })));
            }
            return _react2['default'].createElement('div', null, _react2['default'].createElement('div', {
                id: 'bm-overlay',
                ref: 'overlay',
                onClick: this.toggleMenu,
                style: styles.overlay(this.state.isOpen)
            }), _react2['default'].createElement('div', {
                id: this.props.id,
                style: styles.menuWrap(this.state.isOpen)
            }, svg, _react2['default'].createElement('div', {
                className: 'bm-menu',
                style: styles.menu(this.state.isOpen)
            }, _react2['default'].createElement('nav', {
                className: 'bm-item-list',
                style: { height: '100%' }
            }, items)), _react2['default'].createElement('div', { style: styles.closeButton ? styles.closeButton(this.state.isOpen) : {} }, _react2['default'].createElement(_CrossIcon2['default'], { onClick: this.toggleMenu }))), _react2['default'].createElement(_BurgerIcon2['default'], { onClick: this.toggleMenu }));
        }
    });
};
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./BurgerIcon":3,"./CrossIcon":5,"snapsvg":undefined}],7:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
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
},{"../menuFactory":6,"react-kit/appendVendorPrefix":1}],8:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _menuFactory = require('../menuFactory');
var _menuFactory2 = _interopRequireDefault(_menuFactory);
var _reactKitAppendVendorPrefix = require('react-kit/appendVendorPrefix');
var _reactKitAppendVendorPrefix2 = _interopRequireDefault(_reactKitAppendVendorPrefix);
var styles = {
        svg: {
            pathInitial: 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
            pathOpen: 'M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z',
            animate: function animate(path) {
                path.animate({ path: this.pathOpen }, 400, window.mina.easeinout);
            }
        },
        morphShape: function morphShape() {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                position: 'fixed',
                width: 120,
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
                transition: 'all 0.3s'
            });
        },
        menu: function menu() {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                position: 'fixed',
                width: 'calc(100% - 120px)',
                height: '100%',
                whiteSpace: 'nowrap',
                boxSizing: 'border-box'
            });
        },
        item: function item() {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                display: 'block',
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
                transition: isOpen ? 'opacity 0.3s' : 'opacity 0.3s, transform 0s 0.3s'
            });
        },
        pageWrap: function pageWrap(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100px, 0, 0)',
                transition: isOpen ? 'all 0.3s' : 'all 0.3s 0.1s'
            });
        },
        outerContainer: function outerContainer(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({ overflow: isOpen ? '' : 'hidden' });
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":6,"react-kit/appendVendorPrefix":1}],9:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
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
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
                transition: 'all 0.5s ease-in-out'
            });
        },
        menu: function menu() {
            return (0, _reactKitAppendVendorPrefix2['default'])({ height: '100%' });
        },
        item: function item() {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                display: 'block',
                outline: 'none'
            });
        },
        overlay: function overlay(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                position: 'fixed',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s',
                zIndex: 1
            });
        },
        pageWrap: function pageWrap(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(300px, 0, 0)',
                transition: 'all 0.5s'
            });
        },
        outerContainer: function outerContainer(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                perspective: '1500px',
                perspectiveOrigin: '0% 50%',
                overflow: isOpen ? '' : 'hidden'
            });
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":6,"react-kit/appendVendorPrefix":1}],10:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
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
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: 'all 0.5s'
            });
        },
        menu: function menu() {
            return (0, _reactKitAppendVendorPrefix2['default'])({ height: '100%' });
        },
        item: function item() {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                display: 'block',
                outline: 'none'
            });
        },
        overlay: function overlay(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                position: 'fixed',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s',
                zIndex: 1
            });
        },
        pageWrap: function pageWrap(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(300px, 0, 0)',
                transition: 'all 0.5s'
            });
        },
        outerContainer: function outerContainer(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({ overflow: isOpen ? '' : 'hidden' });
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":6,"react-kit/appendVendorPrefix":1}],11:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
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
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: 'all 0.5s'
            });
        },
        menu: function menu() {
            return (0, _reactKitAppendVendorPrefix2['default'])({ height: '100%' });
        },
        item: function item() {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                display: 'block',
                outline: 'none'
            });
        },
        overlay: function overlay(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                position: 'fixed',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s',
                zIndex: 1
            });
        },
        pageWrap: function pageWrap(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(300px, 0, 0) rotateY(-15deg)',
                transformOrigin: '0% 50%',
                transformStyle: 'preserve-3d',
                transition: 'all 0.5s'
            });
        },
        outerContainer: function outerContainer(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                perspective: '1500px',
                overflow: isOpen ? '' : 'hidden'
            });
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":6,"react-kit/appendVendorPrefix":1}],12:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
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
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: 'all 0.5s'
            });
        },
        menu: function menu() {
            return (0, _reactKitAppendVendorPrefix2['default'])({ height: '100%' });
        },
        item: function item() {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                display: 'block',
                outline: 'none'
            });
        },
        overlay: function overlay(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                position: 'fixed',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s',
                zIndex: 1
            });
        },
        pageWrap: function pageWrap(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                transform: isOpen ? 'translate3d(0, 0, 1px)' : 'translate3d(0, 0, -300px)',
                transformOrigin: '100%',
                transformStyle: 'preserve-3d',
                transition: 'all 0.5s'
            });
        },
        outerContainer: function outerContainer() {
            return (0, _reactKitAppendVendorPrefix2['default'])({ perspective: '1500px' });
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":6,"react-kit/appendVendorPrefix":1}],13:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
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
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: 'all 0.5s'
            });
        },
        menu: function menu() {
            return (0, _reactKitAppendVendorPrefix2['default'])({ height: '100%' });
        },
        item: function item() {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                display: 'block',
                outline: 'none'
            });
        },
        overlay: function overlay(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                position: 'fixed',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s',
                zIndex: 1
            });
        },
        pageWrap: function pageWrap(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                transformStyle: 'preserve-3d',
                transition: 'all 0.5s',
                overflow: isOpen ? '' : 'hidden'
            });
        },
        outerContainer: function outerContainer(isOpen) {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                perspective: '1500px',
                overflow: isOpen ? '' : 'hidden'
            });
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":6,"react-kit/appendVendorPrefix":1}],14:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
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
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                transition: 'all 0.5s'
            });
        },
        menu: function menu() {
            return (0, _reactKitAppendVendorPrefix2['default'])({ height: '100%' });
        },
        item: function item() {
            return (0, _reactKitAppendVendorPrefix2['default'])({
                display: 'block',
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
                transition: isOpen ? 'opacity 0.5s' : 'opacity 0.5s, transform 0.1s 0.5s'
            });
        }
    };
exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];
},{"../menuFactory":6,"react-kit/appendVendorPrefix":1}],15:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
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
            return (0, _reactKitAppendVendorPrefix2['default'])({ height: '100%' });
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
},{"../menuFactory":6,"react-kit/appendVendorPrefix":1}]},{},[4])(4)
});