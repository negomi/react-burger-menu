'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var BurgerIcon = (function (_Component) {
  _inherits(BurgerIcon, _Component);

  function BurgerIcon(props) {
    _classCallCheck(this, BurgerIcon);

    _get(Object.getPrototypeOf(BurgerIcon.prototype), 'constructor', this).call(this, props);
    this.state = {
      hover: false
    };
  }

  _createClass(BurgerIcon, [{
    key: 'getLineStyle',
    value: function getLineStyle(index) {
      return _extends({
        position: 'absolute',
        height: '20%',
        left: 0,
        right: 0,
        top: 20 * (index * 2) + '%',
        opacity: this.state.hover ? 0.6 : 1
      }, this.state.hover && this.props.styles.bmBurgerBarsHover);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var icon = undefined;
      var buttonStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        border: 'none',
        fontSize: 0,
        background: 'transparent',
        cursor: 'pointer'
      };

      if (this.props.customIcon) {
        var extraProps = {
          className: 'bm-icon',
          style: _extends({ width: '100%', height: '100%' }, this.props.styles.bmIcon)
        };
        icon = _react2['default'].cloneElement(this.props.customIcon, extraProps);
      } else {
        icon = _react2['default'].createElement(
          'span',
          null,
          [0, 1, 2].map(function (bar) {
            return _react2['default'].createElement('span', {
              key: bar,
              className: ('bm-burger-bars ' + _this.props.barClassName + ' ' + (_this.state.hover ? 'bm-burger-bars-hover' : '')).trim(),
              style: _extends({}, _this.getLineStyle(bar), _this.props.styles.bmBurgerBars)
            });
          })
        );
      }

      return _react2['default'].createElement(
        'div',
        {
          className: ('bm-burger-button ' + this.props.className).trim(),
          style: _extends({ zIndex: 1000 }, this.props.styles.bmBurgerButton)
        },
        icon,
        _react2['default'].createElement(
          'button',
          {
            onClick: this.props.onClick,
            onMouseOver: function () {
              return _this.setState({ hover: true });
            },
            onMouseOut: function () {
              return _this.setState({ hover: false });
            },
            style: buttonStyle
          },
          'Open Menu'
        )
      );
    }
  }]);

  return BurgerIcon;
})(_react.Component);

exports['default'] = BurgerIcon;

BurgerIcon.propTypes = {
  barClassName: _propTypes2['default'].string,
  customIcon: _propTypes2['default'].element,
  styles: _propTypes2['default'].object
};

BurgerIcon.defaultProps = {
  barClassName: '',
  className: '',
  styles: {}
};
module.exports = exports['default'];