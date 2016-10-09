'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import baseStyles from './baseStyles';
import BurgerIcon from './BurgerIcon';
import CrossIcon from './CrossIcon';

export default (styles) => {

  return Radium(React.createClass({

    propTypes: {
      customBurgerIcon: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.oneOf([false])]),
      customCrossIcon: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.oneOf([false])]),
      id: React.PropTypes.string,
      isOpen: React.PropTypes.bool,
      noOverlay: React.PropTypes.bool,
      onStateChange: React.PropTypes.func,
      outerContainerId: styles && styles.outerContainer ? React.PropTypes.string.isRequired : React.PropTypes.string,
      pageWrapId: styles && styles.pageWrap ? React.PropTypes.string.isRequired : React.PropTypes.string,
      right: React.PropTypes.bool,
      styles: React.PropTypes.object,
      width: React.PropTypes.number
    },

    toggleMenu() {
      // Order important: handle wrappers before setting sidebar state.
      this.applyWrapperStyles();

      const newState = { isOpen: !this.state.isOpen };
      this.setState(newState, this.props.onStateChange.bind(null, newState));
    },

    // Applies component-specific styles to external wrapper elements.
    applyWrapperStyles() {
      if (styles.pageWrap && this.props.pageWrapId) {
        this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, true);
      }

      if (styles.outerContainer && this.props.outerContainerId) {
        this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, true);
      }
    },

    // Removes component-specific styles applied to external wrapper elements.
    clearWrapperStyles() {
      if (styles.pageWrap && this.props.pageWrapId) {
        this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, false);
      }

      if (styles.outerContainer && this.props.outerContainerId) {
        this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, false);
      }
    },

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

      const builtStyles = wrapperStyles(this.state.isOpen, this.props.width, this.props.right);

      for (const prop in builtStyles) {
        if (builtStyles.hasOwnProperty(prop)) {
          wrapper.style[prop] = set ? builtStyles[prop] : '';
        }
      }
    },

    // Builds styles incrementally for a given element.
    getStyles(el, index, inline) {
      const propName = 'bm' + el.replace(el.charAt(0), el.charAt(0).toUpperCase());

      // Set base styles.
      let output = baseStyles[el] ? [baseStyles[el](this.state.isOpen, this.props.width, this.props.right)] : [];

      // Add animation-specific styles.
      if (styles[el]) {
        output.push(styles[el](this.state.isOpen, this.props.width, this.props.right, index + 1));
      }

      // Add custom styles.
      if (this.props.styles[propName]) {
        output.push(this.props.styles[propName]);
      }

      // Add element inline styles.
      if (inline) {
        output.push(inline);
      }

      return output;
    },

    listenForClose(e) {
      e = e || window.event;

      if (this.state.isOpen && (e.key === 'Escape' || e.keyCode === 27)) {
        this.toggleMenu();
      }
    },

    getDefaultProps() {
      return {
        id: '',
        noOverlay: false,
        onStateChange: () => {},
        outerContainerId: '',
        pageWrapId: '',
        styles: {},
        width: 300
      };
    },

    getInitialState() {
      const initialIsOpenProp = this.props && typeof this.props.isOpen !== 'undefined';
      return { isOpen: initialIsOpenProp ? this.props.isOpen : false };
    },

    componentWillMount() {
      if (!styles) {
        throw new Error('No styles supplied');
      }

      // Allow initial open state to be set by props.
      if (this.props.isOpen) {
        this.toggleMenu();
      }
    },

    componentDidMount() {
      window.onkeydown = this.listenForClose;

      // Allow initial open state to be set by props for animations with wrapper elements.
      if (this.props.isOpen) {
        this.toggleMenu();
      }
    },

    componentWillUnmount() {
      window.onkeydown = null;

      this.clearWrapperStyles();
    },

    componentDidUpdate() {
      if (styles.svg && this.isMounted()) {
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
    },

    componentWillReceiveProps(nextProps) {
      if (typeof nextProps.isOpen !== 'undefined' && nextProps.isOpen !== this.state.isOpen) {
        this.toggleMenu();
      }
    },

    render() {
      return (
        <div>
          {!this.props.noOverlay ? <div className="bm-overlay" onClick={this.toggleMenu} style={this.getStyles('overlay')} /> : null}
          <div id={this.props.id} className="bm-menu-wrap" style={this.getStyles('menuWrap')}>
            {styles.svg ? (
              <div className="bm-morph-shape" style={this.getStyles('morphShape')}>
                <svg width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
                  <path d={styles.svg.pathInitial}/>
                </svg>
              </div>
            ) : null}
            <div className="bm-menu" style={this.getStyles('menu')} >
              <nav className="bm-item-list" style={this.getStyles('itemList')}>
                {React.Children.map(this.props.children, (item, index) => {
                  if (item) {
                    const extraProps = {
                      key: index,
                      style: this.getStyles('item', index, item.props.style)
                    };
                    return React.cloneElement(item, extraProps);
                  }
                })}
              </nav>
            </div>
            {this.props.customCrossIcon !== false ? (
              <div style={this.getStyles('closeButton')}>
                <CrossIcon onClick={this.toggleMenu} styles={this.props.styles} customIcon={this.props.customCrossIcon} />
              </div>
            ) : null}
          </div>
          {this.props.customBurgerIcon !== false ? (
            <BurgerIcon onClick={this.toggleMenu} styles={this.props.styles} customIcon={this.props.customBurgerIcon} />
          ) : null}
        </div>
      );
    }
  }));
};
