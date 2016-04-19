'use strict';

import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width, right) {
  	if (!(typeof width == "string" && width.includes('%'))) {
		  width = width + 'px';
	  }
	  
    return {
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
