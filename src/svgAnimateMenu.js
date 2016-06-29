import ReactDOM from 'react-dom'
import baseMenu from './baseMenu'

const svgAnimateMenu = (styles) => {
  let menu = baseMenu(styles)

  menu.componentDidUpdate = function() {
    if (styles.svg && this.isMounted()) {
      // Snap.svg workaround for Webpack using imports-loader (https://github.com/webpack/imports-loader).
      let snap;
      try {
        snap = require('imports?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js');
      } catch(e) {
        snap = require('snapsvg');
      }

      let morphShape = ReactDOM.findDOMNode(this, 'bm-morph-shape');
      let s = snap(morphShape);
      let path = s.select('path');

      if (this.state.isOpen) {
        // Animate SVG path.
        styles.svg.animate(path);
      } else {
        // Reset path (timeout ensures animation happens off screen).
        setTimeout(() => {
          path.attr('d', styles.svg.pathInitial);
        }, 300);
      }
    }
  }

  return menu
}

export default svgAnimateMenu
