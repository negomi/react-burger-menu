var React = require('react');
var BurgerMenu = require('react-burger-menu');

var Demo = React.createClass({

  changeMenu(menu) {
    this.setState({
      currentMenu: menu,
      menuItems: this.props.menus[menu].items,
      openInstantly: true
    })
  },

  getInitialState() {
    return {
      currentMenu: 'sideSlide',
      menuItems: this.props.menus['sideSlide'].items,
      openInstantly: false
    }
  },

  render() {
    var Menu = BurgerMenu[this.state.currentMenu];

    var buttons = Object.keys(this.props.menus).map((menu) => {
      return (
        <a key={ menu }
          className={ menu === this.state.currentMenu ? 'current-demo' : '' }
          onClick={ this.changeMenu.bind(this, menu) }>
          { this.props.menus[menu].text }
        </a>
      )
    });

    return (
      <div style={ { height: '100%' } }>
        <Menu items={ this.state.menuItems } pageWrapId={ "content-wrap" } openInstantly={ this.state.openInstantly } />
        <main id="content-wrap">
          <h1>react-burger-menu</h1>
          <h2>An off-canvas menu React component with effects and styles using CSS transitions and SVG path animations, inspired by <a href="https://github.com/codrops/OffCanvasMenuEffects">Codrops</a>.</h2>
          <nav className="demo-buttons">
            { buttons }
          </nav>
          <a href="https://github.com/negomi/react-burger-menu">View the project on GitHub</a>
        </main>
      </div>
    );
  }
});

var menuItems = [
  { content: '<i class="fa fa-fw fa-star-o"></i><span>Favorites</span>' },
  { content: '<i class="fa fa-fw fa-bell-o"></i><span>Alerts</span>' },
  { content: '<i class="fa fa-fw fa-envelope-o"></i><span>Messages</span>' },
  { content: '<i class="fa fa-fw fa-comment-o"></i><span>Comments</span>' },
  { content: '<i class="fa fa-fw fa-bar-chart-o"></i><span>Analytics</span>' },
  { content: '<i class="fa fa-fw fa-newspaper-o"></i><span>Reading List</span>' }
];

var menus = {
  sideSlide: { text: 'Side Slide', items: menuItems },
  elastic: { text: 'Elastic', items: menuItems },
  bubble: { text: 'Bubble', items: menuItems },
  slideOnTop: { text: 'Slide On Top', items: menuItems },
  push: { text: 'Push', items: menuItems }
};

React.render(<Demo menus={ menus }/>, document.body);
