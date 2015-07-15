'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var React = require('react');
var appendVendorPrefix = require('react-kit/appendVendorPrefix');

var BurgerIcon = React.createClass({
  displayName: 'BurgerIcon',

  getLineStyle: function getLineStyle(index) {
    return appendVendorPrefix({
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
    var buttonStyle = appendVendorPrefix({
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

    return React.createElement(
      'div',
      null,
      React.createElement('span', { className: 'bm-burger-icon', style: this.getLineStyle(0) }),
      React.createElement('span', { className: 'bm-burger-icon', style: this.getLineStyle(1) }),
      React.createElement('span', { className: 'bm-burger-icon', style: this.getLineStyle(2) }),
      React.createElement(
        'button',
        { onClick: this.props.onClick,
          onMouseEnter: this.handleHover,
          onMouseLeave: this.handleHover,
          style: buttonStyle },
        'Open Menu'
      )
    );
  }
});

exports['default'] = BurgerIcon;
module.exports = exports['default'];