'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var CrossIcon = (0, _radium2['default'])(_react2['default'].createClass({

  propTypes: {
    customIcon: _react2['default'].PropTypes.element,
    styles: _react2['default'].PropTypes.object
  },

  getCrossStyle: function getCrossStyle(type) {
    return {
      position: 'absolute',
      width: 3,
      height: 14,
      transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)'
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      styles: {}
    };
  },

  render: function render() {
    var icon;
    var buttonWrapperStyle = {
      position: 'absolute',
      width: 24,
      height: 24,
      right: 8,
      top: 8
    };
    var buttonStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      border: 'none',
      textIndent: -9999,
      background: 'transparent',
      outline: 'none'
    };

    if (this.props.customIcon) {
      var extraProps = {
        className: 'bm-cross',
        style: [{ width: '100%', height: '100%' }, this.props.styles.bmCross]
      };
      icon = _react2['default'].cloneElement(this.props.customIcon, extraProps);
    } else {
      icon = _react2['default'].createElement(
        'span',
        { style: [{ position: 'absolute', top: '6px', right: '14px' }] },
        _react2['default'].createElement('span', { className: 'bm-cross', style: [this.getCrossStyle('before'), this.props.styles.bmCross] }),
        _react2['default'].createElement('span', { className: 'bm-cross', style: [this.getCrossStyle('after'), this.props.styles.bmCross] })
      );
    }

    return _react2['default'].createElement(
      'div',
      { className: 'bm-cross-button', style: [buttonWrapperStyle, this.props.styles.bmCrossButton] },
      icon,
      _react2['default'].createElement(
        'button',
        { onClick: this.props.onClick, style: buttonStyle },
        'Close Menu'
      )
    );
  }
}));

exports['default'] = CrossIcon;
module.exports = exports['default'];