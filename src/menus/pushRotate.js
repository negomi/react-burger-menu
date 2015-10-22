'use strict';

import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width) {
    return {
      transform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}px, 0, 0) rotateY(-15deg)`,
      transformOrigin: '0% 50%',
      transformStyle: 'preserve-3d',
      transition: 'all 0.5s'
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
