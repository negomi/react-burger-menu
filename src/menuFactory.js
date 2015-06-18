var React = require('react');
var Snap = require('snapsvg');
var appendVendorPrefix = require('react-kit/appendVendorPrefix');
var BurgerIcon = require('./BurgerIcon');
var CrossIcon = require('./CrossIcon');

export default (styles) => {

  return React.createClass({

    toggleMenu() {
      this.setState({ isOpen: !this.state.isOpen })
    },

    listenForClose(e) {
      if (e.target.id === 'bm-overlay' || e.key === 'Escape' || e.keyCode === 27) {
        this.setState({ isOpen: false });
      }
    },

    getInitialState() {
      return { isOpen: false }
    },

    componentDidMount() {
      window.addEventListener("click", this.listenForClose);
      window.addEventListener("keydown", this.listenForClose);
    },

    componentWillUnmount() {
      window.removeEventListener("click", this.listenForClose);
      window.removeEventListener("keydown", this.listenForClose);
    },

    componentDidUpdate() {
      var s, path;

      if (styles.svg) {
        s = Snap('.bm-morph-shape');
        path = s.select('path');

        if (this.state.isOpen) {
          // Animate SVG path.
          path.animate({ path: styles.svg.pathOpen }, 400, mina.easeinout);
        } else {
          // Reset path (timeout ensures animation happens off screen).
          setTimeout(() => {
            path.attr('d', styles.svg.pathInitial);
          }, 300)
        }
      }
    },

    render() {
      var svg, items;

      if (styles.svg) {
        svg = (
          <div className="bm-morph-shape" style={ styles.morphShape() }>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
              <path d={ styles.svg.pathInitial }/>
            </svg>
          </div>
        );
      }

      items = this.props.config.items.map((item, index) => {
        return (
          <a key={ index }
            href={ item.href || '' }
            style={ styles.item(this.state.isOpen, index + 1) }
            dangerouslySetInnerHTML={ { __html: item.content } }>
          </a>
        )
      }.bind(this));

      return (
        <div>
          <div id="bm-overlay" style={ styles.overlay(this.state.isOpen) }></div>
          <div className="bm-menu-wrap" style={ styles.menuWrap(this.state.isOpen) }>
            <div className="bm-menu" style={ styles.menu() } >
              <nav className="bm-item-list" style={ { height: '100%' } }>
                { items }
              </nav>
            </div>
            <CrossIcon onClick={ this.toggleMenu } />
            { svg }
          </div>
          <BurgerIcon onClick={ this.toggleMenu } />
        </div>
      );
    }
  });
}
