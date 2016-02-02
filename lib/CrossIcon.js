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
    styles: _react2['default'].PropTypes.object
  },

  getCrossStyle: function getCrossStyle(type) {
    return {
      position: 'absolute',
      width: 3,
      height: 14,
      top: 14,
      right: 18,
      cursor: 'pointer',
      transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)',
      zIndex: 1
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      styles: {}
    };
  },

  render: function render() {
    var buttonStyle = {
      width: 24,
      height: 24,
      position: 'absolute',
      right: 8,
      top: 8,
      padding: 0,
      overflow: 'hidden',
      textIndent: 14,
      fontSize: 14,
      border: 'none',
      background: 'transparent',
      color: 'transparent',
      outline: 'none',
      zIndex: 1
    };

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement('span', { className: 'bm-cross', style: [this.getCrossStyle('before'), this.props.styles.bmCross] }),
      _react2['default'].createElement('span', { className: 'bm-cross', style: [this.getCrossStyle('after'), this.props.styles.bmCross] }),
      _react2['default'].createElement(
        'button',
        { className: 'bm-cross-button', onClick: this.props.onClick, style: [buttonStyle, this.props.styles.bmCrossButton] },
        'Close Menu'
      )
    );
  }
}));

exports['default'] = CrossIcon;
module.exports = exports['default'];