export default () => {
  let Snap;
  try {
    // This will throw with Webpack.
    Snap = require('snapsvg');
  } finally {
    return Snap;
  }
};
