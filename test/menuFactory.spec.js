'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import createShallowComponent from './utils/createShallowComponent';
import createMountedComponent from './utils/createMountedComponent';
import renderIntoDocument from './utils/renderIntoDocument';
import menuFactory from '../src/menuFactory';

describe('menuFactory', () => {
  let Menu, component;
  const mockStyles = {
    basic: {
      menuWrap() {
        return {};
      },
      menu() {
        return {};
      },
      item() {
        return {};
      },
      overlay() {
        return {};
      }
    },
    full: {
      menuWrap() {
        return {};
      },
      menu() {
        return {};
      },
      item() {
        return {};
      },
      overlay() {
        return {};
      },
      pageWrap() {
        return {};
      },
      outerContainer() {
        return {};
      }
    },
    withSvg: {
      menuWrap() {
        return {};
      },
      menu() {
        return {};
      },
      item() {
        return {};
      },
      overlay() {
        return {};
      },
      morphShape() {
        return {};
      },
      svg: {
        lib: () => ({ select: () => ({ attr: () => {} }) })
      }
    }
  };
  const mockStylesProp = {
    bmMenuWrap: {
      transition: '0.2s'
    },
    bmMenu: {
      background: 'blue'
    },
    bmMorphShape: {
      fill: 'blue'
    },
    bmItemList: {
      color: 'white'
    },
    bmItem: {
      color: 'white'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.5)'
    }
  };

  function addWrapperElementsToDOM() {
    let outerContainer = document.createElement('div');
    outerContainer.setAttribute('id', 'outer-container');
    let pageWrap = document.createElement('div');
    pageWrap.setAttribute('id', 'page-wrap');
    outerContainer.appendChild(pageWrap);
    document.body.appendChild(outerContainer);
  }

  function removeWrapperElementsFromDOM() {
    let outerContainer = document.getElementById('outer-container');
    document.body.removeChild(outerContainer);
  }

  function clearHtmlBodyInlineStyles() {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    [html, body].forEach(el => el.removeAttribute('style'));
  }

  it('exists and is not undefined', () => {
    assert.isDefined(menuFactory, 'menuFactory is defined');
  });

  it('throws if not passed any styles', () => {
    assert.throws(
      () => {
        Menu = menuFactory();
        createShallowComponent(<Menu />);
      },
      Error,
      /No styles supplied/
    );
  });

  describe('when rendered successfully', () => {
    beforeEach(() => {
      Menu = menuFactory(mockStyles.basic);
      component = createShallowComponent(<Menu />);
    });

    it('contains an overlay', () => {
      const overlay = component.props.children[0];
      expect(component.type).to.equal('div');
      expect(overlay.props.className).to.contain('bm-overlay');
    });

    it('accepts an optional ID', () => {
      component = createShallowComponent(<Menu id={'menu-wrap'} />);
      const menuWrap = component.props.children[2];
      expect(menuWrap.props.id).to.equal('menu-wrap');
    });

    it('accepts an optional className', () => {
      component = createShallowComponent(<Menu className={'custom-class'} />);
      const menuWrap = component.props.children[2];
      expect(menuWrap.props.className).to.contain('custom-class');
    });

    it('accepts an optional htmlClassName, applied only when menu is open', () => {
      component = renderIntoDocument(<Menu htmlClassName={'custom-class'} />);
      const [button] = TestUtils.scryRenderedDOMComponentsWithTag(
        component,
        'button'
      );
      const html = document.querySelector('html');
      expect(html.classList.contains('custom-class')).to.be.false;
      TestUtils.Simulate.click(button);
      expect(html.classList.contains('custom-class')).to.be.true;
      TestUtils.Simulate.click(button);
    });

    it('accepts an optional bodyClassName, applied only when menu is open', () => {
      component = renderIntoDocument(<Menu bodyClassName={'custom-class'} />);
      const [button] = TestUtils.scryRenderedDOMComponentsWithTag(
        component,
        'button'
      );
      const body = document.querySelector('body');
      expect(body.classList.contains('custom-class')).to.be.false;
      TestUtils.Simulate.click(button);
      expect(body.classList.contains('custom-class')).to.be.true;
      TestUtils.Simulate.click(button);
    });

    it('contains a burger icon', () => {
      component = renderIntoDocument(<Menu />);
      const burgerIconBars = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'bm-burger-bars'
      );
      expect(burgerIconBars).to.have.length(3);
    });

    it('contains an SVG and morph shape if required', () => {
      Menu = menuFactory(mockStyles.withSvg);
      component = renderIntoDocument(<Menu />);
      const shape = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-morph-shape'
      );
      const svg = TestUtils.findRenderedDOMComponentWithTag(component, 'svg');
      assert.ok(shape);
      assert.ok(svg);
    });

    it('allows an arbitrary number of children', () => {
      let children;

      component = renderIntoDocument(<Menu />);
      children = TestUtils.scryRenderedDOMComponentsWithClass(component, 'child');
      expect(children.length).to.equal(0);

      component = renderIntoDocument(
        <Menu>
          <div className="child">A child</div>
        </Menu>
      );
      children = TestUtils.scryRenderedDOMComponentsWithClass(component, 'child');
      expect(children.length).to.equal(1);

      component = renderIntoDocument(
        <Menu>
          <div className="child">A child</div>
          <div className="child">Another child</div>
        </Menu>
      );
      children = TestUtils.scryRenderedDOMComponentsWithClass(component, 'child');
      expect(children.length).to.equal(2);
    });

    it.skip('closes on Escape key press', () => {
      const events = {};
      window.addEventListener = sinon.spy((event, cb) => {
        events[event] = cb;
      });
      component = renderIntoDocument(<Menu />);
      component.setState({ isOpen: true });
      events.keydown({ key: 'Escape' });
      expect(component.state.isOpen).to.be.false;
    });

    it.skip('closes on overlay click', () => {
      component = renderIntoDocument(<Menu />);
      component.setState({ isOpen: true });
      const overlay = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-overlay'
      );
      TestUtils.Simulate.click(overlay);
      expect(component.state.isOpen).to.be.false;
    });

    it('does not close on overlay click if disableOverlayClick prop passed', () => {
      component = renderIntoDocument(<Menu disableOverlayClick />);
      component.setState({ isOpen: true });
      const overlay = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-overlay'
      );
      TestUtils.Simulate.click(overlay);
      expect(component.state.isOpen).to.be.true;
    });
  });

  describe('react <StrictMode>', () => {
    let stubConsoleError;
    let errorLogs = [];

    beforeEach(() => {
      errorLogs = [];
      stubConsoleError = sinon
        .stub(console, 'error')
        .callsFake((...args) => errorLogs.push(args));
    });

    afterEach(() => {
      stubConsoleError.restore();
    });

    it('renders without strict mode warnings', () => {
      Menu = menuFactory(mockStyles.basic);
      component = createMountedComponent(
        <React.StrictMode>
          <Menu />
        </React.StrictMode>
      );
      expect(errorLogs).to.deep.equal([]);
    });
  });

  describe.skip('when unmounted', () => {
    const events = {};

    function unmountComponent() {
      ReactDOM.unmountComponentAtNode(
        ReactDOM.findDOMNode(component).parentNode
      );
    }

    beforeEach(() => {
      window.addEventListener = sinon.spy((event, cb) => {
        events[event] = cb;
      });
      window.removeEventListener = sinon.spy(event => {
        delete events[event];
      });
      component = renderIntoDocument(<Menu />);
    });

    it('clears global keydown event handler', () => {
      assert.ok(events.keydown);
      unmountComponent();
      assert.notOk(events.keydown);
    });

    it('clears wrapper styles', () => {
      const applyWrapperStyles = sinon.spy(component, 'applyWrapperStyles');
      unmountComponent();
      assert.ok(applyWrapperStyles.calledWith(false));
      component.applyWrapperStyles.restore();
    });
  });

  describe('menuWrap element', () => {
    beforeEach(() => {
      Menu = menuFactory(mockStyles.basic);
      component = renderIntoDocument(
        <Menu width={280} styles={mockStylesProp} />
      );
    });

    it('allows width to be set by props', () => {
      const menuWrap = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-menu-wrap'
      );
      expect(menuWrap.style.width).to.equal('280px');
    });

    it('can be styled with props', () => {
      const menuWrap = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-menu-wrap'
      );
      expect(menuWrap.style.transition).to.equal('0.2s');
    });

    it('has the correct number of children', () => {
      expect(
        Object.keys(ReactDOM.findDOMNode(component).children)
      ).to.have.length(3);
    });

    it('contains menu and item list elements with correct attributes', () => {
      const menu = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-menu'
      );
      const itemList = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-item-list'
      );
      assert.ok(menu);
      expect(menu.style.height).to.equal('100%');
      assert.ok(itemList);
      expect(menu.style.height).to.equal('100%');
    });

    it('contains a cross icon', () => {
      const crossIconBars = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'bm-cross'
      );
      expect(crossIconBars).to.have.length(2);
    });
  });

  describe('menu element', () => {
    it('can be styled with props', () => {
      component = renderIntoDocument(<Menu styles={mockStylesProp} />);
      const menu = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-menu'
      );
      expect(menu.style.background).to.equal('blue');
    });

    it('accepts an optional menuClassName', () => {
      component = renderIntoDocument(<Menu menuClassName={'custom-class'} />);
      const menu = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-menu'
      );
      expect(menu.classList.toString()).to.contain('custom-class');
    });
  });

  describe('morphShape element', () => {
    it('can be styled with props', () => {
      Menu = menuFactory(mockStyles.withSvg);
      component = renderIntoDocument(<Menu styles={mockStylesProp} />);
      const shape = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-morph-shape'
      );
      expect(shape.style.fill).to.equal('blue');
    });

    it('accepts an optional morphShapeClassName', () => {
      component = renderIntoDocument(
        <Menu morphShapeClassName={'custom-class'} />
      );
      const shape = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-morph-shape'
      );
      expect(shape.classList.toString()).to.contain('custom-class');
    });
  });

  describe('itemList element', () => {
    it('can be styled with props', () => {
      component = renderIntoDocument(<Menu styles={mockStylesProp} />);
      const itemList = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-item-list'
      );
      expect(itemList.style.color).to.equal('white');
    });

    it('accepts an optional itemListClassName', () => {
      component = renderIntoDocument(
        <Menu itemListClassName={'custom-class'} />
      );
      const itemList = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-item-list'
      );
      expect(itemList.classList.toString()).to.contain('custom-class');
    });
  });

  describe('item element', () => {
    it('can be styled with props', () => {
      component = renderIntoDocument(
        <Menu styles={mockStylesProp}>
          <div>A child</div>
        </Menu>
      );
      const item = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-item'
      );
      expect(item.style.color).to.equal('white');
    });

    it('accepts an optional itemClassName', () => {
      component = renderIntoDocument(
        <Menu itemClassName={'custom-class'}>
          <div>A child</div>
        </Menu>
      );
      const item = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-item'
      );
      expect(item.classList.toString()).to.contain('custom-class');
    });

    it('retains any className already present', () => {
      component = renderIntoDocument(
        <Menu itemClassName={'custom-class'}>
          <div className="existing-class">A child</div>
        </Menu>
      );
      const item = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-item'
      );
      expect(item.classList.toString()).to.contain('existing-class');
    });
  });

  describe('overlay', () => {
    it('can be styled with props', () => {
      component = renderIntoDocument(<Menu styles={mockStylesProp} />);
      const overlay = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-overlay'
      );
      expect(overlay.style.background).to.equal('rgba(0, 0, 0, 0.5)');
    });

    it('can be disabled', function() {
      component = renderIntoDocument(
        <Menu styles={mockStylesProp} noOverlay />
      );
      assert.throw(
        TestUtils.findRenderedDOMComponentWithClass.bind(
          null,
          component,
          'bm-overlay'
        ),
        Error
      );
    });

    it('accepts an optional overlayClassName', () => {
      component = createShallowComponent(
        <Menu overlayClassName={'custom-class'} />
      );
      const overlay = component.props.children[0];
      expect(overlay.props.className).to.contain('custom-class');
    });
  });

  describe('burger icon', () => {
    it('can be disabled', () => {
      component = renderIntoDocument(
        <Menu styles={mockStylesProp} customBurgerIcon={false} />
      );
      assert.throw(
        TestUtils.findRenderedDOMComponentWithClass.bind(
          null,
          component,
          'bm-burger-button'
        ),
        Error
      );
    });

    it('accepts an optional burgerButtonClassName', () => {
      component = renderIntoDocument(
        <Menu burgerButtonClassName={'custom-class'} />
      );
      const button = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-burger-button'
      );
      expect(button.classList.toString()).to.contain('custom-class');
    });

    it('accepts an optional burgerBarClassName', () => {
      component = renderIntoDocument(
        <Menu burgerBarClassName={'custom-class'} />
      );
      const bars = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'bm-burger-bars'
      );
      expect(bars[0].classList.toString()).to.contain('custom-class');
    });
  });

  describe('cross icon', () => {
    it('can be disabled', () => {
      component = renderIntoDocument(
        <Menu styles={mockStylesProp} customCrossIcon={false} />
      );
      assert.throw(
        TestUtils.findRenderedDOMComponentWithClass.bind(
          null,
          component,
          'bm-cross-button'
        ),
        Error
      );
    });

    it('accepts an optional crossButtonClassName', () => {
      component = renderIntoDocument(
        <Menu crossButtonClassName={'custom-class'} />
      );
      const button = TestUtils.findRenderedDOMComponentWithClass(
        component,
        'bm-cross-button'
      );
      expect(button.classList.toString()).to.contain('custom-class');
    });

    it('accepts an optional crossClassName', () => {
      component = renderIntoDocument(<Menu crossClassName={'custom-class'} />);
      const bars = TestUtils.scryRenderedDOMComponentsWithClass(
        component,
        'bm-cross'
      );
      expect(bars[0].classList.toString()).to.contain('custom-class');
    });
  });

  describe.skip('toggleMenu method', () => {
    beforeEach(() => {
      Menu = menuFactory(mockStyles.basic);
      component = renderIntoDocument(<Menu />);
    });

    it('updates the isOpen state', () => {
      component.setState({ isOpen: false });
      component.toggleMenu();
      assert.ok(component.state.isOpen);
    });

    it('calls applyWrapperStyles', () => {
      const applyWrapperStyles = sinon.spy(component, 'applyWrapperStyles');
      component.toggleMenu();
      assert.ok(applyWrapperStyles.called, 'applyWrapperStyles called');
      component.applyWrapperStyles.restore();
    });

    it('calls onStateChange callback', () => {
      const callback = sinon.spy();
      component = renderIntoDocument(<Menu onStateChange={callback} />);
      component.toggleMenu();
      assert.ok(callback.called, 'onStateChange callback called');
    });

    it('calls onStateChange callback with current menu state', () => {
      const callback = sinon.spy();
      component = renderIntoDocument(<Menu onStateChange={callback} />);
      component.setState({ isOpen: false });
      component.toggleMenu();
      assert.ok(callback.calledWith({ isOpen: true }));
    });
  });

  describe.skip('applyWrapperStyles method', () => {
    beforeEach(() => {
      addWrapperElementsToDOM();
      Menu = menuFactory(mockStyles.full);
      component = renderIntoDocument(
        <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      );
    });

    afterEach(() => {
      removeWrapperElementsFromDOM();
    });

    it('calls handleExternalWrapper with the correct params to set', () => {
      const handleExternalWrapper = sinon.spy(
        component,
        'handleExternalWrapper'
      );
      component.applyWrapperStyles();
      assert.ok(
        handleExternalWrapper.calledWithExactly(
          'page-wrap',
          mockStyles.full.pageWrap,
          true
        )
      );
      assert.ok(
        handleExternalWrapper.calledWithExactly(
          'outer-container',
          mockStyles.full.outerContainer,
          true
        )
      );
      component.handleExternalWrapper.restore();
    });

    it('calls handleExternalWrapper with the correct params to unset', () => {
      const handleExternalWrapper = sinon.spy(
        component,
        'handleExternalWrapper'
      );
      component.applyWrapperStyles(false);
      assert.ok(
        handleExternalWrapper.calledWithExactly(
          'page-wrap',
          mockStyles.full.pageWrap,
          false
        )
      );
      assert.ok(
        handleExternalWrapper.calledWithExactly(
          'outer-container',
          mockStyles.full.outerContainer,
          false
        )
      );
      component.handleExternalWrapper.restore();
    });
  });

  describe.skip('handleExternalWrapper method', () => {
    const styles = () => {
      return { color: 'red', position: 'relative' };
    };

    beforeEach(() => {
      addWrapperElementsToDOM();
      Menu = menuFactory(mockStyles.full);
      component = renderIntoDocument(
        <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      );
    });

    afterEach(() => {
      removeWrapperElementsFromDOM();
      clearHtmlBodyInlineStyles();
    });

    it('errors with the correct message if no wrapper element found', () => {
      removeWrapperElementsFromDOM();
      const error = sinon.stub(console, 'error');
      component.handleExternalWrapper(
        'page-wrap',
        mockStyles.full.pageWrap,
        true
      );
      assert.ok(error.calledWith("Element with ID 'page-wrap' not found"));
      console.error.restore();
      addWrapperElementsToDOM();
    });

    it('sets styles on external wrapper elements', () => {
      component.handleExternalWrapper('page-wrap', styles, true);
      let wrapperElement = document.getElementById('page-wrap');
      expect(wrapperElement.style.color).to.equal('red');
      expect(wrapperElement.style.position).to.equal('relative');
    });

    it('clears styles from external wrapper elements', () => {
      let wrapperElement = document.getElementById('page-wrap');
      wrapperElement.style.color = 'red';
      wrapperElement.style.position = 'relative';
      component.handleExternalWrapper('page-wrap', styles, false);
      expect(wrapperElement.style.color).to.equal('');
      expect(wrapperElement.style.position).to.equal('');
    });

    it('sets styles on html and body elements', () => {
      let html = document.querySelector('html');
      let body = document.querySelector('body');
      component.handleExternalWrapper('page-wrap', styles, true);
      expect(html.style['overflow-x']).to.equal('hidden');
      expect(body.style['overflow-x']).to.equal('hidden');
    });

    it('does not set styles on html and body elements if custom classes are used', () => {
      const component = renderIntoDocument(
        <Menu
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}
          htmlClassName="custom-html"
          bodyClassName="custom-body"
        />
      );
      let html = document.querySelector('html');
      let body = document.querySelector('body');
      component.handleExternalWrapper('page-wrap', styles, true);
      expect(html.style['overflow-x']).to.equal('');
      expect(body.style['overflow-x']).to.equal('');
    });

    it('clears styles from html and body elements', () => {
      let html = document.querySelector('html');
      let body = document.querySelector('body');
      component.handleExternalWrapper('page-wrap', styles, false);
      expect(html.style['overflow-x']).to.equal('');
      expect(body.style['overflow-x']).to.equal('');
    });
  });

  describe.skip('listenForKeyDowns method', () => {
    it('closes the menu when Escape is pressed', () => {
      Menu = menuFactory(mockStyles.basic);
      component = renderIntoDocument(<Menu />);
      component.setState({ isOpen: true });
      component.listenForKeyDowns({ key: 'Escape', target: '' });
      expect(component.state.isOpen).to.be.false;
    });
  });

  describe.skip('isOpen prop', () => {
    let container;

    beforeEach(() => {
      Menu = menuFactory(mockStyles.basic);
      container = document.createElement('div');
    });

    it('should render open if set to true', () => {
      class ParentComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = { example: true };
        }
        render() {
          return <Menu isOpen={this.state.example} />;
        }
      }

      const parent = renderIntoDocument(<ParentComponent />, container);
      const menu = parent.refs.menu;
      expect(menu.state.isOpen).to.be.true;
    });

    it('should render closed if set to false', () => {
      class ParentComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = { example: false };
        }
        render() {
          return <Menu ref="menu" isOpen={this.state.example} />;
        }
      }

      const parent = renderIntoDocument(<ParentComponent />, container);
      const menu = parent.refs.menu;
      expect(menu.state.isOpen).to.be.false;
    });
  });

  describe('disableCloseOnEsc prop', () => {
    it('should not allow close on Escape key press', () => {
      const events = {};
      window.addEventListener = sinon.spy((event, cb) => {
        events[event] = cb;
      });
      Menu = menuFactory(mockStyles.basic);
      component = renderIntoDocument(<Menu disableCloseOnEsc />);
      component.setState({ isOpen: true });
      events.keydown({ key: 'Escape' });
      expect(component.state.isOpen).to.be.true;
    });
  });

  describe.skip('customOnKeyDown prop', () => {
    it('should be set for window keydown event instead of listenForKeyDowns', () => {
      const events = {};
      window.addEventListener = sinon.spy((event, cb) => {
        events[event] = cb;
      });
      Menu = menuFactory(mockStyles.basic);
      const customOnKeyDown = sinon.spy();
      component = renderIntoDocument(
        <Menu customOnKeyDown={customOnKeyDown} />
      );
      const listenForKeyDowns = sinon.spy(component, 'listenForKeyDowns');
      component.setState({ isOpen: true });
      events.keydown();
      expect(customOnKeyDown.called).to.be.true;
      expect(listenForKeyDowns.called).to.be.false;
    });
  });

  // TODO: rewrite these to not rely on implementation details
  describe.skip('open state', () => {
    let container;

    beforeEach(() => {
      Menu = menuFactory(mockStyles.basic);
      container = document.createElement('div');
    });

    describe('change', () => {
      it('should not occur when parent component state changes', () => {
        class ParentComponent extends React.Component {
          constructor(props) {
            super(props);
            this.state = { example: true };
          }
          triggerStateChange() {
            this.setState({ example: !this.state.example });
          }
          render() {
            return <Menu ref="menu" />;
          }
        }

        const parent = renderIntoDocument(<ParentComponent />, container);
        const menu = parent.refs.menu;
        menu.setState({ isOpen: true });
        parent.triggerStateChange();
        expect(menu.state.isOpen).to.be.true;
      });

      it('should not occur when isOpen prop was not changed', () => {
        class ParentComponent extends React.Component {
          constructor(props) {
            super(props);
            this.state = { example: true };
          }
          triggerStateChange() {
            this.setState({ example: !this.state.example });
          }
          render() {
            return <Menu ref="menu" isOpen />;
          }
        }

        const parent = renderIntoDocument(<ParentComponent />, container);
        const menu = parent.refs.menu;
        parent.triggerStateChange();
        expect(menu.state.isOpen).to.be.true;
      });

      it('should not occur when receiving other props', () => {
        class ParentComponent extends React.Component {
          constructor(props) {
            super(props);
            this.state = { example: true };
          }
          triggerStateChange() {
            this.setState({ example: !this.state.example });
          }
          render() {
            return <Menu ref="menu" right={this.state.example} />;
          }
        }

        const parent = renderIntoDocument(<ParentComponent />, container);
        const menu = parent.refs.menu;
        parent.triggerStateChange();
        expect(menu.state.isOpen).to.be.false;
      });

      it('should not trigger wrappers if isOpen prop was not changed', () => {
        const applyWrapperStyles = sinon.spy(component, 'applyWrapperStyles');

        class ParentComponent extends React.Component {
          constructor(props) {
            super(props);
            this.state = { example: true };
          }
          triggerStateChange() {
            this.setState({ example: !this.state.example });
          }
          render() {
            return <Menu isOpen />;
          }
        }

        const parent = renderIntoDocument(<ParentComponent />);
        parent.triggerStateChange();
        expect(applyWrapperStyles.called).to.be.false;
        component.applyWrapperStyles.restore();
      });

      it('should trigger onStateChange callback if state changes', () => {
        const callback = sinon.spy();
        class ParentComponent extends React.Component {
          constructor(props) {
            super(props);
            this.state = { example: true };
          }
          triggerStateChange() {
            this.setState({ example: false });
          }
          render() {
            return (
              <Menu
                onStateChange={callback}
                isOpen={this.state.example}
              />
            );
          }
        }

        const parent = TestUtils.renderIntoDocument(
          <ParentComponent />,
          container
        );
        parent.triggerStateChange();
        expect(callback.calledOnce).to.be.true;
      });

      it('should not trigger onStateChange callback if state does not change', () => {
        const callback = sinon.spy();
        class ParentComponent extends React.Component {
          constructor(props) {
            super(props);
            this.state = { example: true };
          }
          triggerStateChange() {
            this.setState({ example: true });
          }
          render() {
            return (
              <Menu onStateChange={callback} isOpen={this.state.example} />
            );
          }
        }

        const wrapper = renderIntoDocument(<ParentComponent />, container);
        const parent = TestUtils.findRenderedComponentWithType(
          wrapper,
          ParentComponent
        );
        parent.triggerStateChange();
        expect(callback.called).to.be.false;
      });
    });
  });
});
