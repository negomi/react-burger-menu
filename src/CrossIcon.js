'use strict';

import React from 'react';
import Radium from 'radium';

let CrossIcon = Radium(React.createClass({

  propTypes: {
    styles: React.PropTypes.object
  },

  getCrossStyle(type) {
    return {
      position: 'absolute',
      width: 3,
      height: 14,
      top: 14,
      right: 18,
      cursor: 'pointer',
      transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)',
      zIndex: 1
    };
  },

  getDefaultProps() {
    return {
      styles: {}
    };
  },

  render() {
    var buttonStyle = {
      width: 14,
      height: 14,
      position: 'absolute',
      right: 13,
      top: 14,
      padding: 0,
      overflow: 'hidden',
      textIndent: 14,
      fontSize: 14,
      border: 'none',
      background: 'transparent',
      color: 'transparent',
      outline: 'none',
      zIndex: 1
    };

    return (
      <div>
        <span className="bm-cross" style={ [this.getCrossStyle('before'), this.props.styles['bm-cross']] }></span>
        <span className="bm-cross" style={ [this.getCrossStyle('after'), this.props.styles['bm-cross']] }></span>
        <button onClick={ this.props.onClick } style={ buttonStyle }>Close Menu</button>
      </div>
    );
  }
}));

export default CrossIcon;
