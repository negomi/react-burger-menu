'use strict';

Object.defineProperty(exports, '__esModule', {
		value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _menuFactory = require('../menuFactory');

var _menuFactory2 = _interopRequireDefault(_menuFactory);

var styles = {

		pageWrap: function pageWrap(isOpen, width, right, breakpoint) {
				if (window.innerWidth < breakpoint) {
						return {
								transform: isOpen ? '' : right ? 'translate3d(-' + width + 'px, 0, 0)' : 'translate3d(' + width + 'px, 0, 0)',
								transition: 'transform 0.5s'
						};
				}
				return {
						width: isOpen ? '100%' : 'calc(100% - ' + width + 'px)',
						position: 'absolute',
						right: right ? 'initial' : '0',
						left: right ? '0' : 'initial',
						top: '0',
						transition: 'width 0.5s'
				};
		},

		outerContainer: function outerContainer(isOpen) {
				return {
						overflow: isOpen ? '' : 'hidden'
				};
		}
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];