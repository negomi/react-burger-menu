'use strict';

import React from 'react';
import Radium from 'radium';
import svgAnimateMenu from './svgAnimateMenu'

export default (styles) => {
  return Radium(React.createClass(svgAnimateMenu(styles)));
};
