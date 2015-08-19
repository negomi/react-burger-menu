'use strict';

import React from 'react';
import appendVendorPrefix from 'react-kit/appendVendorPrefix';

let CrossIcon = React.createClass({

  getCrossStyle(type) {
    return appendVendorPrefix({
      position: 'absolute',
      width: 3,
      height: 14,
      top: 14,
      right: 18,
      cursor: 'pointer',
      transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)',
      zIndex: 1
    });
  },

  render() {
    var buttonStyle = appendVendorPrefix({
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
    });

    return (
      <div>
        <span className="bm-cross" style={ this.getCrossStyle('before') }></span>
        <span className="bm-cross" style={ this.getCrossStyle('after') }></span>
        <button onClick={ this.props.onClick } style={ buttonStyle }>Close Menu</button>
      </div>
    );
  }
});

export default CrossIcon;
