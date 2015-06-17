var React = require('react');
var appendVendorPrefix = require('react-kit/appendVendorPrefix');

var BurgerIcon = React.createClass({

  getLineStyle(index) {
    return appendVendorPrefix({
      position: 'fixed',
      height: 6,
      width: 36,
      left: 36,
      top: 36 + 12 * index,
      zIndex: 1,
      opacity: this.state.hover ? 0.6 : 1
    });
  },

  handleHover() {
    this.setState({ hover: !this.state.hover });
  },

  getInitialState() {
    return { hover: false };
  },

  render() {
    var buttonStyle = appendVendorPrefix({
      position: 'fixed',
      zIndex: 1,
      margin: 24,
      padding: 0,
      width: 60,
      height: 54,
      border: 'none',
      textIndent: 60,
      fontSize: 24,
      color: 'transparent',
      background: 'transparent',
      outline: 'none'
    });

    return (
      <div>
        <span className="bm-burger-icon" style={ this.getLineStyle(0) }></span>
        <span className="bm-burger-icon" style={ this.getLineStyle(1) }></span>
        <span className="bm-burger-icon" style={ this.getLineStyle(2) }></span>
        <button onClick={ this.props.onClick }
          onMouseEnter={ this.handleHover }
          onMouseLeave={ this.handleHover }
          style={ buttonStyle }>
          Open Menu
        </button>
      </div>
    );
  }
});



var CrossIcon = React.createClass({

  getCrossStyle(type) {
    return appendVendorPrefix({
      position: 'absolute',
      width: 3,
      height: 14,
      top: 14,
      right: 18,
      cursor: 'pointer',
      transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)'
    });
  },

  render() {
    var buttonStyle = appendVendorPrefix({
      width: 14,
      height: 14,
      position: 'absolute',
      right: 13,
      top: 14,
      padding: 0,
      overflow: 'hidden',
      textIndent: 14,
      fontSize: 14,
      border: 'none',
      background: 'transparent',
      color: 'transparent',
      outline: 'none'
    });

    return (
      <div>
        <span className="bm-cross" style={ this.getCrossStyle('before') }></span>
        <span className="bm-cross" style={ this.getCrossStyle('after') }></span>
        <button onClick={ this.props.onClick } style={ buttonStyle }>Close Menu</button>
      </div>
    );
  }
});



export default (styles) => {

  return React.createClass({

    toggleMenu() {
      this.setState({ isOpen: !this.state.isOpen })
    },

    listenForClose(e) {
      if (e.target.id === 'bm-overlay' || e.key === 'Escape' || e.keyCode === 27) {
        this.setState({ isOpen: false })
      }
    },

    getInitialState() {
      return { isOpen: false }
    },

    componentDidMount() {
      window.addEventListener("click", this.listenForClose, true);
      window.addEventListener("keydown", this.listenForClose, true);
    },

    componentWillUnmount() {
      window.removeEventListener("click", this.listenForClose, true);
      window.removeEventListener("keydown", this.listenForClose, true);
    },

    render() {
      var items = this.props.config.items.map((item, index) => {
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
          <div className="bm-menu" style={ styles.menu(this.state.isOpen) }>
            <nav className="bm-item-list" style={ { height: '100%' } }>
              { items }
            </nav>
            <CrossIcon onClick={ this.toggleMenu } />
          </div>
          <BurgerIcon onClick={ this.toggleMenu } />
        </div>
      );
    }
  });
}
