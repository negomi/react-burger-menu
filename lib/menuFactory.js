'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpersBaseStyles = require('./helpers/baseStyles');

var _helpersBaseStyles2 = _interopRequireDefault(_helpersBaseStyles);

var _helpersDom = require('./helpers/dom');

var _componentsBurgerIcon = require('./components/BurgerIcon');

var _componentsBurgerIcon2 = _interopRequireDefault(_componentsBurgerIcon);

var _componentsCrossIcon = require('./components/CrossIcon');

var _componentsCrossIcon2 = _interopRequireDefault(_componentsCrossIcon);

exports['default'] = function (styles) {
  if (!styles) {
    throw new Error('No styles supplied');
  }

  var ARROW_DOWN = 'ArrowDown';
  var ARROW_UP = 'ArrowUp';
  var ESCAPE = 'Escape';
  var SPACE = ' ';
  var HOME = 'Home';
  var END = 'End';

  function usePrevious(value) {
    var ref = _react2['default'].useRef(value);
    _react2['default'].useEffect(function () {
      ref.current = value;
    });
    return ref.current;
  }

  var Menu = function Menu(props) {
    var _React$useState = _react2['default'].useState(false);

    var _React$useState2 = _slicedToArray(_React$useState, 2);

    var isOpen = _React$useState2[0];
    var setIsOpen = _React$useState2[1];

    var timeoutId = _react2['default'].useRef();
    var toggleOptions = _react2['default'].useRef({});
    var prevIsOpenProp = usePrevious(props.isOpen);

    _react2['default'].useEffect(function () {
      if (props.isOpen) {
        toggleMenu({ isOpen: true, noStateChange: true });
      }

      return function cleanup() {
        applyWrapperStyles(false);
        clearCurrentTimeout();
      };
    }, []);

    _react2['default'].useEffect(function () {
      var wasToggled = typeof props.isOpen !== 'undefined' && props.isOpen !== isOpen && props.isOpen !== prevIsOpenProp;

      if (wasToggled) {
        toggleMenu();
        // Toggling changes SVG animation requirements, so defer these until next update
        return;
      }

      if (styles.svg) {
        (function () {
          var morphShape = document.getElementById('bm-morph-shape');
          var path = styles.svg.lib(morphShape).select('path');

          if (isOpen) {
            // Animate SVG path
            styles.svg.animate(path);
          } else {
            // Reset path (timeout ensures animation happens off screen)
            setTimeout(function () {
              path.attr('d', styles.svg.pathInitial);
            }, 300);
          }
        })();
      }
    });

    _react2['default'].useEffect(function () {
      var _toggleOptions$current = toggleOptions.current;
      var noStateChange = _toggleOptions$current.noStateChange;
      var focusOnLastItem = _toggleOptions$current.focusOnLastItem;

      if (!noStateChange) {
        props.onStateChange({ isOpen: isOpen });
      }

      if (!props.disableAutoFocus) {
        // For accessibility reasons, ensures that when we toggle open,
        // we focus the first or last menu item according to given parameter
        if (isOpen) {
          focusOnLastItem ? (0, _helpersDom.focusOnLastMenuItem)() : (0, _helpersDom.focusOnFirstMenuItem)();
        } else {
          if (document.activeElement) {
            document.activeElement.blur();
          } else {
            document.body.blur(); // Needed for IE
          }
        }
      }

      // Timeout ensures wrappers are cleared after animation finishes
      clearCurrentTimeout();
      timeoutId.current = setTimeout(function () {
        timeoutId.current = null;
        if (!isOpen) {
          applyWrapperStyles(false);
        }
      }, 500);

      // Bind keydown handlers (or custom function if supplied)
      var defaultOnKeyDown = isOpen ? onKeyDownOpen : onKeyDownClosed;
      var onKeyDown = props.customOnKeyDown || defaultOnKeyDown;
      window.addEventListener('keydown', onKeyDown);

      return function cleanup() {
        window.removeEventListener('keydown', onKeyDown);
      };
    }, [isOpen]);

    function toggleMenu() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      toggleOptions.current = options;

      applyWrapperStyles();

      // Ensures wrapper styles are applied before the menu is toggled
      setTimeout(function () {
        setIsOpen(function (open) {
          return typeof options.isOpen !== 'undefined' ? options.isOpen : !open;
        });
      });
    }

    function open() {
      if (typeof props.onOpen === 'function') {
        props.onOpen();
      } else {
        toggleMenu();
      }
    }

    function close() {
      if (typeof props.onClose === 'function') {
        props.onClose();
      } else {
        toggleMenu();
      }
    }

    function getStyle(style, index) {
      var width = props.width;
      var right = props.right;

      var formattedWidth = typeof width !== 'string' ? width + 'px' : width;
      return style(isOpen, formattedWidth, right, index);
    }

    // Builds styles incrementally for a given element
    function getStyles(el, index, inline) {
      var propName = 'bm' + el.replace(el.charAt(0), el.charAt(0).toUpperCase());

      // Set base styles
      var output = _helpersBaseStyles2['default'][el] ? getStyle(_helpersBaseStyles2['default'][el]) : {};

      // Add animation-specific styles
      if (styles[el]) {
        output = _extends({}, output, getStyle(styles[el], index + 1));
      }

      // Add custom styles
      if (props.styles[propName]) {
        output = _extends({}, output, props.styles[propName]);
      }

      // Add element inline styles
      if (inline) {
        output = _extends({}, output, inline);
      }

      // Remove transition if required
      // (useful if rendering open initially)
      if (props.noTransition) {
        delete output.transition;
      }

      return output;
    }

    // Sets or unsets styles on DOM elements outside the menu component
    // This is necessary for correct page interaction with some of the menus
    // Throws and returns if the required external elements don't exist,
    // which means any external page animations won't be applied
    function handleExternalWrapper(id, wrapperStyles, set) {
      var wrapper = document.getElementById(id);

      if (!wrapper) {
        console.error("Element with ID '" + id + "' not found");
        return;
      }

      var builtStyles = getStyle(wrapperStyles);

      for (var prop in builtStyles) {
        if (builtStyles.hasOwnProperty(prop)) {
          wrapper.style[prop] = set ? builtStyles[prop] : '';
        }
      }

      // Prevent any horizontal scroll
      // Only set overflow-x as an inline style if htmlClassName or
      // bodyClassName is not passed in. Otherwise, it is up to the caller to
      // decide if they want to set the overflow style in CSS using the custom
      // class names
      var applyOverflow = function applyOverflow(el) {
        return el.style['overflow-x'] = set ? 'hidden' : '';
      };
      if (!props.htmlClassName) {
        applyOverflow(document.querySelector('html'));
      }
      if (!props.bodyClassName) {
        applyOverflow(document.querySelector('body'));
      }
    }

    // Applies component-specific styles to external wrapper elements
    function applyWrapperStyles() {
      var set = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      var applyClass = function applyClass(el, className) {
        return el.classList[set ? 'add' : 'remove'](className);
      };

      if (props.htmlClassName) {
        applyClass(document.querySelector('html'), props.htmlClassName);
      }
      if (props.bodyClassName) {
        applyClass(document.querySelector('body'), props.bodyClassName);
      }

      if (styles.pageWrap && props.pageWrapId) {
        handleExternalWrapper(props.pageWrapId, styles.pageWrap, set);
      }

      if (styles.outerContainer && props.outerContainerId) {
        handleExternalWrapper(props.outerContainerId, styles.outerContainer, set);
      }

      var menuWrap = document.querySelector('.bm-menu-wrap');
      if (menuWrap) {
        if (set) {
          menuWrap.removeAttribute('hidden');
        } else {
          menuWrap.setAttribute('hidden', true);
        }
      }
    }

    // Avoids potentially attempting to update an unmounted component
    function clearCurrentTimeout() {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    }

    function onKeyDownOpen(e) {
      e = e || window.event;
      switch (e.key) {
        case ESCAPE:
          // Close on ESC, unless disabled
          if (!props.disableCloseOnEsc) {
            close();
            (0, _helpersDom.focusOnMenuButton)();
          }
          break;
        case ARROW_DOWN:
          (0, _helpersDom.focusOnNextMenuItem)();
          break;
        case ARROW_UP:
          (0, _helpersDom.focusOnPreviousMenuItem)();
          break;
        case HOME:
          (0, _helpersDom.focusOnFirstMenuItem)();
          break;
        case END:
          (0, _helpersDom.focusOnLastMenuItem)();
          break;
      }
    }

    function onKeyDownClosed(e) {
      e = e || window.event;
      // Key downs came from menu button
      if (e.target === document.getElementById('react-burger-menu-btn')) {
        switch (e.key) {
          case ARROW_DOWN:
          case SPACE:
            // If down arrow, space or enter, open menu and focus on first menuitem
            toggleMenu();
            break;
          case ARROW_UP:
            // If arrow up, open menu and focus on last menuitem
            toggleMenu({ focusOnLastItem: true });
            break;
        }
      }
    }

    function handleOverlayClick() {
      if (props.disableOverlayClick === true || typeof props.disableOverlayClick === 'function' && props.disableOverlayClick()) {
        return;
      } else {
        close();
      }
    }

    return _react2['default'].createElement(
      'div',
      null,
      !props.noOverlay && _react2['default'].createElement('div', {
        className: ('bm-overlay ' + props.overlayClassName).trim(),
        onClick: handleOverlayClick,
        style: getStyles('overlay')
      }),
      props.customBurgerIcon !== false && _react2['default'].createElement(
        'div',
        { style: getStyles('burgerIcon') },
        _react2['default'].createElement(_componentsBurgerIcon2['default'], {
          onClick: open,
          styles: props.styles,
          customIcon: props.customBurgerIcon,
          className: props.burgerButtonClassName,
          barClassName: props.burgerBarClassName,
          onIconStateChange: props.onIconStateChange
        })
      ),
      _react2['default'].createElement(
        'div',
        {
          id: props.id,
          className: ('bm-menu-wrap ' + props.className).trim(),
          style: getStyles('menuWrap'),
          'aria-hidden': !isOpen
        },
        styles.svg && _react2['default'].createElement(
          'div',
          {
            id: 'bm-morph-shape',
            className: ('bm-morph-shape ' + props.morphShapeClassName).trim(),
            style: getStyles('morphShape')
          },
          _react2['default'].createElement(
            'svg',
            {
              width: '100%',
              height: '100%',
              viewBox: '0 0 100 800',
              preserveAspectRatio: 'none'
            },
            _react2['default'].createElement('path', { d: styles.svg.pathInitial })
          )
        ),
        _react2['default'].createElement(
          'div',
          {
            className: ('bm-menu ' + props.menuClassName).trim(),
            style: getStyles('menu')
          },
          _react2['default'].createElement(props.itemListElement, {
            className: ('bm-item-list ' + props.itemListClassName).trim(),
            style: getStyles('itemList')
          }, _react2['default'].Children.map(props.children, function (item, index) {
            if (item) {
              var classList = ['bm-item', props.itemClassName, item.props.className].filter(function (className) {
                return !!className;
              }).join(' ');
              var extraProps = {
                key: index,
                className: classList,
                style: getStyles('item', index, item.props.style),
                tabIndex: isOpen ? 0 : -1
              };
              return _react2['default'].cloneElement(item, extraProps);
            }
          }))
        ),
        props.customCrossIcon !== false && _react2['default'].createElement(
          'div',
          { style: getStyles('closeButton') },
          _react2['default'].createElement(_componentsCrossIcon2['default'], {
            onClick: close,
            styles: props.styles,
            customIcon: props.customCrossIcon,
            className: props.crossButtonClassName,
            crossClassName: props.crossClassName,
            isOpen: isOpen
          })
        )
      )
    );
  };

  Menu.propTypes = {
    bodyClassName: _propTypes2['default'].string,
    burgerBarClassName: _propTypes2['default'].string,
    burgerButtonClassName: _propTypes2['default'].string,
    className: _propTypes2['default'].string,
    crossButtonClassName: _propTypes2['default'].string,
    crossClassName: _propTypes2['default'].string,
    customBurgerIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].oneOf([false])]),
    customCrossIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].oneOf([false])]),
    customOnKeyDown: _propTypes2['default'].func,
    disableAutoFocus: _propTypes2['default'].bool,
    disableCloseOnEsc: _propTypes2['default'].bool,
    disableOverlayClick: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].func]),
    htmlClassName: _propTypes2['default'].string,
    id: _propTypes2['default'].string,
    isOpen: _propTypes2['default'].bool,
    itemClassName: _propTypes2['default'].string,
    itemListClassName: _propTypes2['default'].string,
    itemListElement: _propTypes2['default'].oneOf(['div', 'nav']),
    menuClassName: _propTypes2['default'].string,
    morphShapeClassName: _propTypes2['default'].string,
    noOverlay: _propTypes2['default'].bool,
    noTransition: _propTypes2['default'].bool,
    onClose: _propTypes2['default'].func,
    onIconHoverChange: _propTypes2['default'].func,
    onOpen: _propTypes2['default'].func,
    onStateChange: _propTypes2['default'].func,
    outerContainerId: styles && styles.outerContainer ? _propTypes2['default'].string.isRequired : _propTypes2['default'].string,
    overlayClassName: _propTypes2['default'].string,
    pageWrapId: styles && styles.pageWrap ? _propTypes2['default'].string.isRequired : _propTypes2['default'].string,
    right: _propTypes2['default'].bool,
    styles: _propTypes2['default'].object,
    width: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string])
  };

  Menu.defaultProps = {
    bodyClassName: '',
    burgerBarClassName: '',
    burgerButtonClassName: '',
    className: '',
    crossButtonClassName: '',
    crossClassName: '',
    disableAutoFocus: false,
    disableCloseOnEsc: false,
    htmlClassName: '',
    id: '',
    itemClassName: '',
    itemListClassName: '',
    menuClassName: '',
    morphShapeClassName: '',
    noOverlay: false,
    noTransition: false,
    onStateChange: function onStateChange() {},
    outerContainerId: '',
    overlayClassName: '',
    pageWrapId: '',
    styles: {},
    width: 300,
    onIconHoverChange: function onIconHoverChange() {},
    itemListElement: 'nav'
  };

  return Menu;
};

module.exports = exports['default'];