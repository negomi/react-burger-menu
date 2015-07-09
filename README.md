# react-burger-menu

An off-canvas sidebar React component with a collection of effects and styles using CSS transitions and SVG path animations.

## Demo & Examples

Live demo: [negomi.github.io/react-burger-menu](http://negomi.github.io/react-burger-menu/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-burger-menu is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-burger-menu.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-burger-menu --save
```

## Usage

Items for the menu are passed through the `items` property. It should be an array of objects, each with a required `content` key and optional `href` key. Content can be any string, and can also include HTML.

```
var Menu = require('react-burger-menu/nameOfAnimation');

var Example = React.createClass({
  render: function() {
    var sidebarItems = [
      { content: 'Home', href: '/' },
      { content: 'About', href: '/about' },
      { content: 'Contact', href: '/contact' },
      { content: '<span id="settings" class="small">Settings</span>' }
    ];

    return (
      <Menu items={ sidebarItems } />
    );
  }
});

```

### Animations

* `slide`
* `stack`
* `elastic`
* `bubble`
* `push`
* `pushRotate`
* `scaleDown`
* `scaleRotate`
* `fallDown`

### Properties

Some animations require certain other elements to be on your page:

* **Page wrapper** - an element wrapping the rest of the content on your page, placed after the menu component

  ```
  <Menu items={ [] } pageWrapId={ "page-wrap" }/>
  <main id="page-wrap">
    .
    .
    .
  </main>
  ```

* **Outer container** - an element containing everything, including the menu component
  ```
  <div id="outer-container">
    <Menu items={ [] } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }/>
    <main id="page-wrap">
      .
      .
      .
    </main>
  </div>
  ```

If you are using an animation that requires either/both of these elements, you need to give the element an ID, and pass that ID to the menu component as the `pageWrapId` and `outerContainerId` props respectively.

Check this table to see which animations require these elements:

Animation | `pageWrapId` | `outerContainerId`
--- | :---: | :---:
`slide` | |
`stack` | |
`elastic` | &#x2713; |
`bubble` | |
`push` | &#x2713; |
`pushRotate` |  &#x2713;  |  &#x2713;
`scaleDown` |  &#x2713;  |  &#x2713;
`scaleRotate` |  &#x2713;  |  &#x2713;
`fallDown` |  &#x2713;  |  &#x2713;

There is also an optional `id` prop, which will simply add an ID to the rendered menu's outermost element. This is not required for any functionality.

```
<Menu items={ [] } id={ "sidebar" }/>
```

### Styling

All the animations are handled internally by the component. However, the visual styles (colors, fonts etc.) are not, and need to be included with CSS.

The component has the following helper classes:

```
// Color of burger icon
.bm-burger-icon {
  background: #373a47;
}

// Color of close button cross
.bm-cross {
  background: #bdc3c7;
}

// Background color of sidebar
.bm-menu,
.bm-morph-shape {
  background: #373a47;
}

// General menu styles
.bm-menu {
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
}

// Styles for each menu item
.bm-item-list a {
  color: #b8b7ad;
  padding: 0.8em;
}

.bm-item-list a:hover,
.bm-item-list a:focus {
  color: #c94e50;
}

```

### License

MIT

Copyright (c) 2015 Imogen Wentworth.
