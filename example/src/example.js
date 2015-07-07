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
      currentMenu: 'slide',
      menuItems: this.props.menus['slide'].items
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
        <Menu items={ this.state.menuItems } id={ this.state.currentMenu } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }/>
        <main id="page-wrap">
          <h1><a href="https://github.com/negomi/react-burger-menu">react-burger-menu</a></h1>
          <h2>An off-canvas sidebar React component with a collection of effects and styles using CSS transitions and SVG path animations.</h2>
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

var menuItems2 = [
  { content: '<i class="fa fa-fw fa-inbox fa-3x"></i><span>Sidebar</span>' },
  { content: '<i class="fa fa-fw fa-database"></i><span>Data Management</span>' },
  { content: '<i class="fa fa-fw fa-map-marker"></i><span>Location</span>' },
  { content: '<i class="fa fa-fw fa-mortar-board"></i><span>Study</span>' },
  { content: '<i class="fa fa-fw fa-picture-o"></i><span>Collections</span>' },
  { content: '<i class="fa fa-fw fa-money"></i><span>Credits</span>' }
];

var menus = {
  slide: { text: 'Slide', items: menuItems },
  stack: { text: 'Stack', items: menuItems },
  elastic: { text: 'Elastic', items: menuItems },
  bubble: { text: 'Bubble', items: menuItems },
  push: { text: 'Push', items: menuItems },
  pushRotate: { text: 'Push Rotate', items: menuItems2 },
  scaleDown: { text: 'Scale Down', items: menuItems2 },
  scaleRotate: { text: 'Scale Rotate', items: menuItems2 },
  fallDown: { text: 'Fall Down', items: menuItems2 }
};

React.render(<Demo menus={ menus }/>, document.body);
