import React from 'react';
import BurgerMenu from 'react-burger-menu';

let Demo = React.createClass({

  changeMenu(menu) {
    this.setState({ currentMenu: menu });
  },

  getMenu() {
    let Menu = BurgerMenu[this.state.currentMenu];
    let jsx;

    switch (this.props.menus[this.state.currentMenu].items) {
      case 1:
        jsx = (
          <Menu id={ this.state.currentMenu } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
            <a href=""><i className="fa fa-fw fa-star-o"></i><span>Favorites</span></a>
            <a href=""><i className="fa fa-fw fa-bell-o"></i><span>Alerts</span></a>
            <a href=""><i className="fa fa-fw fa-envelope-o"></i><span>Messages</span></a>
            <a href=""><i className="fa fa-fw fa-comment-o"></i><span>Comments</span></a>
            <a href=""><i className="fa fa-fw fa-bar-chart-o"></i><span>Analytics</span></a>
            <a href=""><i className="fa fa-fw fa-newspaper-o"></i><span>Reading List</span></a>
          </Menu>
        );
        break;
      case 2:
        jsx = (
          <Menu id={ this.state.currentMenu } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
            <h2><i className="fa fa-fw fa-inbox fa-2x"></i><span>Sidebar</span></h2>
            <a href=""><i className="fa fa-fw fa-database"></i><span>Data Management</span></a>
            <a href=""><i className="fa fa-fw fa-map-marker"></i><span>Location</span></a>
            <a href=""><i className="fa fa-fw fa-mortar-board"></i><span>Study</span></a>
            <a href=""><i className="fa fa-fw fa-picture-o"></i><span>Collections</span></a>
            <a href=""><i className="fa fa-fw fa-money"></i><span>Credits</span></a>
          </Menu>
        );
        break;
      default:
        jsx = (
          <Menu id={ this.state.currentMenu } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
            <a href=""><i className="fa fa-fw fa-star-o"></i><span>Favorites</span></a>
            <a href=""><i className="fa fa-fw fa-bell-o"></i><span>Alerts</span></a>
            <a href=""><i className="fa fa-fw fa-envelope-o"></i><span>Messages</span></a>
            <a href=""><i className="fa fa-fw fa-comment-o"></i><span>Comments</span></a>
            <a href=""><i className="fa fa-fw fa-bar-chart-o"></i><span>Analytics</span></a>
            <a href=""><i className="fa fa-fw fa-newspaper-o"></i><span>Reading List</span></a>
          </Menu>
        );
    }

    return jsx;
  },

  getInitialState() {
    return { currentMenu: 'slide' };
  },

  render() {
    let buttons = Object.keys(this.props.menus).map((menu) => {
      return (
        <a key={ menu }
          className={ menu === this.state.currentMenu ? 'current-demo' : '' }
          onClick={ this.changeMenu.bind(this, menu) }>
          { this.props.menus[menu].buttonText }
        </a>
      );
    });

    return (
      <div id="outer-container" style={ { height: '100%' } }>
        { this.getMenu() }
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

let menus = {
  slide: { buttonText: 'Slide', items: 1 },
  stack: { buttonText: 'Stack', items: 1 },
  elastic: { buttonText: 'Elastic', items: 1 },
  bubble: { buttonText: 'Bubble', items: 1 },
  push: { buttonText: 'Push', items: 1 },
  pushRotate: { buttonText: 'Push Rotate', items: 2 },
  scaleDown: { buttonText: 'Scale Down', items: 2 },
  scaleRotate: { buttonText: 'Scale Rotate', items: 2 },
  fallDown: { buttonText: 'Fall Down', items: 2 }
};

React.render(<Demo menus={ menus }/>, document.body);
