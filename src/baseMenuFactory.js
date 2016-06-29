'use strict';

import React from 'react';
import Radium from 'radium';
import baseMenu from './baseMenu'

export default (styles) => {
  return Radium(React.createClass(baseMenu(styles)));
};
