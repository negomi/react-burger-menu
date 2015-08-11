import React from 'react';
import snap from 'snapsvg';
import BurgerIcon from './BurgerIcon';
import CrossIcon from './CrossIcon';

export default (styles) => {

  return React.createClass({

    propTypes: {
      children: React.PropTypes.array,
      id: React.PropTypes.string,
      outerContainerId: React.PropTypes.string,
      pageWrapId: React.PropTypes.string
    },

    toggleMenu() {
      // Order important: handle wrappers before setting sidebar state.
      this.applyWrapperStyles();

      this.setState({ isOpen: !this.state.isOpen });
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

      wrapperStyles = wrapperStyles(this.state.isOpen);

      for (let prop in wrapperStyles) {
        if (wrapperStyles.hasOwnProperty(prop)) {
          wrapper.style[prop] = set ? wrapperStyles[prop] : '';
        }
      }
    },

    listenForClose(e) {
      if (this.state.isOpen && (e.target.id === 'bm-overlay' || e.key === 'Escape' || e.keyCode === 27)) {
        this.toggleMenu();
      }
    },

    getDefaultProps() {
      return {
        id: '',
        outerContainerId: '',
        pageWrapId: ''
      };
    },

    getInitialState() {
      return { isOpen: false };
    },

    componentWillMount() {
      if (!styles || !Object.keys(styles).length) {
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
      window.addEventListener('click', this.listenForClose);
      window.addEventListener('keydown', this.listenForClose);
    },

    componentWillUnmount() {
      window.removeEventListener('click', this.listenForClose);
      window.removeEventListener('keydown', this.listenForClose);

      this.clearWrapperStyles();
    },

    componentDidUpdate() {
      if (styles.svg) {
        let s = snap('.bm-morph-shape');
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

    render() {
      let items, svg;

      // Add animation styles to user-defined menu items.
      if (this.props.children) {
        let extraProps;

        if (this.props.children.length) {
          items = this.props.children.map((item, index) => {
            extraProps = {
              key: index,
              style: styles.item(this.state.isOpen, index + 1)
            };

            return React.cloneElement(item, extraProps);
          });
        } else {
          extraProps = {
            style: styles.item(this.state.isOpen, 1)
          };

          items = React.cloneElement(this.props.children, extraProps);
        }
      }

      // Add a morph shape for animations that use SVG.
      if (styles.svg) {
        svg = (
          <div className="bm-morph-shape" style={ styles.morphShape() }>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
              <path d={ styles.svg.pathInitial }/>
            </svg>
          </div>
        );
      }

      return (
        <div>
          <div id="bm-overlay" style={ styles.overlay(this.state.isOpen) }></div>
          <div id={ this.props.id } style={ styles.menuWrap(this.state.isOpen) }>
            { svg }
            <div className="bm-menu" style={ styles.menu(this.state.isOpen) } >
              <nav className="bm-item-list" style={ { height: '100%' } }>
                { items }
              </nav>
            </div>
            <div style={ styles.closeButton ? styles.closeButton(this.state.isOpen) : {} }>
              <CrossIcon onClick={ this.toggleMenu } />
            </div>
          </div>
          <BurgerIcon onClick={ this.toggleMenu } />
        </div>
      );
    }
  });
};
