'use strict';

import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width, right, top, bottom) {
    let transform = right ? `translate3d(-${width}, 0, 0)` : `translate3d(${width}, 0, 0)`;
    if (top)
      transform = `translate3d(0, ${width}, 0)`;
    if (bottom)
      transform = `translate3d(0, -${width}, 0)`;

    return {
      MozTransform: isOpen ? '' : transform,
      MsTransform: isOpen ? '' : transform,
      OTransform: isOpen ? '' : transform,
      WebkitTransform: isOpen ? '' : transform,
      transform: isOpen ? '' : transform,
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
