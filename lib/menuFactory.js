'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
      outerContainerId: _react2['default'].PropTypes.string,
      pageWrapId: _react2['default'].PropTypes.string,
      width: _react2['default'].PropTypes.number
    },

    toggleMenu: function toggleMenu() {
      // Order important: handle wrappers before setting sidebar state.
      this.applyWrapperStyles();

      this.setState({ isOpen: !this.state.isOpen });
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
      var wrapper = document.getElementById(id);

      if (!wrapper) {
        console.error("Element with ID '" + id + "' not found");
        return;
      }

      wrapperStyles = wrapperStyles(this.state.isOpen, this.props.width);

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
        pageWrapId: '',
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

          // TODO: Should be able to use refs or ReactDOM.findDOMNode(this) here.
          var morphShape = document.getElementsByClassName('bm-morph-shape')[0];
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

    render: function render() {
      var _this2 = this;

      var items = undefined,
          svg = undefined;
      var menuWrapStyles = [_baseStyles2['default'].menuWrap(this.state.isOpen, this.props.width)];
      var menuStyles = [_baseStyles2['default'].menu(this.state.isOpen)];

      if (styles.menuWrap) {
        menuWrapStyles.push(styles.menuWrap(this.state.isOpen, this.props.width));
      }

      if (styles.menu) {
        menuStyles.push(styles.menu(this.state.isOpen, this.props.width));
      }

      // Add styles to user-defined menu items.
      if (this.props.children) {
        items = _react2['default'].Children.map(this.props.children, function (item, index) {
          var itemStyles = [_baseStyles2['default'].item(_this2.state.isOpen)];

          if (styles.item) {
            itemStyles.push(styles.item(_this2.state.isOpen, _this2.props.width, index + 1));
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
          { className: 'bm-morph-shape', style: styles.morphShape() },
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
          { id: this.props.id, className: "bm-menu-wrap", style: menuWrapStyles },
          svg,
          _react2['default'].createElement(
            'div',
            { className: 'bm-menu', style: menuStyles },
            _react2['default'].createElement(
              'nav',
              { className: 'bm-item-list', style: { height: '100%' } },
              items
            )
          ),
          _react2['default'].createElement(
            'div',
            { style: styles.closeButton ? styles.closeButton(this.state.isOpen, this.props.width) : {} },
            _react2['default'].createElement(_CrossIcon2['default'], { onClick: this.toggleMenu })
          )
        ),
        _react2['default'].createElement(_BurgerIcon2['default'], { onClick: this.toggleMenu })
      );
    }
  }));
};

module.exports = exports['default'];