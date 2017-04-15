import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';

function createComponent(jsx) {
  const renderer = new ReactShallowRenderer();
  renderer.render(jsx);
  return renderer.getRenderOutput();
}

export default createComponent;
