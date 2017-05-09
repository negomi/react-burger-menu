'use strict';

import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width, right) {
    return {
      MozTransform: isOpen ? '' : right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`,
      MsTransform: isOpen ? '' : right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`,
      OTransform: isOpen ? '' : right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`,
      WebkitTransform: isOpen ? '' : right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`,
      transform: isOpen ? '' : right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`,
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
