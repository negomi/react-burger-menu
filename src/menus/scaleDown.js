'use strict';

import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width) {
    return {
      transform: isOpen ? '' : `translate3d(0, 0, -${width}px)`,
      transformOrigin: '100%',
      transformStyle: 'preserve-3d',
      transition: 'all 0.5s'
    };
  },

  outerContainer() {
    return {
      perspective: '1500px'
    };
  }
};

export default menuFactory(styles);
