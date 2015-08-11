import jsdom from 'jsdom';

// From mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}

function dom() {
  // Set up the simplest document possible.
  let doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

  // Get the window object out of the document.
  let win = doc.defaultView;

  // Set globals for Mocha that make access to document and window feel
  // natural in the test environment.
  global.document = doc;
  global.window = win;

  // Take all properties of the window object and also attach it to the
  // Mocha global object.
  propagateToGlobal(win);
}

dom();
