require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBurgerMenu = require('react-burger-menu');

var _reactBurgerMenu2 = _interopRequireDefault(_reactBurgerMenu);

var Demo = _react2['default'].createClass({
  displayName: 'Demo',

  changeMenu: function changeMenu(menu) {
    this.setState({ currentMenu: menu });
  },

  getMenu: function getMenu() {
    var Menu = _reactBurgerMenu2['default'][this.state.currentMenu];
    var jsx = undefined;

    switch (this.props.menus[this.state.currentMenu].items) {
      case 1:
        jsx = _react2['default'].createElement(
          Menu,
          { id: this.state.currentMenu, pageWrapId: 'page-wrap', outerContainerId: 'outer-container' },
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-star-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Favorites'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-bell-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Alerts'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-envelope-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Messages'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-comment-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Comments'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-bar-chart-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Analytics'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-newspaper-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Reading List'
            )
          )
        );
        break;
      case 2:
        jsx = _react2['default'].createElement(
          Menu,
          { id: this.state.currentMenu, pageWrapId: 'page-wrap', outerContainerId: 'outer-container' },
          _react2['default'].createElement(
            'h2',
            null,
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-inbox fa-2x' }),
            _react2['default'].createElement(
              'span',
              null,
              'Sidebar'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-database' }),
            _react2['default'].createElement(
              'span',
              null,
              'Data Management'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-map-marker' }),
            _react2['default'].createElement(
              'span',
              null,
              'Location'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-mortar-board' }),
            _react2['default'].createElement(
              'span',
              null,
              'Study'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-picture-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Collections'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-money' }),
            _react2['default'].createElement(
              'span',
              null,
              'Credits'
            )
          )
        );
        break;
      default:
        jsx = _react2['default'].createElement(
          Menu,
          { id: this.state.currentMenu, pageWrapId: 'page-wrap', outerContainerId: 'outer-container' },
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-star-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Favorites'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-bell-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Alerts'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-envelope-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Messages'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-comment-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Comments'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-bar-chart-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Analytics'
            )
          ),
          _react2['default'].createElement(
            'a',
            { href: '' },
            _react2['default'].createElement('i', { className: 'fa fa-fw fa-newspaper-o' }),
            _react2['default'].createElement(
              'span',
              null,
              'Reading List'
            )
          )
        );
    }

    return jsx;
  },

  getInitialState: function getInitialState() {
    return { currentMenu: 'slide' };
  },

  render: function render() {
    var _this = this;

    var buttons = Object.keys(this.props.menus).map(function (menu) {
      return _react2['default'].createElement(
        'a',
        { key: menu,
          className: menu === _this.state.currentMenu ? 'current-demo' : '',
          onClick: _this.changeMenu.bind(_this, menu) },
        _this.props.menus[menu].buttonText
      );
    });

    return _react2['default'].createElement(
      'div',
      { id: 'outer-container', style: { height: '100%' } },
      this.getMenu(),
      _react2['default'].createElement(
        'main',
        { id: 'page-wrap' },
        _react2['default'].createElement(
          'h1',
          null,
          _react2['default'].createElement(
            'a',
            { href: 'https://github.com/negomi/react-burger-menu' },
            'react-burger-menu'
          )
        ),
        _react2['default'].createElement(
          'h2',
          null,
          'An off-canvas sidebar React component with a collection of effects and styles using CSS transitions and SVG path animations.'
        ),
        _react2['default'].createElement(
          'nav',
          { className: 'demo-buttons' },
          buttons
        ),
        'Inspired by ',
        _react2['default'].createElement(
          'a',
          { href: 'https://github.com/codrops/OffCanvasMenuEffects' },
          'Off-Canvas Menu Effects'
        ),
        ' and ',
        _react2['default'].createElement(
          'a',
          { href: 'https://github.com/codrops/SidebarTransitions' },
          'Sidebar Transitions'
        ),
        ' by Codrops'
      )
    );
  }
});

var menus = {
  slide: { buttonText: 'Slide', items: 1 },
  stack: { buttonText: 'Stack', items: 1 },
  elastic: { buttonText: 'Elastic', items: 1 },
  bubble: { buttonText: 'Bubble', items: 1 },
  push: { buttonText: 'Push', items: 1 },
  pushRotate: { buttonText: 'Push Rotate', items: 2 },
  scaleDown: { buttonText: 'Scale Down', items: 2 },
  scaleRotate: { buttonText: 'Scale Rotate', items: 2 },
  fallDown: { buttonText: 'Fall Down', items: 2 }
};

_react2['default'].render(_react2['default'].createElement(Demo, { menus: menus }), document.body);

},{"react":undefined,"react-burger-menu":undefined}]},{},[1]);
