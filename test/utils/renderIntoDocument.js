import React from 'react';
import TestUtils from 'react-dom/test-utils';

function renderIntoDocument(jsx) {
  class Wrapper extends React.Component {
    render() {
      return this.props.children;
    }
  }
  return TestUtils.renderIntoDocument(<Wrapper>{jsx}</Wrapper>);
}

export default renderIntoDocument;
