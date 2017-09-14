'use strict';

import menuFactory from '../menuFactory';

const styles = {
  pageWrap(isOpen, width, right, top, bottom) {
    let transform = right ? 'translate3d(-100px, 0, -600px) rotateY(20deg)' : 'translate3d(100px, 0, -600px) rotateY(-20deg)';
    if (top)
      transform = `translate3d(0, 100px, -600px) rotateX(20deg)`;
    if (bottom)
      transform = `translate3d(0, -100px, -600px) rotateX(-20deg)`;

    return {
      MozTransform: isOpen ? '' : transform,
      MsTransform: isOpen ? '' : transform,
      OTransform: isOpen ? '' : transform,
      WebkitTransform: isOpen ? '' : transform,
      transform: isOpen ? '' : transform,
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
