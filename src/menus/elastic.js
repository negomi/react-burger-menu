'use strict';

import Snap from '../snapsvgImporter';
import menuFactory from '../menuFactory';

const styles = {

  svg: {
    lib: Snap,
    pathInitial: 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
    pathOpen: 'M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z',
    animate(path) {
      path.animate({ path: this.pathOpen }, 400, window.mina.easeinout);
    }
  },

  morphShape(isOpen, width, right) {
    return {
      position: 'fixed',
      width: 120,
      height: '100%',
      right: right ? 'inherit' : 0,
      left: right ? 0 : 'inherit',
      transform: right ? 'rotateY(180deg)' : ''
    };
  },

  menuWrap(isOpen, width, right) {
    return {
      transform: isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)',
      transition: 'all 0.3s'
    };
  },

  menu(isOpen, width, right) {
    return {
      position: 'fixed',
      right: right ? 0 : 'inherit',
      width: 'calc(100% - 120px)',
      whiteSpace: 'nowrap',
      boxSizing: 'border-box'
    };
  },

  itemList(isOpen, width, right) {
    if (right) {
      return {
        position: 'relative',
        left: '-110px'
      };
    }
  },

  pageWrap(isOpen, width, right) {
    return {
      transform: isOpen ? '' : right ? 'translate3d(-100px, 0, 0)' : 'translate3d(100px, 0, 0)',
      transition: isOpen ? 'all 0.3s' : 'all 0.3s 0.1s'
    };
  },

  outerContainer(isOpen) {
    return {
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

export default menuFactory(styles);
