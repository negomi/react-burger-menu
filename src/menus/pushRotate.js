'use strict';

import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width, right, top, bottom) {
    let transform = right ? `translate3d(-${width}, 0, 0) rotateY(15deg)` : `translate3d(${width}, 0, 0) rotateY(-15deg)`;
    if (top)
      transform = `translate3d(0, ${width}, 0) rotateX(15deg)`;
    if (bottom)
      transform = `translate3d(0, -${width}, 0) rotateX(-15deg)`;

    return {
      MozTransform: isOpen ? '' : transform,
      MsTransform: isOpen ? '' : transform,
      OTransform: isOpen ? '' : transform,
      WebkitTransform: isOpen ? '' : transform,
      transform: isOpen ? '' : transform,
      transformOrigin: right ? '100% 50%' : bottom ? '50% 100%' : top ? '50% 0%' : '0% 50%',
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
