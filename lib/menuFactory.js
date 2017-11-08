'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
        isOpen: false
      };
    }

    _createClass(Menu, [{
      key: 'toggleMenu',
      value: function toggleMenu() {
        var _this = this;

        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var isOpen = options.isOpen;
        var noStateChange = options.noStateChange;

        var newState = {
          isOpen: typeof isOpen !== 'undefined' ? isOpen : !this.state.isOpen
        };

        this.applyWrapperStyles();

        this.setState(newState, function () {
          !noStateChange && _this.props.onStateChange(newState);

          // Timeout ensures wrappers are cleared after animation finishes.
          _this.timeoutId && clearTimeout(_this.timeoutId);
          _this.timeoutId = setTimeout(function () {
            _this.timeoutId = null;
            if (!newState.isOpen) {
              _this.applyWrapperStyles(false);
            }
          }, 500);
        });
      }

      // Applies component-specific styles to external wrapper elements.
    }, {
      key: 'applyWrapperStyles',
      value: function applyWrapperStyles() {
        var set = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        if (this.props.bodyClassName) {
          var body = document.querySelector('body');
          body.classList[set ? 'add' : 'remove'](this.props.bodyClassName);
        }

        if (styles.pageWrap && this.props.pageWrapId) {
          this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, set);
        }

        if (styles.outerContainer && this.props.outerContainerId) {
          this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, set);
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

        var builtStyles = this.getStyle(wrapperStyles);

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
        var output = _baseStyles2['default'][el] ? this.getStyle(_baseStyles2['default'][el]) : {};

        // Add animation-specific styles.
        if (styles[el]) {
          output = _extends({}, output, this.getStyle(styles[el], index + 1));
        }

        // Add custom styles.
        if (this.props.styles[propName]) {
          output = _extends({}, output, this.props.styles[propName]);
        }

        // Add element inline styles.
        if (inline) {
          output = _extends({}, output, inline);
        }

        return output;
      }
    }, {
      key: 'getStyle',
      value: function getStyle(style, index) {
        var width = this.props.width;
        if (typeof width !== 'string') width = width + 'px';

        return style(this.state.isOpen, width, this.props.right, index);
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
      key: 'shouldDisableOverlayClick',
      value: function shouldDisableOverlayClick() {
        if (typeof this.props.disableOverlayClick === 'function') {
          return this.props.disableOverlayClick();
        } else {
          return this.props.disableOverlayClick;
        }
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!styles) {
          throw new Error('No styles supplied');
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.onkeydown = this.listenForClose.bind(this);

        // Allow initial open state to be set by props.
        if (this.props.isOpen) {
          this.toggleMenu({ isOpen: true, noStateChange: true });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.onkeydown = null;

        this.applyWrapperStyles(false);
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
          !this.props.noOverlay && _react2['default'].createElement('div', {
            className: 'bm-overlay ' + this.props.overlayClassName,
            onClick: function () {
              return !_this3.shouldDisableOverlayClick() && _this3.toggleMenu();
            },
            style: this.getStyles('overlay')
          }),
          _react2['default'].createElement(
            'div',
            {
              id: this.props.id,
              className: 'bm-menu-wrap ' + this.props.className,
              style: this.getStyles('menuWrap')
            },
            styles.svg && _react2['default'].createElement(
              'div',
              { className: 'bm-morph-shape ' + this.props.morphShapeClassName, style: this.getStyles('morphShape') },
              _react2['default'].createElement(
                'svg',
                { width: '100%', height: '100%', viewBox: '0 0 100 800', preserveAspectRatio: 'none' },
                _react2['default'].createElement('path', { d: styles.svg.pathInitial })
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: 'bm-menu ' + this.props.menuClassName, style: this.getStyles('menu') },
              _react2['default'].createElement(
                'nav',
                { className: 'bm-item-list ' + this.props.itemListClassName, style: this.getStyles('itemList') },
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
            this.props.customCrossIcon !== false && _react2['default'].createElement(
              'div',
              { style: this.getStyles('closeButton') },
              _react2['default'].createElement(_CrossIcon2['default'], {
                onClick: function () {
                  return _this3.toggleMenu();
                },
                styles: this.props.styles,
                customIcon: this.props.customCrossIcon,
                className: this.props.crossButtonClassName,
                crossClassName: this.props.crossClassName
              })
            )
          ),
          this.props.customBurgerIcon !== false && _react2['default'].createElement(
            'div',
            { style: this.getStyles('burgerIcon') },
            _react2['default'].createElement(_BurgerIcon2['default'], {
              onClick: function () {
                return _this3.toggleMenu();
              },
              styles: this.props.styles,
              customIcon: this.props.customBurgerIcon,
              className: this.props.burgerButtonClassName,
              barClassName: this.props.burgerBarClassName
            })
          )
        );
      }
    }]);

    return Menu;
  })(_react.Component);

  Menu.propTypes = {
    bodyClassName: _propTypes2['default'].string,
    burgerBarClassName: _propTypes2['default'].string,
    burgerButtonClassName: _propTypes2['default'].string,
    crossButtonClassName: _propTypes2['default'].string,
    crossClassName: _propTypes2['default'].string,
    customBurgerIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].oneOf([false])]),
    customCrossIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].oneOf([false])]),
    disableOverlayClick: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].func]),
    id: _propTypes2['default'].string,
    isOpen: _propTypes2['default'].bool,
    itemListClassName: _propTypes2['default'].string,
    menuClassName: _propTypes2['default'].string,
    morphShapeClassName: _propTypes2['default'].string,
    noOverlay: _propTypes2['default'].bool,
    onStateChange: _propTypes2['default'].func,
    outerContainerId: styles && styles.outerContainer ? _propTypes2['default'].string.isRequired : _propTypes2['default'].string,
    overlayClassName: _propTypes2['default'].string,
    pageWrapId: styles && styles.pageWrap ? _propTypes2['default'].string.isRequired : _propTypes2['default'].string,
    right: _propTypes2['default'].bool,
    styles: _propTypes2['default'].object,
    width: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string])
  };

  Menu.defaultProps = {
    bodyClassName: '',
    burgerBarClassName: '',
    burgerButtonClassName: '',
    className: '',
    crossButtonClassName: '',
    crossClassName: '',
    id: '',
    itemListClassName: '',
    menuClassName: '',
    morphShapeClassName: '',
    noOverlay: false,
    onStateChange: function onStateChange() {},
    outerContainerId: '',
    overlayClassName: '',
    pageWrapId: '',
    styles: {},
    width: 300
  };

  return Menu;
};

module.exports = exports['default'];