'use strict';

import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width, right, breakpoint) {
	if(window.innerWidth < breakpoint) {
		return {
			transform: isOpen ? '' : right ? `translate3d(-${width}px, 0, 0)` : `translate3d(${width}px, 0, 0)`,
			transition: 'transform 0.5s'
		};
	}
    return {
	  width: isOpen ? '100%' : `calc(100% - ${width}px)`,
	  position: 'absolute',
	  right: right ? 'initial' : '0',
	  left: right ? '0' : 'initial',
	  top: '0',
      transition: 'width 0.5s'
    };
  },

  outerContainer(isOpen) {
    return {
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

export default menuFactory(styles);
