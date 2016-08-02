'use strict';

import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width, right) {
    var transform = isOpen ? '' : right ? `translate3d(-${width}px, 0, 0)` : `translate3d(${width}px, 0, 0)`;
    return {
      transform: transform,
      WebkitTransform: transform,
      transition: 'all 0.5s'
    };
  },

  outerContainer(isOpen) {
    return {
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

export default menuFactory(styles);
