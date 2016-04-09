'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

  return (0, _radium2['default'])(_react2['default'].createClass({

    propTypes: {
      customBurgerIcon: _react2['default'].PropTypes.element,
      customCrossIcon: _react2['default'].PropTypes.element,
      id: _react2['default'].PropTypes.string,
      isOpen: _react2['default'].PropTypes.bool,
      noOverlay: _react2['default'].PropTypes.bool,
      onStateChange: _react2['default'].PropTypes.func,
      outerContainerId: _react2['default'].PropTypes.string,
      pageWrapId: _react2['default'].PropTypes.string,
      right: _react2['default'].PropTypes.bool,
      styles: _react2['default'].PropTypes.object,
      width: _react2['default'].PropTypes.number
    },

    toggleMenu: function toggleMenu(isOpenVal) {
      // Order important: handle wrappers before setting sidebar state.
      this.applyWrapperStyles();

      // Disregard isOpenVal if not a boolean.
      var newState = { isOpen: typeof isOpenVal === 'boolean' ? isOpenVal : !this.state.isOpen };
      this.setState(newState, this.props.onStateChange.bind(null, newState));
    },

    // Applies component-specific styles to external wrapper elements.
    applyWrapperStyles: function applyWrapperStyles() {
      if (styles.pageWrap && this.props.pageWrapId) {
        this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, true);
      }

      if (styles.outerContainer && this.props.outerContainerId) {
        this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, true);
      }
    },

    // Removes component-specific styles applied to external wrapper elements.
    clearWrapperStyles: function clearWrapperStyles() {
      if (styles.pageWrap && this.props.pageWrapId) {
        this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, false);
      }

      if (styles.outerContainer && this.props.outerContainerId) {
        this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, false);
      }
    },

    // Sets or unsets styles on DOM elements outside the menu component.
    // This is necessary for correct page interaction with some of the menus.
    // Throws and returns if the required external elements don't exist,
    // which means any external page animations won't be applied.
    handleExternalWrapper: function handleExternalWrapper(id, wrapperStyles, set) {
      var html = document.querySelector('html');
      var body = document.querySelector('body');
      var wrapper = document.getElementById(id);

      if (!wrapper) {
        console.error("Element with ID '" + id + "' not found");
        return;
      }

      wrapperStyles = wrapperStyles(this.state.isOpen, this.props.width, this.props.right);

      for (var prop in wrapperStyles) {
        if (wrapperStyles.hasOwnProperty(prop)) {
          wrapper.style[prop] = set ? wrapperStyles[prop] : '';
        }
      }

      // Prevent any horizontal scroll.
      [html, body].forEach(function (element) {
        element.style['overflow-x'] = set ? 'hidden' : '';
      });
    },

    // Builds styles incrementally for a given element.
    getStyles: function getStyles(el, index) {
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

      return output;
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
        noOverlay: false,
        onStateChange: function onStateChange() {},
        outerContainerId: '',
        pageWrapId: '',
        styles: {},
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

      // Warn if the selected menu requires external wrapper elements
      // but none were supplied.
      if (styles.pageWrap && !this.props.pageWrapId) {
        console.warn('No pageWrapId supplied');
      }

      if (styles.outerContainer && !this.props.outerContainerId) {
        console.warn('No outerContainerId supplied');
      }

      // Allow initial open state to be set by props.
      if (this.props.isOpen) {
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
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      // Allow open state to be controlled by props.
      if (typeof nextProps.isOpen === 'boolean' && nextProps.isOpen !== this.props.isOpen) {
        this.toggleMenu(nextProps.isOpen);
      }
    },

    render: function render() {
      var _this2 = this;

      var items = undefined,
          svg = undefined,
          overlay = undefined;

      // Add styles to user-defined menu items.
      if (this.props.children) {
        items = _react2['default'].Children.map(this.props.children, function (item, index) {
          var extraProps = {
            key: index,
            style: _this2.getStyles('item', index)
          };
          return _react2['default'].cloneElement(item, extraProps);
        });
      }

      // Add a morph shape for animations that use SVG.
      if (styles.svg) {
        svg = _react2['default'].createElement(
          'div',
          { className: 'bm-morph-shape', style: this.getStyles('morphShape') },
          _react2['default'].createElement(
            'svg',
            { xmlns: 'http://www.w3.org/2000/svg', width: '100%', height: '100%', viewBox: '0 0 100 800', preserveAspectRatio: 'none' },
            _react2['default'].createElement('path', { d: styles.svg.pathInitial })
          )
        );
      }

      if (!this.props.noOverlay) {
        overlay = _react2['default'].createElement('div', { className: 'bm-overlay', onClick: this.toggleMenu, style: this.getStyles('overlay') });
      }

      return _react2['default'].createElement(
        'div',
        null,
        overlay,
        _react2['default'].createElement(
          'div',
          { id: this.props.id, className: "bm-menu-wrap", style: this.getStyles('menuWrap') },
          svg,
          _react2['default'].createElement(
            'div',
            { className: 'bm-menu', style: this.getStyles('menu') },
            _react2['default'].createElement(
              'nav',
              { className: 'bm-item-list', style: this.getStyles('itemList') },
              items
            )
          ),
          _react2['default'].createElement(
            'div',
            { style: this.getStyles('closeButton') },
            _react2['default'].createElement(_CrossIcon2['default'], { onClick: this.toggleMenu, styles: this.props.styles, customIcon: this.props.customCrossIcon })
          )
        ),
        _react2['default'].createElement(_BurgerIcon2['default'], { onClick: this.toggleMenu, styles: this.props.styles, customIcon: this.props.customBurgerIcon })
      );
    }
  }));
};

module.exports = exports['default'];