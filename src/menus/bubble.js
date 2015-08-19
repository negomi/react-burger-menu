'use strict';

import menuFactory from '../menuFactory';

let styles = {

  svg: {
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

      nextStep(pos);
    }
  },

  morphShape() {
    return {
      position: 'fixed',
      width: '100%',
      height: '100%',
      right: 0
    };
  },

  menuWrap(isOpen) {
    return {
      position: 'fixed',
      zIndex: 2,
      width: 300,
      height: '100%',
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-300px, 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-300px, 0, 0)',
      WebkitTransition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s',
      transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
    };
  },

  menu(isOpen) {
    return {
      position: 'fixed',
      height: '100%',
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-160px, 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-160px, 0, 0)',
      WebkitTransition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    };
  },

  item(isOpen) {
    return {
      display: 'block',
      outline: 'none',
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-160px, 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-160px, 0, 0)',
      WebkitTransition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    };
  },

  closeButton(isOpen) {
    return {
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-160px, 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-160px, 0, 0)',
      WebkitTransition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
      opacity: isOpen ? 1 : 0
    };
  },

  overlay(isOpen) {
    return {
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
      WebkitTransition: isOpen ? 'opacity 0.4s' : 'opacity 0.4s, transform 0s 0.4s',
      transition: isOpen ? 'opacity 0.4s' : 'opacity 0.4s, transform 0s 0.4s'
    };
  }
};

export default menuFactory(styles);
