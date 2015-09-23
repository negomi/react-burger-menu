import React from 'react';
import TestUtils from 'react-addons-test-utils';

export default createComponent;

function createComponent(jsx) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(jsx);
  return shallowRenderer.getRenderOutput();
}
