'use strict';

import React from 'react';
import Radium from 'radium';

const BurgerIcon = Radium(React.createClass({

  propTypes: {
    customIcon: React.PropTypes.element,
    styles: React.PropTypes.object
  },

  getLineStyle(index) {
    return {
      position: 'absolute',
      height: '20%',
      left: 0,
      right: 0,
      top: 20 * (index * 2) + '%',
      opacity: this.state.hover ? 0.6 : 1
    };
  },

  handleHover() {
    this.setState({hover: !this.state.hover});
  },

  getInitialState() {
    return {hover: false};
  },

  getDefaultProps() {
    return {
      styles: {}
    };
  },

  render() {
    let icon;
    let buttonStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      border: 'none',
      textIndent: -9999,
      background: 'transparent',
      outline: 'none'
    };

    if (this.props.customIcon) {
      let extraProps = {
        className: 'bm-icon',
        style: [{width: '100%', height: '100%'}, this.props.styles.bmIcon]
      };
      icon = React.cloneElement(this.props.customIcon, extraProps);
    } else {
      icon = (
        <span>
          <span className="bm-burger-bars" style={[this.getLineStyle(0), this.props.styles.bmBurgerBars]}></span>
          <span className="bm-burger-bars" style={[this.getLineStyle(1), this.props.styles.bmBurgerBars]}></span>
          <span className="bm-burger-bars" style={[this.getLineStyle(2), this.props.styles.bmBurgerBars]}></span>
        </span>
      );
    }

    return (
      <div className="bm-burger-button" style={[{zIndex: 1}, this.props.styles.bmBurgerButton]}>
        {icon}
        <button onClick={this.props.onClick}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
          style={buttonStyle}>
          Open Menu
        </button>
      </div>
    );
  }
}));

export default BurgerIcon;
