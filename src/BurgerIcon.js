'use strict';

import React from 'react';
import Radium from 'radium';

let BurgerIcon = Radium(React.createClass({

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
    this.setState({ hover: !this.state.hover });
  },

  getInitialState() {
    return { hover: false };
  },

  render() {
    var buttonStyle = {
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
    };

    return (
      <div className="bm-burger-button" style={ {zIndex: 1} }>
        <span className="bm-burger-bars" style={ this.getLineStyle(0) }></span>
        <span className="bm-burger-bars" style={ this.getLineStyle(1) }></span>
        <span className="bm-burger-bars" style={ this.getLineStyle(2) }></span>
        <button onClick={ this.props.onClick }
          onMouseEnter={ this.handleHover }
          onMouseLeave={ this.handleHover }
          style={ buttonStyle }>
          Open Menu
        </button>
      </div>
    );
  }
}));

export default BurgerIcon;
