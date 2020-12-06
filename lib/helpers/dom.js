'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.focusOnFirstMenuItem = focusOnFirstMenuItem;
exports.focusOnLastMenuItem = focusOnLastMenuItem;
exports.focusOnCrossButton = focusOnCrossButton;
exports.focusOnMenuButton = focusOnMenuButton;
exports.focusOnMenuItem = focusOnMenuItem;
exports.focusOnNextMenuItem = focusOnNextMenuItem;
exports.focusOnPreviousMenuItem = focusOnPreviousMenuItem;

function focusOnFirstMenuItem() {
  var firstItem = Array.from(document.getElementsByClassName('bm-item')).shift();
  if (firstItem) {
    firstItem.focus();
  }
}

function focusOnLastMenuItem() {
  var lastItem = Array.from(document.getElementsByClassName('bm-item')).pop();
  if (lastItem) {
    lastItem.focus();
  }
}

function focusOnCrossButton() {
  var crossButton = document.getElementById('react-burger-cross-btn');
  if (crossButton) {
    crossButton.focus();
  }
}

function focusOnMenuButton() {
  var menuButton = document.getElementById('react-burger-menu-btn');
  if (menuButton) {
    menuButton.focus();
  }
}

function focusOnMenuItem(siblingType) {
  if (document.activeElement.className.includes('bm-item')) {
    var sibling = document.activeElement[siblingType];
    if (sibling) {
      sibling.focus();
    } else {
      focusOnCrossButton();
    }
  } else {
    if (siblingType === 'previousElementSibling') {
      focusOnLastMenuItem();
    } else {
      focusOnFirstMenuItem();
    }
  }
}

function focusOnNextMenuItem() {
  focusOnMenuItem('nextElementSibling');
}

function focusOnPreviousMenuItem() {
  focusOnMenuItem('previousElementSibling');
}