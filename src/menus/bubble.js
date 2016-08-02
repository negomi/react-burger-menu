'use strict';

import Snap from '../snapsvgImporter';
import menuFactory from '../menuFactory';

const styles = {

  svg: {
    lib: Snap,
    pathInitial: 'M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z',
    pathOpen: 'M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z',
    animate(path) {
      let pos = 0;
      let steps = this.pathOpen.split(';');
      let stepsTotal = steps.length;
      let mina = window.mina;

      let nextStep = function() {
        if (pos > stepsTotal - 1) return;

        path.animate({ path: steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, () => {
          nextStep();
        });

        pos++;
      };

      nextStep();
    }
  },

  morphShape(isOpen, width, right) {
    var transform = right ? 'rotateY(180deg)' : 'rotateY(0deg)';
    return {
      position: 'fixed',
      width: '100%',
      height: '100%',
      right: right ? 'inherit' : 0,
      left: right ? 0 : 'inherit',
      transform: transform,
      WebkitTransform: transform,
    };
  },

  menuWrap(isOpen, width, right) {
    var transform = isOpen ? 'translate3d(0, 0, 0)' : right ? 'translate3d(100%, 0, 0)' : 'translate3d(-100%, 0, 0)';
    return {
      transform: transform,
      WebkitTransform: transform,
      transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
    };
  },

  menu(isOpen, width, right) {
    var transform = isOpen ? '' : right ? `translate3d(${width}px, 0, 0)` : `translate3d(-${width}px, 0, 0)`;
    width -= 140;
    return {
      position: 'fixed',
      transform: transform,
      WebkitTransform: transform,
      transition: isOpen ? 'opacity 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    };
  },

  item(isOpen, width, right, nthChild) {
    var transform = isOpen ? 'translate3d(0, 0, 0)' : right ? `translate3d(${width}px, 0, 0)` : `translate3d(-${width}px, 0, 0)`;
    width -= 140;
    return {
      transform: transform,
      WebkitTransform: transform,
      transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    };
  },

  closeButton(isOpen, width, right) {
    var transform = isOpen ? 'translate3d(0, 0, 0)' : right ? `translate3d(${width}px, 0, 0)` : `translate3d(-${width}px, 0, 0)`;
    width -= 140;
    return {
      transform: transform,
      WebkitTransform: transform,
      transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    };
  }
};

export default menuFactory(styles);
