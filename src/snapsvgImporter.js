export default () => {
  let Snap;
  try {
    Snap = require('snapsvg');
  } finally {
    return Snap;
  }
};
