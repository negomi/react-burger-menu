import React from 'react';
import TestRenderer from 'react-test-renderer';

function createComponent(jsx) {
  return TestRenderer.create(jsx);
}

export default createComponent;
