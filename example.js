require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var BurgerMenu = require('react-burger-menu');

var Demo = React.createClass({
  displayName: 'Demo',

  changeMenu: function changeMenu(menu) {
    this.setState({ currentMenu: menu });
  },

  getMenu: function getMenu() {
    var Menu = BurgerMenu[this.state.currentMenu];
    var jsx;

    switch (this.props.menus[this.state.currentMenu].items) {
      case 1:
        jsx = React.createElement(
          Menu,
          { id: this.state.currentMenu, pageWrapId: 'page-wrap', outerContainerId: 'outer-container' },
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-star-o' }),
            React.createElement(
              'span',
              null,
              'Favorites'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-bell-o' }),
            React.createElement(
              'span',
              null,
              'Alerts'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-envelope-o' }),
            React.createElement(
              'span',
              null,
              'Messages'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-comment-o' }),
            React.createElement(
              'span',
              null,
              'Comments'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-bar-chart-o' }),
            React.createElement(
              'span',
              null,
              'Analytics'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-newspaper-o' }),
            React.createElement(
              'span',
              null,
              'Reading List'
            )
          )
        );
        break;
      case 2:
        jsx = React.createElement(
          Menu,
          { id: this.state.currentMenu, pageWrapId: 'page-wrap', outerContainerId: 'outer-container' },
          React.createElement(
            'h2',
            null,
            React.createElement('i', { className: 'fa fa-fw fa-inbox fa-2x' }),
            React.createElement(
              'span',
              null,
              'Sidebar'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-database' }),
            React.createElement(
              'span',
              null,
              'Data Management'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-map-marker' }),
            React.createElement(
              'span',
              null,
              'Location'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-mortar-board' }),
            React.createElement(
              'span',
              null,
              'Study'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-picture-o' }),
            React.createElement(
              'span',
              null,
              'Collections'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-money' }),
            React.createElement(
              'span',
              null,
              'Credits'
            )
          )
        );
        break;
      default:
        jsx = React.createElement(
          Menu,
          { id: this.state.currentMenu, pageWrapId: 'page-wrap', outerContainerId: 'outer-container' },
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-star-o' }),
            React.createElement(
              'span',
              null,
              'Favorites'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-bell-o' }),
            React.createElement(
              'span',
              null,
              'Alerts'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-envelope-o' }),
            React.createElement(
              'span',
              null,
              'Messages'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-comment-o' }),
            React.createElement(
              'span',
              null,
              'Comments'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-bar-chart-o' }),
            React.createElement(
              'span',
              null,
              'Analytics'
            )
          ),
          React.createElement(
            'a',
            { href: '' },
            React.createElement('i', { className: 'fa fa-fw fa-newspaper-o' }),
            React.createElement(
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
      return React.createElement(
        'a',
        { key: menu,
          className: menu === _this.state.currentMenu ? 'current-demo' : '',
          onClick: _this.changeMenu.bind(_this, menu) },
        _this.props.menus[menu].buttonText
      );
    });

    return React.createElement(
      'div',
      { id: 'outer-container', style: { height: '100%' } },
      this.getMenu(),
      React.createElement(
        'main',
        { id: 'page-wrap' },
        React.createElement(
          'h1',
          null,
          React.createElement(
            'a',
            { href: 'https://github.com/negomi/react-burger-menu' },
            'react-burger-menu'
          )
        ),
        React.createElement(
          'h2',
          null,
          'An off-canvas sidebar React component with a collection of effects and styles using CSS transitions and SVG path animations.'
        ),
        React.createElement(
          'nav',
          { className: 'demo-buttons' },
          buttons
        ),
        'Inspired by ',
        React.createElement(
          'a',
          { href: 'https://github.com/codrops/OffCanvasMenuEffects' },
          'Off-Canvas Menu Effects'
        ),
        ' and ',
        React.createElement(
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

React.render(React.createElement(Demo, { menus: menus }), document.body);

},{"react":undefined,"react-burger-menu":undefined}]},{},[1]);
