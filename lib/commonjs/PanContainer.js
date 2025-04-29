"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _helpers = require("./_helpers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PanContainer = ({
  children,
  close,
  setIsDragging
}) => {
  const translationXY = (0, _react.useRef)(new _reactNative.Animated.ValueXY()).current;
  const scale = (0, _react.useRef)(new _reactNative.Animated.Value(1)).current;
  let _initialTouches = (0, _react.useRef)().current;
  const onRelease = (_, gestureState) => {
    setIsDragging(false);
    if (gestureState.dy > 180 && _initialTouches.length === 1) {
      close();
      return false;
    }
    _reactNative.Animated.parallel([_reactNative.Animated.timing(scale, {
      duration: 100,
      toValue: 1,
      useNativeDriver: true
    }), _reactNative.Animated.timing(translationXY.x, {
      duration: 100,
      toValue: 0,
      useNativeDriver: true
    }), _reactNative.Animated.timing(translationXY.y, {
      duration: 100,
      toValue: 0,
      useNativeDriver: true
    })]).start();
  };
  const panResponder = _react.default.useRef(_reactNative.PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      const absDx = Math.abs(gestureState.dx);
      const absDY = Math.abs(gestureState.dy);
      if (absDY > 5 && absDx <= 2 && gestureState.numberActiveTouches <= 1) {
        return true;
      }
      if (absDx > 0 && gestureState.numberActiveTouches <= 1) {
        return false;
      }
      return true;
    },
    // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: evt => {
      setIsDragging(true);
      _initialTouches = evt.nativeEvent.touches;
      translationXY.setOffset({
        x: 0,
        y: 0
      });
      return true;
    },
    onPanResponderMove: (evt, gestureState) => {
      const {
        touches
      } = evt.nativeEvent;
      if (touches.length <= 1 && Math.abs(gestureState.dy) > 10) {
        translationXY.y.setValue(gestureState.dy);
        return true;
      }
      if (touches.length <= 1 && Math.abs(gestureState.dx) > 0) {
        setIsDragging(false);
        return false;
      }
      if (touches.length < 2) {
        // Trigger a release
        onRelease(evt, gestureState);
        return false;
      }
      const {
        dx,
        dy
      } = gestureState;
      translationXY.x.setValue(dx);
      translationXY.y.setValue(dy);
      // for scaling photo
      const currentDistance = (0, _helpers.getDistance)(touches);
      const initialDistance = (0, _helpers.getDistance)(_initialTouches);
      const newScale = (0, _helpers.getScale)(currentDistance, initialDistance);
      scale.setValue(newScale);
      return true;
    },
    onPanResponderTerminationRequest: () => {
      return true;
    },
    onPanResponderRelease: (evt, gestureState) => {
      onRelease(evt, gestureState);
      return true;
    },
    onPanResponderTerminate: () => true
  })).current;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, _extends({}, panResponder.panHandlers, {
    style: {
      transform: [{
        translateX: translationXY.x
      }, {
        translateY: translationXY.y
      }, {
        scale: scale
      }]
    }
  }), children));
};
var _default = exports.default = PanContainer;
//# sourceMappingURL=PanContainer.js.map