'use strict';

import React from 'react';
import Radium from 'radium';
import baseStyles from './baseStyles';
import BurgerIcon from './BurgerIcon';
import CrossIcon from './CrossIcon';

export default (styles) => {

  return Radium(React.createClass({

    propTypes: {
      id: React.PropTypes.string,
	  isOpen: React.PropTypes.object,
      outerContainerId: React.PropTypes.string,
      pageWrapId: React.PropTypes.string,
      right: React.PropTypes.bool,
      width: React.PropTypes.number
    },

    toggleMenu() {
      // Order important: handle wrappers before setting sidebar state.
      this.applyWrapperStyles();

      this.toggleIsOpen();
    },
	  
	toggleIsOpen() {
	  if (this.props.isOpen && (typeof this.props.isOpen.value === 'boolean') && (typeof this.props.isOpen.requestChange === 'function')) {
		this.props.isOpen.requestChange(!this.props.isOpen.value);
	  } else {
		this.setState({
	      isOpen: !this.state.isOpen
		});
	  }
	},
	  
	getIsOpen() {
	  if (this.props.isOpen && (typeof this.props.isOpen.value === 'boolean')) {
	    return this.props.isOpen.value;
	  }
	  return this.state.isOpen;
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
      let wrapper = document.getElementById(id);

      if (!wrapper) {
        console.error("Element with ID '" + id + "' not found");
        return;
      }

      wrapperStyles = wrapperStyles(this.getIsOpen(), this.props.width, this.props.right);

      for (let prop in wrapperStyles) {
        if (wrapperStyles.hasOwnProperty(prop)) {
          wrapper.style[prop] = set ? wrapperStyles[prop] : '';
        }
      }
    },

    listenForClose(e) {
      e = e || window.event;

      if (this.getIsOpen() && (e.key === 'Escape' || e.keyCode === 27)) {
        this.toggleMenu();
      }
    },

    getDefaultProps() {
      return {
        id: '',
        outerContainerId: '',
        pageWrapId: '',
        right: false,
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

        // TODO: Should be able to use refs or ReactDOM.findDOMNode(this) here.
        let morphShape = document.getElementsByClassName('bm-morph-shape')[0];
        let s = snap(morphShape);
        let path = s.select('path');

        if (this.getIsOpen()) {
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

    render() {
      let items, svg;
      let menuWrapStyles = [baseStyles.menuWrap(this.getIsOpen(), this.props.width, this.props.right)];
      let menuStyles = [baseStyles.menu(this.getIsOpen())];
      let itemListStyles = [baseStyles.itemList()];
      let closeButtonStyles;

      if (styles.menuWrap) {
        menuWrapStyles.push(styles.menuWrap(this.getIsOpen(), this.props.width, this.props.right));
      }

      if (styles.menu) {
        menuStyles.push(styles.menu(this.getIsOpen(), this.props.width, this.props.right));
      }

      if (styles.itemList) {
        itemListStyles.push(styles.itemList(this.props.right));
      }

      if (styles.closeButton) {
        closeButtonStyles = styles.closeButton(this.getIsOpen(), this.props.width, this.props.right);
      }

      // Add styles to user-defined menu items.
      if (this.props.children) {
        items = React.Children.map(this.props.children, (item, index) => {
          let itemStyles = [baseStyles.item(this.getIsOpen())];

          if (styles.item) {
            itemStyles.push(styles.item(this.getIsOpen(), this.props.width, index + 1, this.props.right));
          }

          let extraProps = {
            key: index,
            style: itemStyles
          };

          return React.cloneElement(item, extraProps);
        });
      }

      // Add a morph shape for animations that use SVG.
      if (styles.svg) {
        svg = (
          <div className="bm-morph-shape" style={ styles.morphShape(this.props.right) }>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
              <path d={ styles.svg.pathInitial }/>
            </svg>
          </div>
        );
      }

      return (
        <div>
          <div className="bm-overlay" onClick={ this.toggleMenu } style={ baseStyles.overlay(this.getIsOpen()) }></div>
          <div id={ this.props.id } className={ "bm-menu-wrap" } style={ menuWrapStyles }>
            { svg }
            <div className="bm-menu" style={ menuStyles } >
              <nav className="bm-item-list" style={ itemListStyles }>
                { items }
              </nav>
            </div>
            <div style={ closeButtonStyles }>
              <CrossIcon onClick={ this.toggleMenu } />
            </div>
          </div>
          <BurgerIcon onClick={ this.toggleMenu } />
        </div>
      );
    }
  }));
};
