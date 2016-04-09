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
      customBurgerIcon: React.PropTypes.element,
      customCrossIcon: React.PropTypes.element,
      id: React.PropTypes.string,
      isOpen: React.PropTypes.bool,
      noOverlay: React.PropTypes.bool,
      onStateChange: React.PropTypes.func,
      outerContainerId: React.PropTypes.string,
      pageWrapId: React.PropTypes.string,
      right: React.PropTypes.bool,
      styles: React.PropTypes.object,
      width: React.PropTypes.number
    },

    toggleMenu(isOpenVal) {
      // Order important: handle wrappers before setting sidebar state.
      this.applyWrapperStyles();

      // Disregard isOpenVal if not a boolean.
      const newState = { isOpen: typeof isOpenVal === 'boolean' ? isOpenVal : !this.state.isOpen };
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
      let html = document.querySelector('html');
      let body = document.querySelector('body');
      let wrapper = document.getElementById(id);

      if (!wrapper) {
        console.error("Element with ID '" + id + "' not found");
        return;
      }

      wrapperStyles = wrapperStyles(this.state.isOpen, this.props.width, this.props.right);

      for (let prop in wrapperStyles) {
        if (wrapperStyles.hasOwnProperty(prop)) {
          wrapper.style[prop] = set ? wrapperStyles[prop] : '';
        }
      }

      // Prevent any horizontal scroll.
      [html, body].forEach((element) => {
        element.style['overflow-x'] = set ? 'hidden' : '';
      });
    },

    // Builds styles incrementally for a given element.
    getStyles(el, index) {
      let propName = 'bm' + el.replace(el.charAt(0), el.charAt(0).toUpperCase());

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
      return { isOpen: false };
    },

    componentWillMount() {
      if (!styles) {
        throw new Error('No styles supplied');
      }

      // Warn if the selected menu requires external wrapper elements
      // but none were supplied.
      if (styles.pageWrap && !this.props.pageWrapId) {
        console.warn('No pageWrapId supplied');
      }

      if (styles.outerContainer && !this.props.outerContainerId) {
        console.warn('No outerContainerId supplied');
      }

      // Allow initial open state to be set by props.
      if (this.props.isOpen) {
        this.toggleMenu();
      }
    },

    componentDidMount() {
      window.onkeydown = this.listenForClose;
    },

    componentWillUnmount() {
      window.onkeydown = null;

      this.clearWrapperStyles();
    },

    componentDidUpdate() {
      if (styles.svg && this.isMounted()) {
        // Snap.svg workaround for Webpack using imports-loader (https://github.com/webpack/imports-loader).
        let snap;
        try {
          snap = require('imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');
        } catch(e) {
          snap = require('snapsvg');
        }

        let morphShape = ReactDOM.findDOMNode(this, 'bm-morph-shape');
        let s = snap(morphShape);
        let path = s.select('path');

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
      // Allow open state to be controlled by props.
      if (typeof nextProps.isOpen === 'boolean' && nextProps.isOpen !== this.props.isOpen) {
        this.toggleMenu(nextProps.isOpen);
      }
    },

    render() {
      let items, svg, overlay;

      // Add styles to user-defined menu items.
      if (this.props.children) {
        items = React.Children.map(this.props.children, (item, index) => {
          let extraProps = {
            key: index,
            style: this.getStyles('item', index)
          };
          return React.cloneElement(item, extraProps);
        });
      }

      // Add a morph shape for animations that use SVG.
      if (styles.svg) {
        svg = (
          <div className="bm-morph-shape" style={ this.getStyles('morphShape') }>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
              <path d={ styles.svg.pathInitial }/>
            </svg>
          </div>
        );
      }

      if (!this.props.noOverlay) {
        overlay = <div className="bm-overlay" onClick={ this.toggleMenu } style={ this.getStyles('overlay') }></div>;
      }

      return (
        <div>
          { overlay }
          <div id={ this.props.id } className={ "bm-menu-wrap" } style={ this.getStyles('menuWrap') }>
            { svg }
            <div className="bm-menu" style={ this.getStyles('menu') } >
              <nav className="bm-item-list" style={ this.getStyles('itemList') }>
                { items }
              </nav>
            </div>
            <div style={ this.getStyles('closeButton') }>
              <CrossIcon onClick={ this.toggleMenu } styles={ this.props.styles } customIcon={ this.props.customCrossIcon } />
            </div>
          </div>
          <BurgerIcon onClick={ this.toggleMenu } styles={ this.props.styles } customIcon={ this.props.customBurgerIcon } />
        </div>
      );
    }
  }));
};
