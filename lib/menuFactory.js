'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var React = require('react');
var Snap = require('snapsvg');
var appendVendorPrefix = require('react-kit/appendVendorPrefix');
var BurgerIcon = require('./BurgerIcon');
var CrossIcon = require('./CrossIcon');

exports['default'] = function (styles) {

  return React.createClass({

    propTypes: {
      items: React.PropTypes.array,
      id: React.PropTypes.string,
      pageWrapId: React.PropTypes.string,
      outerContainerId: React.PropTypes.string
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
    handleExternalWrapper: function handleExternalWrapper(id, styles, set) {
      var wrapper, wrapperStyles, prop;

      wrapper = document.getElementById(id);

      if (!wrapper) {
        console.error('Element with ID \'' + id + '\' not found');
        return;
      }

      wrapperStyles = styles(this.state.isOpen);

      for (prop in wrapperStyles) {
        if (wrapperStyles.hasOwnProperty(prop)) {
          wrapper.style[prop] = set ? wrapperStyles[prop] : '';
        }
      }
    },

    listenForClose: function listenForClose(e) {
      if (this.state.isOpen && (e.target.id === 'bm-overlay' || e.key === 'Escape' || e.keyCode === 27)) {
        this.toggleMenu();
      }
    },

    getDefaultProps: function getDefaultProps() {
      return {
        items: [],
        id: '',
        pageWrapId: '',
        outerContainerId: ''
      };
    },

    getInitialState: function getInitialState() {
      return { isOpen: false };
    },

    componentWillMount: function componentWillMount() {
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
      window.addEventListener('click', this.listenForClose);
      window.addEventListener('keydown', this.listenForClose);
    },

    componentWillUnmount: function componentWillUnmount() {
      window.removeEventListener('click', this.listenForClose);
      window.removeEventListener('keydown', this.listenForClose);

      this.clearWrapperStyles();
    },

    componentDidUpdate: function componentDidUpdate() {
      var s, path;

      if (styles.svg) {
        s = Snap('.bm-morph-shape');
        path = s.select('path');

        if (this.state.isOpen) {
          // Animate SVG path.
          styles.svg.animate(path);
        } else {
          // Reset path (timeout ensures animation happens off screen).
          setTimeout(function () {
            path.attr('d', styles.svg.pathInitial);
          }, 300);
        }
      }
    },

    render: function render() {
      var _this = this;

      var items, svg, closeButtonStyles;

      // Add animation styles to user-defined menu items.
      items = this.props.children.map(function (item, index) {
        var extraProps = {
          key: index,
          style: styles.item(_this.state.isOpen, index + 1)
        };

        return React.cloneElement(item, extraProps);
      });

      // Add a morph shape for animations that use SVG.
      if (styles.svg) {
        svg = React.createElement(
          'div',
          { className: 'bm-morph-shape', style: styles.morphShape() },
          React.createElement(
            'svg',
            { xmlns: 'http://www.w3.org/2000/svg', width: '100%', height: '100%', viewBox: '0 0 100 800', preserveAspectRatio: 'none' },
            React.createElement('path', { d: styles.svg.pathInitial })
          )
        );
      }

      return React.createElement(
        'div',
        null,
        React.createElement('div', { id: 'bm-overlay', style: styles.overlay(this.state.isOpen) }),
        React.createElement(
          'div',
          { id: this.props.id, style: styles.menuWrap(this.state.isOpen) },
          svg,
          React.createElement(
            'div',
            { className: 'bm-menu', style: styles.menu(this.state.isOpen) },
            React.createElement(
              'nav',
              { className: 'bm-item-list', style: { height: '100%' } },
              items
            )
          ),
          React.createElement(
            'div',
            { style: styles.closeButton ? styles.closeButton(this.state.isOpen) : {} },
            React.createElement(CrossIcon, { onClick: this.toggleMenu })
          )
        ),
        React.createElement(BurgerIcon, { onClick: this.toggleMenu })
      );
    }
  });
};

module.exports = exports['default'];