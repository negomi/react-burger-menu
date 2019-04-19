require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
var _get = function get(_x, _x2, _x3) {
    var _again = true;
    _function:
        while (_again) {
            var object = _x, property = _x2, receiver = _x3;
            _again = false;
            if (object === null)
                object = Function.prototype;
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (desc === undefined) {
                var parent = Object.getPrototypeOf(object);
                if (parent === null) {
                    return undefined;
                } else {
                    _x = parent;
                    _x2 = property;
                    _x3 = receiver;
                    _again = true;
                    desc = parent = undefined;
                    continue _function;
                }
            } else if ('value' in desc) {
                return desc.value;
            } else {
                var getter = desc.get;
                if (getter === undefined) {
                    return undefined;
                }
                return getter.call(receiver);
            }
        }
};
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _reactDom = require('react-dom');
var _reactDom2 = _interopRequireDefault(_reactDom);
var _reactBurgerMenu = require('react-burger-menu');
var _reactBurgerMenu2 = _interopRequireDefault(_reactBurgerMenu);
var _classnames = require('classnames');
var _classnames2 = _interopRequireDefault(_classnames);
var MenuWrap = function (_Component) {
        _inherits(MenuWrap, _Component);
        function MenuWrap(props) {
            _classCallCheck(this, MenuWrap);
            _get(Object.getPrototypeOf(MenuWrap.prototype), 'constructor', this).call(this, props);
            this.state = { hidden: false };
        }
        _createClass(MenuWrap, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var _this = this;
                    var sideChanged = this.props.children.props.right !== nextProps.children.props.right;
                    if (sideChanged) {
                        this.setState({ hidden: true });
                        setTimeout(function () {
                            _this.show();
                        }, this.props.wait);
                    }
                }
            },
            {
                key: 'show',
                value: function show() {
                    this.setState({ hidden: false });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var style = undefined;
                    if (this.state.hidden) {
                        style = { display: 'none' };
                    }
                    return _react2['default'].createElement('div', {
                        style: style,
                        className: this.props.side
                    }, this.props.children);
                }
            }
        ]);
        return MenuWrap;
    }(_react.Component);
var Demo = function (_Component2) {
        _inherits(Demo, _Component2);
        function Demo(props) {
            _classCallCheck(this, Demo);
            _get(Object.getPrototypeOf(Demo.prototype), 'constructor', this).call(this, props);
            this.state = {
                currentMenu: 'slide',
                side: 'left'
            };
        }
        _createClass(Demo, [
            {
                key: 'changeMenu',
                value: function changeMenu(menu) {
                    this.setState({ currentMenu: menu });
                }
            },
            {
                key: 'changeSide',
                value: function changeSide(side) {
                    this.setState({ side: side });
                }
            },
            {
                key: 'getItems',
                value: function getItems() {
                    var items = undefined;
                    switch (this.props.menus[this.state.currentMenu].items) {
                    case 1:
                        items = [
                            _react2['default'].createElement('a', {
                                key: '0',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-star-o' }), _react2['default'].createElement('span', null, 'Favorites')),
                            _react2['default'].createElement('a', {
                                key: '1',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-bell-o' }), _react2['default'].createElement('span', null, 'Alerts')),
                            _react2['default'].createElement('a', {
                                key: '2',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-envelope-o' }), _react2['default'].createElement('span', null, 'Messages')),
                            _react2['default'].createElement('a', {
                                key: '3',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-comment-o' }), _react2['default'].createElement('span', null, 'Comments')),
                            _react2['default'].createElement('a', {
                                key: '4',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-bar-chart-o' }), _react2['default'].createElement('span', null, 'Analytics')),
                            _react2['default'].createElement('a', {
                                key: '5',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-newspaper-o' }), _react2['default'].createElement('span', null, 'Reading List'))
                        ];
                        break;
                    case 2:
                        items = [
                            _react2['default'].createElement('h2', { key: '0' }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-inbox fa-2x' }), _react2['default'].createElement('span', null, 'Sidebar')),
                            _react2['default'].createElement('a', {
                                key: '1',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-database' }), _react2['default'].createElement('span', null, 'Data Management')),
                            _react2['default'].createElement('a', {
                                key: '2',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-map-marker' }), _react2['default'].createElement('span', null, 'Location')),
                            _react2['default'].createElement('a', {
                                key: '3',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-mortar-board' }), _react2['default'].createElement('span', null, 'Study')),
                            _react2['default'].createElement('a', {
                                key: '4',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-picture-o' }), _react2['default'].createElement('span', null, 'Collections')),
                            _react2['default'].createElement('a', {
                                key: '5',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-money' }), _react2['default'].createElement('span', null, 'Credits'))
                        ];
                        break;
                    default:
                        items = [
                            _react2['default'].createElement('a', {
                                key: '0',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-star-o' }), _react2['default'].createElement('span', null, 'Favorites')),
                            _react2['default'].createElement('a', {
                                key: '1',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-bell-o' }), _react2['default'].createElement('span', null, 'Alerts')),
                            _react2['default'].createElement('a', {
                                key: '2',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-envelope-o' }), _react2['default'].createElement('span', null, 'Messages')),
                            _react2['default'].createElement('a', {
                                key: '3',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-comment-o' }), _react2['default'].createElement('span', null, 'Comments')),
                            _react2['default'].createElement('a', {
                                key: '4',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-bar-chart-o' }), _react2['default'].createElement('span', null, 'Analytics')),
                            _react2['default'].createElement('a', {
                                key: '5',
                                href: ''
                            }, _react2['default'].createElement('i', { className: 'fa fa-fw fa-newspaper-o' }), _react2['default'].createElement('span', null, 'Reading List'))
                        ];
                    }
                    return items;
                }
            },
            {
                key: 'getMenu',
                value: function getMenu() {
                    var Menu = _reactBurgerMenu2['default'][this.state.currentMenu];
                    return _react2['default'].createElement(MenuWrap, {
                        wait: 20,
                        side: this.state.side
                    }, _react2['default'].createElement(Menu, {
                        id: this.state.currentMenu,
                        pageWrapId: 'page-wrap',
                        outerContainerId: 'outer-container',
                        right: this.state.side === 'right'
                    }, this.getItems()));
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this2 = this;
                    var buttons = Object.keys(this.props.menus).map(function (menu) {
                            return _react2['default'].createElement('a', {
                                key: menu,
                                className: (0, _classnames2['default'])({ 'current-demo': menu === _this2.state.currentMenu }),
                                onClick: _this2.changeMenu.bind(_this2, menu)
                            }, _this2.props.menus[menu].buttonText);
                        });
                    return _react2['default'].createElement('div', {
                        id: 'outer-container',
                        style: { height: '100%' }
                    }, this.getMenu(), _react2['default'].createElement('main', { id: 'page-wrap' }, _react2['default'].createElement('h1', null, _react2['default'].createElement('a', { href: 'https://github.com/negomi/react-burger-menu' }, 'react-burger-menu')), _react2['default'].createElement('a', {
                        className: (0, _classnames2['default'])({
                            'side-button': true,
                            'left': true,
                            'active': this.state.side === 'left'
                        }),
                        onClick: this.changeSide.bind(this, 'left')
                    }, 'Left'), _react2['default'].createElement('a', {
                        className: (0, _classnames2['default'])({
                            'side-button': true,
                            'right': true,
                            'active': this.state.side === 'right'
                        }),
                        onClick: this.changeSide.bind(this, 'right')
                    }, 'Right'), _react2['default'].createElement('h2', { className: 'description' }, 'An off-canvas sidebar React component with a collection of effects and styles using CSS transitions and SVG path animations.'), _react2['default'].createElement('nav', { className: 'demo-buttons' }, buttons), 'Inspired by ', _react2['default'].createElement('a', { href: 'https://github.com/codrops/OffCanvasMenuEffects' }, 'Off-Canvas Menu Effects'), ' and ', _react2['default'].createElement('a', { href: 'https://github.com/codrops/SidebarTransitions' }, 'Sidebar Transitions'), ' by Codrops'));
                }
            }
        ]);
        return Demo;
    }(_react.Component);
var menus = {
        slide: {
            buttonText: 'Slide',
            items: 1
        },
        stack: {
            buttonText: 'Stack',
            items: 1
        },
        elastic: {
            buttonText: 'Elastic',
            items: 1
        },
        bubble: {
            buttonText: 'Bubble',
            items: 1
        },
        push: {
            buttonText: 'Push',
            items: 1
        },
        pushRotate: {
            buttonText: 'Push Rotate',
            items: 2
        },
        scaleDown: {
            buttonText: 'Scale Down',
            items: 2
        },
        scaleRotate: {
            buttonText: 'Scale Rotate',
            items: 2
        },
        fallDown: {
            buttonText: 'Fall Down',
            items: 2
        },
        reveal: {
            buttonText: 'Reveal',
            items: 1
        }
    };
_reactDom2['default'].render(_react2['default'].createElement(Demo, { menus: menus }), document.getElementById('app'));
},{"classnames":undefined,"react":undefined,"react-burger-menu":undefined,"react-dom":undefined}]},{},[1]);
