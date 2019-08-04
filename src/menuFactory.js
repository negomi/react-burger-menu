'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import baseStyles from './baseStyles';
import BurgerIcon from './BurgerIcon';
import CrossIcon from './CrossIcon';

export default styles => {
  class Menu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };

      if (!styles) {
        throw new Error('No styles supplied');
      }
    }

    toggleMenu(options = {}) {
      const { isOpen, noStateChange } = options;
      const newState = {
        isOpen: typeof isOpen !== 'undefined' ? isOpen : !this.state.isOpen
      };

      this.applyWrapperStyles();

      this.setState(newState, () => {
        !noStateChange && this.props.onStateChange(newState);

        if (!this.props.disableAutoFocus) {
          // For accessibility reasons, ensures that when we toggle open,
          // we focus the first menu item if one exists.
          if (newState.isOpen) {
            const firstItem = document.querySelector('.bm-item');
            if (firstItem) {
              firstItem.focus();
            }
          } else {
            if (document.activeElement) {
              document.activeElement.blur();
            } else {
              document.body.blur(); // Needed for IE
            }
          }
        }

        // Timeout ensures wrappers are cleared after animation finishes.
        this.timeoutId && clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.timeoutId = null;
          if (!newState.isOpen) {
            this.applyWrapperStyles(false);
          }
        }, 500);
      });
    }

    // Applies component-specific styles to external wrapper elements.
    applyWrapperStyles(set = true) {
      const applyClass = (el, className) =>
        el.classList[set ? 'add' : 'remove'](className);

      if (this.props.htmlClassName) {
        applyClass(document.querySelector('html'), this.props.htmlClassName);
      }
      if (this.props.bodyClassName) {
        applyClass(document.querySelector('body'), this.props.bodyClassName);
      }

      if (styles.pageWrap && this.props.pageWrapId) {
        this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, set);
      }

      if (styles.outerContainer && this.props.outerContainerId) {
        this.handleExternalWrapper(
          this.props.outerContainerId,
          styles.outerContainer,
          set
        );
      }
    }

    // Sets or unsets styles on DOM elements outside the menu component.
    // This is necessary for correct page interaction with some of the menus.
    // Throws and returns if the required external elements don't exist,
    // which means any external page animations won't be applied.
    handleExternalWrapper(id, wrapperStyles, set) {
      const wrapper = document.getElementById(id);

      if (!wrapper) {
        console.error("Element with ID '" + id + "' not found");
        return;
      }

      const builtStyles = this.getStyle(wrapperStyles);

      for (const prop in builtStyles) {
        if (builtStyles.hasOwnProperty(prop)) {
          wrapper.style[prop] = set ? builtStyles[prop] : '';
        }
      }

      // Prevent any horizontal scroll.
      // Only set overflow-x as an inline style if htmlClassName or
      // bodyClassName is not passed in. Otherwise, it is up to the caller to
      // decide if they want to set the overflow style in CSS using the custom
      // class names.
      const applyOverflow = el =>
        (el.style['overflow-x'] = set ? 'hidden' : '');
      if (!this.props.htmlClassName) {
        applyOverflow(document.querySelector('html'));
      }
      if (!this.props.bodyClassName) {
        applyOverflow(document.querySelector('body'));
      }
    }

    // Builds styles incrementally for a given element.
    getStyles(el, index, inline) {
      const propName =
        'bm' + el.replace(el.charAt(0), el.charAt(0).toUpperCase());

      // Set base styles.
      let output = baseStyles[el] ? this.getStyle(baseStyles[el]) : {};

      // Add animation-specific styles.
      if (styles[el]) {
        output = {
          ...output,
          ...this.getStyle(styles[el], index + 1)
        };
      }

      // Add custom styles.
      if (this.props.styles[propName]) {
        output = {
          ...output,
          ...this.props.styles[propName]
        };
      }

      // Add element inline styles.
      if (inline) {
        output = {
          ...output,
          ...inline
        };
      }

      // Remove transition if required
      // (useful if rendering open initially).
      if (this.props.noTransition) {
        delete output.transition;
      }

      return output;
    }

    getStyle(style, index) {
      const { width } = this.props;
      const formattedWidth = typeof width !== 'string' ? `${width}px` : width;
      return style(this.state.isOpen, formattedWidth, this.props.right, index);
    }

    listenForClose(e) {
      e = e || window.event;

      // Close on ESC, unless disabled
      if (
        !this.props.disableCloseOnEsc &&
        this.state.isOpen &&
        (e.key === 'Escape' || e.keyCode === 27)
      ) {
        this.toggleMenu();
      }
    }

    shouldDisableOverlayClick() {
      if (typeof this.props.disableOverlayClick === 'function') {
        return this.props.disableOverlayClick();
      } else {
        return this.props.disableOverlayClick;
      }
    }

    componentDidMount() {
      // Bind ESC key handler (unless custom function supplied).
      if (this.props.customOnKeyDown) {
        window.onkeydown = this.props.customOnKeyDown;
      } else {
        window.onkeydown = this.listenForClose.bind(this);
      }

      // Allow initial open state to be set by props.
      if (this.props.isOpen) {
        this.toggleMenu({ isOpen: true, noStateChange: true });
      }
    }

    componentWillUnmount() {
      window.onkeydown = null;

      this.applyWrapperStyles(false);
    }

    componentDidUpdate(prevProps) {
      const wasToggled =
        typeof this.props.isOpen !== 'undefined' &&
        this.props.isOpen !== this.state.isOpen &&
        this.props.isOpen !== prevProps.isOpen;
      if (wasToggled) {
        this.toggleMenu();
        // Toggling changes SVG animation requirements, so we defer these until the next componentDidUpdate
        return;
      }

      if (styles.svg) {
        const morphShape = ReactDOM.findDOMNode(this, 'bm-morph-shape');
        const path = styles.svg.lib(morphShape).select('path');

        if (this.state.isOpen) {
          // Animate SVG path.
          styles.svg.animate(path);
        } else {
          // Reset path (timeout ensures animation happens off screen).
          setTimeout(() => {
            path.attr('d', styles.svg.pathInitial);
          }, 300);
        }
      }
    }

    render() {
      return (
        <div>
          {!this.props.noOverlay && (
            <div
              className={`bm-overlay ${this.props.overlayClassName}`.trim()}
              onClick={() =>
                !this.shouldDisableOverlayClick() && this.toggleMenu()
              }
              style={this.getStyles('overlay')}
            />
          )}
          <div
            id={this.props.id}
            className={`bm-menu-wrap ${this.props.className}`.trim()}
            style={this.getStyles('menuWrap')}
          >
            {styles.svg && (
              <div
                className={`bm-morph-shape ${
                  this.props.morphShapeClassName
                }`.trim()}
                style={this.getStyles('morphShape')}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 800"
                  preserveAspectRatio="none"
                >
                  <path d={styles.svg.pathInitial} />
                </svg>
              </div>
            )}
            <div
              className={`bm-menu ${this.props.menuClassName}`.trim()}
              style={this.getStyles('menu')}
            >
              <nav
                className={`bm-item-list ${
                  this.props.itemListClassName
                }`.trim()}
                style={this.getStyles('itemList')}
              >
                {React.Children.map(this.props.children, (item, index) => {
                  if (item) {
                    const classList = [
                      'bm-item',
                      this.props.itemClassName,
                      item.props.className
                    ]
                      .filter(className => !!className)
                      .join(' ');
                    const extraProps = {
                      key: index,
                      className: classList,
                      style: this.getStyles('item', index, item.props.style),
                      tabIndex: this.state.isOpen ? 0 : -1
                    };
                    return React.cloneElement(item, extraProps);
                  }
                })}
              </nav>
            </div>
            {this.props.customCrossIcon !== false && (
              <div style={this.getStyles('closeButton')}>
                <CrossIcon
                  onClick={() => this.toggleMenu()}
                  styles={this.props.styles}
                  customIcon={this.props.customCrossIcon}
                  className={this.props.crossButtonClassName}
                  crossClassName={this.props.crossClassName}
                  tabIndex={this.state.isOpen ? 0 : -1}
                />
              </div>
            )}
          </div>
          {this.props.customBurgerIcon !== false && (
            <div style={this.getStyles('burgerIcon')}>
              <BurgerIcon
                onClick={() => this.toggleMenu()}
                styles={this.props.styles}
                customIcon={this.props.customBurgerIcon}
                className={this.props.burgerButtonClassName}
                barClassName={this.props.burgerBarClassName}
              />
            </div>
          )}
        </div>
      );
    }
  }

  Menu.propTypes = {
    bodyClassName: PropTypes.string,
    burgerBarClassName: PropTypes.string,
    burgerButtonClassName: PropTypes.string,
    className: PropTypes.string,
    crossButtonClassName: PropTypes.string,
    crossClassName: PropTypes.string,
    customBurgerIcon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.oneOf([false])
    ]),
    customCrossIcon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.oneOf([false])
    ]),
    customOnKeyDown: PropTypes.func,
    disableAutoFocus: PropTypes.bool,
    disableCloseOnEsc: PropTypes.bool,
    disableOverlayClick: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    htmlClassName: PropTypes.string,
    id: PropTypes.string,
    isOpen: PropTypes.bool,
    itemClassName: PropTypes.string,
    itemListClassName: PropTypes.string,
    menuClassName: PropTypes.string,
    morphShapeClassName: PropTypes.string,
    noOverlay: PropTypes.bool,
    noTransition: PropTypes.bool,
    onStateChange: PropTypes.func,
    outerContainerId:
      styles && styles.outerContainer
        ? PropTypes.string.isRequired
        : PropTypes.string,
    overlayClassName: PropTypes.string,
    pageWrapId:
      styles && styles.pageWrap
        ? PropTypes.string.isRequired
        : PropTypes.string,
    right: PropTypes.bool,
    styles: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
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
    onStateChange: () => {},
    outerContainerId: '',
    overlayClassName: '',
    pageWrapId: '',
    styles: {},
    width: 300
  };

  return Menu;
};
