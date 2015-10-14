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
      position: 'absolute',
      height: "15%",
      left: 0,
      right: 0,
      top: 33 * index + "%",
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
    });

    var containerStyle = (0, _reactKitAppendVendorPrefix2['default'])({
      position: "absolute",
      left: "10%",
      right: "10%",
      top: "10%",
      bottom: "10%",
      margin: 0,
      padding: 0
    });

    return _react2['default'].createElement(
      'div',
      { className: 'bm-burger-button' },
      _react2['default'].createElement(
        'div',
        { className: 'bm-burger-icon-container', style: containerStyle },
        _react2['default'].createElement('span', { className: 'bm-burger-icon', style: this.getLineStyle(0) }),
        _react2['default'].createElement('span', { className: 'bm-burger-icon', style: this.getLineStyle(1) }),
        _react2['default'].createElement('span', { className: 'bm-burger-icon', style: this.getLineStyle(2) })
      ),
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