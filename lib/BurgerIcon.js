'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

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

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement('span', { className: 'bm-burger-icon', style: this.getLineStyle(0) }),
      _react2['default'].createElement('span', { className: 'bm-burger-icon', style: this.getLineStyle(1) }),
      _react2['default'].createElement('span', { className: 'bm-burger-icon', style: this.getLineStyle(2) }),
      _react2['default'].createElement(
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