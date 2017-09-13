'use strict';

import menuFactory from '../menuFactory';

const styles = {

  menuWrap(isOpen, width, right, top, bottom) {
    let transform = right ? `translate3d(${width}, 0, 0)` : `translate3d(-${width}, 0, 0)`;
    if (top)
      transform = `translate3d(0, -${width}, 0)`;
    if (bottom)
      transform = `translate3d(0, ${width}, 0)`;

    return {
      MozTransform: isOpen ? '' : transform,
      MsTransform: isOpen ? '' : transform,
      OTransform: isOpen ? '' : transform,
      WebkitTransform: isOpen ? '' : transform,
      transform: isOpen ? '' : transform,
      transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
    };
  },

  item(isOpen, width, right, top, bottom, nthChild) {
    let transform = 'translate3d(0, ' + nthChild * 500 + 'px, 0)';
    if (top)
      transform = 'translate3d(0, ' + nthChild * 500 + 'px, 0)';
    if (bottom)
      transform = 'translate3d(0, ' + nthChild * 500 + 'px, 0)';

    return {
      MozTransform: isOpen ? '' : transform,
      MsTransform: isOpen ? '' : transform,
      OTransform: isOpen ? '' : transform,
      WebkitTransform: isOpen ? '' : transform,
      transform: isOpen ? '' : transform,
      transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)'
    };
  }
};

export default menuFactory(styles);
