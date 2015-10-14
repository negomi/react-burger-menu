'use strict';

import React from 'react';
import appendVendorPrefix from 'react-kit/appendVendorPrefix';

let BurgerIcon = React.createClass({

  getLineStyle(index) {
    return appendVendorPrefix({
      position: 'absolute',
      height: "15%",
      left: 0,
      right: 0,
      top: (33 * index) + "%",
      opacity: this.state.hover ? 0.6 : 1
    });
  },

  handleHover() {
    this.setState({ hover: !this.state.hover });
  },

  getInitialState() {
    return { hover: false };
  },

  render() {
    var buttonStyle = appendVendorPrefix({
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      fontSize: 14,
      color: 'transparent',
      background: 'transparent',
      outline: 'none'
    });

    var containerStyle = appendVendorPrefix({
      position: "absolute",
      left: "10%",
      right: "10%",
      top: "10%",
      bottom : "10%",
      margin: 0,
      padding: 0
    });

    return (
      <div className="bm-burger-button">
        <div className="bm-burger-icon-container" style={ containerStyle }>
          <span className="bm-burger-icon" style={ this.getLineStyle(0) }></span>
          <span className="bm-burger-icon" style={ this.getLineStyle(1) }></span>
          <span className="bm-burger-icon" style={ this.getLineStyle(2) }></span>
        </div>
        <button onClick={ this.props.onClick }
          onMouseEnter={ this.handleHover }
          onMouseLeave={ this.handleHover }
          style={ buttonStyle }>
          Open Menu
        </button>
      </div>
    );
  }
});

export default BurgerIcon;
