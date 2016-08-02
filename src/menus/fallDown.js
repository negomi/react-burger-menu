'use strict';

import menuFactory from '../menuFactory';

const styles = {

  menuWrap(isOpen) {
    var transform = isOpen ? '' : 'translate3d(0, -100%, 0)';
    return {
      transform: transform,
      WebkitTransform: transform,
      transition: 'all 0.5s ease-in-out'
    };
  },

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
      perspective: '1500px',
      perspectiveOrigin: '0% 50%',
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

export default menuFactory(styles);
