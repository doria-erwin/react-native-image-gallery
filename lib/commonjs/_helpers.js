"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pow2abs = exports.getScale = exports.getDistance = void 0;
const pow2abs = (a, b) => {
  return Math.pow(Math.abs(a - b), 2);
};
exports.pow2abs = pow2abs;
const getDistance = touches => {
  const [a, b] = touches;
  if (a == null || b == null) {
    return 0;
  }
  return Math.sqrt(pow2abs(a.pageX, b.pageX) + pow2abs(a.pageY, b.pageY));
};
exports.getDistance = getDistance;
const getScale = (currentDistance, initialDistance) => {
  return currentDistance / initialDistance * 1.2;
};
exports.getScale = getScale;
//# sourceMappingURL=_helpers.js.map