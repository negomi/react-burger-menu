export default () => {
  let Snap;
  try {
    Snap = require('snapsvg-cjs');
  } finally {
    return Snap;
  }
};
