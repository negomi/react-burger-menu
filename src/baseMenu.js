import React from 'react';
import Radium from 'radium';
import BurgerIcon from './BurgerIcon';
import CrossIcon from './CrossIcon';

import baseStyles from './baseStyles';

const baseMenu = (styles) => {
  return {
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
        this.handleExternalWrapper('pageWrap', this.props.pageWrapId, styles.pageWrap, true);
      }

      if (styles.outerContainer && this.props.outerContainerId) {
        this.handleExternalWrapper('outerContainer', this.props.outerContainerId, styles.outerContainer, true);
      }
    },

    // Removes component-specific styles applied to external wrapper elements.
    clearWrapperStyles() {
      if (styles.pageWrap && this.props.pageWrapId) {
        this.handleExternalWrapper('pageWrap', this.props.pageWrapId, styles.pageWrap, false);
      }

      if (styles.outerContainer && this.props.outerContainerId) {
        this.handleExternalWrapper('outerContainer', this.props.outerContainerId, styles.outerContainer, false);
      }
    },

    // Sets or unsets styles on DOM elements outside the menu component.
    // This is necessary for correct page interaction with some of the menus.
    // Throws and returns if the required external elements don't exist,
    // which means any external page animations won't be applied.
    handleExternalWrapper(el, id, wrapperStyles, set) {
      let html = document.querySelector('html');
      let body = document.querySelector('body');
      let wrapper = document.getElementById(id);

      if (!wrapper) {
        console.error("Element with ID '" + id + "' not found");
        return;
      }

      wrapperStyles = wrapperStyles(this.state.isOpen, this.props.width, this.props.right);

      let customStyles = this.getStyles(el);

      customStyles.forEach((styles) => {
        for (let prop in styles) {
          if (styles.hasOwnProperty(prop)) {
            wrapperStyles[prop] = styles[prop];
          }
        }
      });

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

    componentWillReceiveProps(nextProps) {
      if (typeof nextProps.isOpen !== 'undefined' && nextProps.isOpen !== this.state.isOpen) {
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
  }
}

export default baseMenu
