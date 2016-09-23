'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { assert, expect } from 'chai';
import sinon from 'sinon';
import createShallowComponent from './utils/createShallowComponent';
import menuFactory from '../lib/menuFactory';

describe('menuFactory', () => {

  let Menu, component;
  const mockStyles = {
    basic: {
      menuWrap() { return {}; },
      menu() { return {}; },
      item() { return {}; },
      overlay() { return {}; }
    },
    full: {
      menuWrap() { return {}; },
      menu() { return {}; },
      item() { return {}; },
      overlay() { return {}; },
      pageWrap() { return {}; },
      outerContainer() { return {}; }
    },
    withSvg: {
      menuWrap() { return {}; },
      menu() { return {}; },
      item() { return {}; },
      overlay() { return {}; },
      morphShape() { return {}; },
      svg: {}
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

  it('exists and is not undefined', () => {
    assert.isDefined(menuFactory, 'menuFactory is defined');
  });

  it('throws if not passed any styles', () => {
    Menu = menuFactory();
    assert.throw(createShallowComponent.bind(null, <Menu />), Error, /No styles supplied/);
  });

  describe('when rendered successfully', () => {

    beforeEach(() => {
      Menu = menuFactory(mockStyles.basic);
      component = createShallowComponent(<Menu />);
    });

    it('sets global keydown event handler', () => {
      component = TestUtils.renderIntoDocument(<Menu />);
      assert.equal(window.onkeydown, component.listenForClose);
    });

    it('contains an overlay', () => {
      const overlay = component.props.children[0];
      expect(component.type).to.equal('div');
      expect(overlay.props.className).to.contain('bm-overlay');
    });

    it('contains a menuWrap element with an optional ID', () => {
      component = createShallowComponent(<Menu id={ 'menu-wrap' } />);
      const menuWrap = component.props.children[1];
      expect(component.type).to.equal('div');
      expect(menuWrap.props.id).to.equal('menu-wrap');
    });

    it('contains a burger icon', () => {
      component = TestUtils.renderIntoDocument(<Menu />);
      const burgerIconBars = TestUtils.scryRenderedDOMComponentsWithClass(component, 'bm-burger-bars');
      expect(burgerIconBars).to.have.length(3);
    });

    it('contains an SVG and morph shape if required', () => {
      Menu = menuFactory(mockStyles.withSvg);
      component = TestUtils.renderIntoDocument(<Menu />);
      const shape = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-morph-shape');
      const svg = TestUtils.findRenderedDOMComponentWithTag(component, 'svg');
      assert.ok(shape);
      assert.ok(svg);
    });

    it('allows an arbitrary number of children', () => {
      component = TestUtils.renderIntoDocument(<Menu />);
      expect(React.Children.count(component.props.children)).to.equal(0);

      component = TestUtils.renderIntoDocument(<Menu><div>A child</div></Menu>);
      expect(React.Children.count(component.props.children)).to.equal(1);

      component = TestUtils.renderIntoDocument(<Menu><div>A child</div><div>Another child</div></Menu>);
      expect(React.Children.count(component.props.children)).to.equal(2);
    });

    it('is initially closed', () => {
      expect(Menu.prototype.getInitialState().isOpen).to.be.false;
    });

    it('closes on Escape key press', () => {
      component = TestUtils.renderIntoDocument(<Menu />);
      component.setState({ isOpen: true });
      window.onkeydown({ key: 'Escape' });
      expect(component.state.isOpen).to.be.false;
    });

    it('closes on overlay click', () => {
      component = TestUtils.renderIntoDocument(<Menu />);
      component.setState({ isOpen: true });
      const overlay = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-overlay');
      TestUtils.Simulate.click(overlay);
      expect(component.state.isOpen).to.be.false;
    });
  });

  describe('when unmounted', () => {

    function unmountComponent() {
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
    }

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<Menu />);
    });

    it('clears global keydown event handler', () => {
      assert.ok(window.onkeydown);
      unmountComponent();
      assert.notOk(window.onkeydown);
    });

    it('clears wrapper styles', () => {
      const clearWrapperStyles = sinon.spy(component, 'clearWrapperStyles');
      unmountComponent();
      assert.ok(clearWrapperStyles.called);
      component.clearWrapperStyles.restore();
    });
  });

  describe('menuWrap element', () => {

    beforeEach(() => {
      Menu = menuFactory(mockStyles.basic);
      component = TestUtils.renderIntoDocument(<Menu width={ 280 } styles={ mockStylesProp } />);
    });

    it('allows width to be set by props', () => {
      const menuWrap = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu-wrap');
      expect(menuWrap.style.width).to.equal('280px');
    });

    it('can be styled with props', () => {
      const menuWrap = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu-wrap');
      expect(menuWrap.style.transition).to.equal('0.2s');
    });

    it('has the correct number of children', () => {
      expect(Object.keys(ReactDOM.findDOMNode(component).children)).to.have.length(3);
    });

    it('contains menu and item list elements with correct attributes', () => {
      const menu = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu');
      const itemList = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-item-list');
      assert.ok(menu);
      expect(menu.style.height).to.equal('100%');
      assert.ok(itemList);
      expect(menu.style.height).to.equal('100%');
    });

    it('contains a cross icon', () => {
      const crossIconBars = TestUtils.scryRenderedDOMComponentsWithClass(component, 'bm-cross');
      expect(crossIconBars).to.have.length(2);
    });
  });

  describe('menu element', () => {

    it('can be styled with props', () => {
      component = TestUtils.renderIntoDocument(<Menu styles={ mockStylesProp } />);
      const menu = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-menu');
      expect(menu.style.background).to.equal('blue');
    });
  });

  describe('morphShape element', () => {

    it('can be styled with props', () => {
      Menu = menuFactory(mockStyles.withSvg);
      component = TestUtils.renderIntoDocument(<Menu styles={ mockStylesProp } />);
      const shape = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-morph-shape');
      expect(shape.style.fill).to.equal('blue');
    });
  });

  describe('itemList element', () => {

    it('can be styled with props', () => {
      component = TestUtils.renderIntoDocument(<Menu styles={ mockStylesProp } />);
      const itemList = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-item-list');
      expect(itemList.style.color).to.equal('white');
    });
  });

  describe('overlay', () => {

    it('can be styled with props', () => {
      component = TestUtils.renderIntoDocument(<Menu styles={ mockStylesProp } />);
      const overlay = TestUtils.findRenderedDOMComponentWithClass(component, 'bm-overlay');
      expect(overlay.style.background).to.equal('rgba(0, 0, 0, 0.5)');
    });

    it('can be disabled', function () {
      component = TestUtils.renderIntoDocument(<Menu styles={ mockStylesProp } noOverlay />);
      assert.throw(TestUtils.findRenderedDOMComponentWithClass.bind(null, component, 'bm-overlay'), Error);
    });
  });

  describe('burger icon', () => {

    it('can be disabled', () => {
      component = TestUtils.renderIntoDocument(<Menu styles={ mockStylesProp } customBurgerIcon={ false } />);
      assert.throw(TestUtils.findRenderedDOMComponentWithClass.bind(null, component, 'bm-burger-button'), Error);
    });
  });

  describe('cross icon', () => {

    it('can be disabled', () => {
      component = TestUtils.renderIntoDocument(<Menu styles={ mockStylesProp } customCrossIcon={ false } />);
      assert.throw(TestUtils.findRenderedDOMComponentWithClass.bind(null, component, 'bm-cross-button'), Error);
    });
  });

  describe('toggleMenu method', () => {

    beforeEach(() => {
      Menu = menuFactory(mockStyles.basic);
      component = TestUtils.renderIntoDocument(<Menu />);
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
      component = TestUtils.renderIntoDocument(<Menu onStateChange={ callback } />);
      component.toggleMenu();
      assert.ok(callback.called, 'onStateChange callback called');
    });

    it('calls onStateChange callback with current menu state', () => {
      const callback = sinon.spy();
      component = TestUtils.renderIntoDocument(<Menu onStateChange={ callback } />);
      component.setState({ isOpen: false });
      component.toggleMenu();
      assert.ok(callback.calledWith({ isOpen: true }));
    });
  });

  describe('applyWrapperStyles method', () => {

    beforeEach(() => {
      Menu = menuFactory(mockStyles.full);
      component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' } />);
      addWrapperElementsToDOM();
    });

    afterEach(() => {
      removeWrapperElementsFromDOM();
    });

    it('calls handleExternalWrapper with the correct params', () => {
      const handleExternalWrapper = sinon.spy(component, 'handleExternalWrapper');
      component.applyWrapperStyles();
      assert.ok(handleExternalWrapper.calledWithExactly('page-wrap', mockStyles.full.pageWrap, true));
      assert.ok(handleExternalWrapper.calledWithExactly('outer-container', mockStyles.full.outerContainer, true));
      component.handleExternalWrapper.restore();
    });
  });

  describe('clearWrapperStyles method', () => {

    beforeEach(() => {
      Menu = menuFactory(mockStyles.full);
      component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' } />);
      addWrapperElementsToDOM();
    });

    afterEach(() => {
      removeWrapperElementsFromDOM();
    });

    it('calls handleExternalWrapper with the correct params', () => {
      const handleExternalWrapper = sinon.spy(component, 'handleExternalWrapper');
      component.clearWrapperStyles();
      assert.ok(handleExternalWrapper.calledWithExactly('page-wrap', mockStyles.full.pageWrap, false));
      assert.ok(handleExternalWrapper.calledWithExactly('outer-container', mockStyles.full.outerContainer, false));
      component.handleExternalWrapper.restore();
    });
  });

  describe('handleExternalWrapper method', () => {

    const styles = () => {
      return { color: 'red', position: 'relative' };
    };

    beforeEach(() => {
      Menu = menuFactory(mockStyles.full);
      component = TestUtils.renderIntoDocument(<Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' } />);
    });

    it('errors with the correct message if no wrapper element found', () => {
      const error = sinon.stub(console, 'error');
      component.handleExternalWrapper('page-wrap', mockStyles.full.pageWrap, true);
      assert.ok(error.calledWith("Element with ID 'page-wrap' not found"));
      console.error.restore();
    });

    it('sets styles on external wrapper elements', () => {
      addWrapperElementsToDOM();
      component.handleExternalWrapper('page-wrap', styles, true);
      let wrapperElement = document.getElementById('page-wrap');
      expect(wrapperElement.style.color).to.equal('red');
      expect(wrapperElement.style.position).to.equal('relative');
      removeWrapperElementsFromDOM();
    });

    it('clears styles from external wrapper elements', () => {
      addWrapperElementsToDOM();
      let wrapperElement = document.getElementById('page-wrap');
      wrapperElement.style.color = 'red';
      wrapperElement.style.position = 'relative';
      component.handleExternalWrapper('page-wrap', styles, false);
      expect(wrapperElement.style.color).to.be.empty;
      expect(wrapperElement.style.position).to.be.empty;
      removeWrapperElementsFromDOM();
    });
  });

  describe('listenForClose method', () => {

    beforeEach(() => {
      addWrapperElementsToDOM();
      component.setState({ isOpen: true });
    });

    afterEach(() => {
      removeWrapperElementsFromDOM();
    });

    it('closes the menu when escape is pressed', () => {
      component.listenForClose({ key: 'Escape', target: '' });
      expect(component.state.isOpen).to.be.false;
    });
  });

  describe('open state', () => {

    let container;

    beforeEach(() => {
      Menu = menuFactory(mockStyles.basic);
      container = document.createElement('div');
    });

    it('can be set externally', () => {
      component = TestUtils.renderIntoDocument(<Menu isOpen />);
      expect(component.state.isOpen).to.be.true;
    });

    describe('change', () => {

      it('should not occur when parent component state changes', () => {
        const ParentComponent = React.createClass({
          getInitialState() {
            return { example: true };
          },
          triggerStateChange() {
            this.setState({ example: !this.state.example });
          },
          render() {
            return <Menu ref="menu" />;
          }
        });

        const parent = TestUtils.renderIntoDocument(<ParentComponent />, container);
        const menu = parent.refs.menu;
        menu.setState({isOpen: true});
        parent.triggerStateChange();
        expect(menu.state.isOpen).to.be.true;
      });

      it('should not occur when isOpen prop was not changed', () => {
        const ParentComponent = React.createClass({
          getInitialState() {
            return { example: true };
          },
          triggerRender() {
            this.setState({ example: !this.state.example });
          },
          render() {
            return <Menu ref="menu" isOpen />;
          }
        });

        const parent = TestUtils.renderIntoDocument(<ParentComponent />, container);
        const menu = parent.refs.menu;
        menu.setState({isOpen: false});
        parent.triggerRender();
        expect(menu.state.isOpen).to.be.true;
      });

      it('should not occur when receiving new props if isOpen prop is undefined', () => {
        const ParentComponent = React.createClass({
          getInitialState() {
            return { example: true };
          },
          changeOtherProps() {
            this.setState({ example: !this.state.example });
          },
          render() {
            return <Menu ref="menu" right={ this.state.example } />;
          }
        });

        const parent = TestUtils.renderIntoDocument(<ParentComponent />, container);
        const menu = parent.refs.menu;
        menu.setState({isOpen: true});
        parent.changeOtherProps();
        expect(menu.state.isOpen).to.be.true;
      });

      it('should not trigger wrappers if isOpen prop was not changed', () => {
        const applyWrapperStyles = sinon.spy(component, 'applyWrapperStyles');

        const ParentComponent = React.createClass({
          getInitialState() {
            return { example: true };
          },
          triggerRender() {
            this.setState({ example: !this.state.example });
          },
          render() {
            return <Menu ref="menu" isOpen />;
          }
        });

        const parent = TestUtils.renderIntoDocument(<ParentComponent />, container);
        const menu = parent.refs.menu;
        menu.setState({isOpen: false});
        parent.triggerRender();
        expect(applyWrapperStyles.called).to.be.false;
        component.applyWrapperStyles.restore();
      });

      it('should close menu if isOpen is only ever set to false', () => {
        const ParentComponent = React.createClass({
          getInitialState() {
            return { example: true };
          },
          triggerRender() {
            this.setState({ example: !this.state.example });
          },
          render() {
            return <Menu ref="menu" isOpen={ false } />;
          }
        });

        const parent = TestUtils.renderIntoDocument(<ParentComponent />, container);
        const menu = parent.refs.menu;
        menu.setState({isOpen: true});
        parent.triggerRender();
        expect(menu.state.isOpen).to.be.false;
      });

      it('should only trigger onStateChange callback if state actually changes', () => {
        let isOpen = true;
        let called = false;

        const callback = () => {
          isOpen = false;
          called = true;
        };
        const ParentComponent = React.createClass({
          getInitialState() {
            return { example: true };
          },
          triggerRender() {
            this.setState({ example: !this.state.example });
          },
          render() {
            return <Menu ref="menu" onStateChange={ callback } isOpen={ isOpen } />;
          }
        });

        const parent = TestUtils.renderIntoDocument(<ParentComponent />, container);
        const menu = parent.refs.menu;
        menu.setState({isOpen: false});
        called = false; // reset called
        parent.triggerRender();
        expect(menu.state.isOpen).to.be.false;
        expect(called).to.be.false;
      });
    });
  });
});
