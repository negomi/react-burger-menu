var React = require('react');
var BurgerMenu = require('react-burger-menu');

var Demo = React.createClass({

  changeMenu(menu) {
    this.setState({
      currentMenu: menu,
      menuItems: this.props.menus[menu].items
    })
  },

  getInitialState() {
    return {
      currentMenu: 'simpleSlide',
      menuItems: this.props.menus['simpleSlide'].items
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
      <div id="outer-container" style={ { height: '100%' } }>
        <Menu items={ this.state.menuItems } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
        <main id="page-wrap">
          <h1><a href="https://github.com/negomi/react-burger-menu">react-burger-menu</a></h1>
          <h2>An off-canvas sidebar React component with effects and styles using CSS transforms and transitions and SVG path animations.</h2>
          <nav className="demo-buttons">
            { buttons }
          </nav>
          Inspired by <a href="https://github.com/codrops/OffCanvasMenuEffects">Off-Canvas Menu Effects</a> and <a href="https://github.com/codrops/SidebarTransitions">Sidebar Transitions</a> by Codrops
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
  simpleSlide: { text: 'Simple Slide', items: menuItems },
  stack: { text: 'Stack', items: menuItems },
  elastic: { text: 'Elastic', items: menuItems },
  bubble: { text: 'Bubble', items: menuItems },
  push: { text: 'Push', items: menuItems },
  pushRotate: { text: 'Push Rotate', items: menuItems },
  rotateIn: { text: 'Rotate In', items: menuItems },
  rotateOut: { text: 'Rotate Out', items: menuItems },
  scaleDown: { text: 'Scale Down', items: menuItems },
  scaleRotate: { text: 'Scale Rotate', items: menuItems },
  openDoor: { text: 'Open Door', items: menuItems }
};

React.render(<Demo menus={ menus }/>, document.body);
