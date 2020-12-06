"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var pxToNum = function pxToNum(val) {
  return parseInt(val.slice(0, -2), 10);
};
exports.pxToNum = pxToNum;