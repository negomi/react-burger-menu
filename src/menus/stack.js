'use strict';

import menuFactory from '../menuFactory';

const styles = {

  menuWrap(isOpen, width, right) {
    var transform = isOpen ? '' : right ? `translate3d(${width}px, 0, 0)` : `translate3d(-${width}px, 0, 0)`;
    width += 20;
    return {
      transform: transform,
      WebkitTransform: transform,
      transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
    };
  },

  item(isOpen, width, right, nthChild) {
    var transform = isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)';
    return {
      transform: transform,
      WebkitTransform: transform,
      transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)'
    };
  }
};

export default menuFactory(styles);
