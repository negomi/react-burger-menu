'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var BurgerIcon = (0, _radium2['default'])(_react2['default'].createClass({

  propTypes: {
    image: _react2['default'].PropTypes.string,
    styles: _react2['default'].PropTypes.object
  },

  getLineStyle: function getLineStyle(index) {
    return {
      position: 'absolute',
      height: '20%',
      left: 0,
      right: 0,
      top: 20 * (index * 2) + '%',
      opacity: this.state.hover ? 0.6 : 1
    };
  },

  handleHover: function handleHover() {
    this.setState({ hover: !this.state.hover });
  },

  getInitialState: function getInitialState() {
    return { hover: false };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      image: '',
      styles: {}
    };
  },

  render: function render() {
    var icon = undefined;
    var buttonStyle = {
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
    };

    if (this.props.image) {
      icon = _react2['default'].createElement('img', { src: this.props.image, alt: 'Menu icon', className: 'bm-icon', style: [{ width: '100%', height: '100%' }, this.props.styles.bmIcon] });
    } else {
      icon = _react2['default'].createElement(
        'span',
        null,
        _react2['default'].createElement('span', { className: 'bm-burger-bars', style: [this.getLineStyle(0), this.props.styles.bmBurgerBars] }),
        _react2['default'].createElement('span', { className: 'bm-burger-bars', style: [this.getLineStyle(1), this.props.styles.bmBurgerBars] }),
        _react2['default'].createElement('span', { className: 'bm-burger-bars', style: [this.getLineStyle(2), this.props.styles.bmBurgerBars] })
      );
    }

    return _react2['default'].createElement(
      'div',
      { className: 'bm-burger-button', style: [{ zIndex: 1 }, this.props.styles.bmBurgerButton] },
      icon,
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
}));

exports['default'] = BurgerIcon;
module.exports = exports['default'];