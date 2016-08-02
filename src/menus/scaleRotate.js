'use strict';

import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width, right) {
    var transform = isOpen ? '' : right ? 'translate3d(-100px, 0, -600px) rotateY(20deg)' : 'translate3d(100px, 0, -600px) rotateY(-20deg)';
    return {
      transform: transform,
      WebkitTransform: transform,
      transformStyle: 'preserve-3d',
      transition: 'all 0.5s',
      overflow: isOpen ? '' : 'hidden'
    };
  },

  outerContainer(isOpen) {
    return {
      perspective: '1500px',
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

export default menuFactory(styles);
