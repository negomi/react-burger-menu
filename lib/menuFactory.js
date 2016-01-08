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
      id: _react2['default'].PropTypes.string,
      isOpen: _react2['default'].PropTypes.bool,
      onStateChange: _react2['default'].PropTypes.func,
      outerContainerId: _react2['default'].PropTypes.string,
      pageWrapId: _react2['default'].PropTypes.string,
      right: _react2['default'].PropTypes.bool,
      styles: _react2['default'].PropTypes.object,
      width: _react2['default'].PropTypes.number
    },

    toggleMenu: function toggleMenu() {
      // Order important: handle wrappers before setting sidebar state.
      this.applyWrapperStyles();

      var newState = { isOpen: !this.state.isOpen };
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
        onStateChange: function onStateChange() {},
        outerContainerId: '',
        pageWrapId: '',
        right: false,
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
      if (nextProps.isOpen !== this.state.isOpen) {
        this.toggleMenu();
      }
    },

    render: function render() {
      var _this2 = this;

      var items = undefined,
          svg = undefined;
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

      // Add styles to user-defined menu items.
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

      // Add a morph shape for animations that use SVG.
      if (styles.svg) {
        svg = _react2['default'].createElement(
          'div',
          { className: 'bm-morph-shape', style: [styles.morphShape(this.props.right), this.props.styles['bm-morph-shape']] },
          _react2['default'].createElement(
            'svg',
            { xmlns: 'http://www.w3.org/2000/svg', width: '100%', height: '100%', viewBox: '0 0 100 800', preserveAspectRatio: 'none' },
            _react2['default'].createElement('path', { d: styles.svg.pathInitial })
          )
        );
      }

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement('div', { className: 'bm-overlay', onClick: this.toggleMenu, style: _baseStyles2['default'].overlay(this.state.isOpen) }),
        _react2['default'].createElement(
          'div',
          { id: this.props.id, className: "bm-menu-wrap", style: menuWrapStyles.concat(this.props.styles['bm-menu-wrap']) },
          svg,
          _react2['default'].createElement(
            'div',
            { className: 'bm-menu', style: menuStyles.concat(this.props.styles['bm-menu']) },
            _react2['default'].createElement(
              'nav',
              { className: 'bm-item-list', style: itemListStyles.concat(this.props.styles['bm-item-list']) },
              items
            )
          ),
          _react2['default'].createElement(
            'div',
            { style: closeButtonStyles },
            _react2['default'].createElement(_CrossIcon2['default'], { onClick: this.toggleMenu, styles: this.props.styles })
          )
        ),
        _react2['default'].createElement(_BurgerIcon2['default'], { onClick: this.toggleMenu, styles: this.props.styles })
      );
    }
  }));
};

module.exports = exports['default'];