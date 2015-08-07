var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

export default createComponent;

function createComponent(jsx) {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(jsx);
  return shallowRenderer.getRenderOutput();
}
