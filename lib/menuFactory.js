'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _baseStyles = require('./baseStyles');

var _baseStyles2 = _interopRequireDefault(_baseStyles);

var _BurgerIcon = require('./BurgerIcon');

var _BurgerIcon2 = _interopRequireDefault(_BurgerIcon);

var _CrossIcon = require('./CrossIcon');

var _CrossIcon2 = _interopRequireDefault(_CrossIcon);

exports['default'] = function (styles) {
  var Menu = (function (_Component) {
    _inherits(Menu, _Component);

    function Menu(props) {
      _classCallCheck(this, Menu);

      _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).call(this, props);
      this.state = {
        isOpen: props && typeof props.isOpen !== 'undefined' ? props.isOpen : false
      };
    }

    _createClass(Menu, [{
      key: 'toggleMenu',
      value: function toggleMenu() {
        var _this = this;

        var newState = { isOpen: !this.state.isOpen };

        this.applyWrapperStyles();

        this.setState(newState, function () {
          _this.props.onStateChange(newState);

          // Timeout ensures wrappers are cleared after animation finishes.
          _this.timeoutId && clearTimeout(_this.timeoutId);
          _this.timeoutId = setTimeout(function () {
            _this.timeoutId = null;
            if (!newState.isOpen) {
              _this.clearWrapperStyles();
            }
          }, 500);
        });
      }

      // Applies component-specific styles to external wrapper elements.
    }, {
      key: 'applyWrapperStyles',
      value: function applyWrapperStyles() {
        if (styles.pageWrap && this.props.pageWrapId) {
          this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, true);
        }

        if (styles.outerContainer && this.props.outerContainerId) {
          this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, true);
        }
      }

      // Removes component-specific styles applied to external wrapper elements.
    }, {
      key: 'clearWrapperStyles',
      value: function clearWrapperStyles() {
        if (styles.pageWrap && this.props.pageWrapId) {
          this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, false);
        }

        if (styles.outerContainer && this.props.outerContainerId) {
          this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, false);
        }
      }

      // Sets or unsets styles on DOM elements outside the menu component.
      // This is necessary for correct page interaction with some of the menus.
      // Throws and returns if the required external elements don't exist,
      // which means any external page animations won't be applied.
    }, {
      key: 'handleExternalWrapper',
      value: function handleExternalWrapper(id, wrapperStyles, set) {
        var html = document.querySelector('html');
        var body = document.querySelector('body');
        var wrapper = document.getElementById(id);

        if (!wrapper) {
          console.error("Element with ID '" + id + "' not found");
          return;
        }

        var builtStyles = wrapperStyles(this.state.isOpen, this.props.width, this.props.right);

        for (var prop in builtStyles) {
          if (builtStyles.hasOwnProperty(prop)) {
            wrapper.style[prop] = set ? builtStyles[prop] : '';
          }
        }

        // Prevent any horizontal scroll.
        [html, body].forEach(function (element) {
          element.style['overflow-x'] = set ? 'hidden' : '';
        });
      }

      // Builds styles incrementally for a given element.
    }, {
      key: 'getStyles',
      value: function getStyles(el, index, inline) {
        var propName = 'bm' + el.replace(el.charAt(0), el.charAt(0).toUpperCase());

        // Set base styles.
        var output = _baseStyles2['default'][el] ? [_baseStyles2['default'][el](this.state.isOpen, this.props.width, this.props.right)] : [];

        // Add animation-specific styles.
        if (styles[el]) {
          output.push(styles[el](this.state.isOpen, this.props.width, this.props.right, index + 1));
        }

        // Add custom styles.
        if (this.props.styles[propName]) {
          output.push(this.props.styles[propName]);
        }

        // Add element inline styles.
        if (inline) {
          output.push(inline);
        }

        return output;
      }
    }, {
      key: 'listenForClose',
      value: function listenForClose(e) {
        e = e || window.event;

        if (this.state.isOpen && (e.key === 'Escape' || e.keyCode === 27)) {
          this.toggleMenu();
        }
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!styles) {
          throw new Error('No styles supplied');
        }

        // Allow initial open state to be set by props.
        if (this.props.isOpen) {
          this.toggleMenu();
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.onkeydown = this.listenForClose.bind(this);

        // Allow initial open state to be set by props for animations with wrapper elements.
        if (this.props.isOpen) {
          this.toggleMenu();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.onkeydown = null;

        this.clearWrapperStyles();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var _this2 = this;

        if (styles.svg) {
          (function () {
            var morphShape = _reactDom2['default'].findDOMNode(_this2, 'bm-morph-shape');
            var path = styles.svg.lib(morphShape).select('path');

            if (_this2.state.isOpen) {
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
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (typeof nextProps.isOpen !== 'undefined' && nextProps.isOpen !== this.state.isOpen) {
          this.toggleMenu();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        return _react2['default'].createElement(
          'div',
          null,
          !this.props.noOverlay ? _react2['default'].createElement('div', { className: 'bm-overlay', onClick: function () {
              return _this3.toggleMenu();
            }, style: this.getStyles('overlay') }) : null,
          _react2['default'].createElement(
            'div',
            { id: this.props.id, className: 'bm-menu-wrap ' + (this.props.className || ''), style: this.getStyles('menuWrap') },
            styles.svg ? _react2['default'].createElement(
              'div',
              { className: 'bm-morph-shape', style: this.getStyles('morphShape') },
              _react2['default'].createElement(
                'svg',
                { width: '100%', height: '100%', viewBox: '0 0 100 800', preserveAspectRatio: 'none' },
                _react2['default'].createElement('path', { d: styles.svg.pathInitial })
              )
            ) : null,
            _react2['default'].createElement(
              'div',
              { className: 'bm-menu', style: this.getStyles('menu') },
              _react2['default'].createElement(
                'nav',
                { className: 'bm-item-list', style: this.getStyles('itemList') },
                _react2['default'].Children.map(this.props.children, function (item, index) {
                  if (item) {
                    var extraProps = {
                      key: index,
                      style: _this3.getStyles('item', index, item.props.style)
                    };
                    return _react2['default'].cloneElement(item, extraProps);
                  }
                })
              )
            ),
            this.props.customCrossIcon !== false ? _react2['default'].createElement(
              'div',
              { style: this.getStyles('closeButton') },
              _react2['default'].createElement(_CrossIcon2['default'], { onClick: function () {
                  return _this3.toggleMenu();
                }, styles: this.props.styles, customIcon: this.props.customCrossIcon })
            ) : null
          ),
          this.props.customBurgerIcon !== false ? _react2['default'].createElement(_BurgerIcon2['default'], { onClick: function () {
              return _this3.toggleMenu();
            }, styles: this.props.styles, customIcon: this.props.customBurgerIcon }) : null
        );
      }
    }]);

    return Menu;
  })(_react.Component);

  Menu.propTypes = {
    className: _propTypes2['default'].string,
    customBurgerIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].oneOf([false])]),
    customCrossIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].oneOf([false])]),
    id: _propTypes2['default'].string,
    isOpen: _propTypes2['default'].bool,
    noOverlay: _propTypes2['default'].bool,
    onStateChange: _propTypes2['default'].func,
    outerContainerId: styles && styles.outerContainer ? _propTypes2['default'].string.isRequired : _propTypes2['default'].string,
    pageWrapId: styles && styles.pageWrap ? _propTypes2['default'].string.isRequired : _propTypes2['default'].string,
    right: _propTypes2['default'].bool,
    styles: _propTypes2['default'].object,
    width: _propTypes2['default'].number
  };

  Menu.defaultProps = {
    id: '',
    noOverlay: false,
    onStateChange: function onStateChange() {},
    outerContainerId: '',
    pageWrapId: '',
    styles: {},
    width: 300
  };

  return (0, _radium2['default'])(Menu);
};

module.exports = exports['default'];