"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _PanContainer = _interopRequireDefault(require("./PanContainer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SwipeContainer = ({
  children,
  close,
  setIsDragging,
  disableSwipe
}) => {
  return disableSwipe ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children) : /*#__PURE__*/_react.default.createElement(_PanContainer.default, {
    setIsDragging: setIsDragging,
    close: close
  }, children);
};
var _default = exports.default = SwipeContainer;
//# sourceMappingURL=SwipeContainer.js.map