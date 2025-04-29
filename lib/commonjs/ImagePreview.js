"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  height,
  width
} = _reactNative.Dimensions.get('window');
const ImagePreview = ({
  index,
  isSelected,
  item,
  renderCustomImage,
  resizeMode
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => {}
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.containerStyle
  }, renderCustomImage ? renderCustomImage(item, index, isSelected) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    resizeMode: resizeMode,
    source: {
      uri: item.url
    },
    style: styles.image
  }))));
};
const styles = _reactNative.StyleSheet.create({
  containerStyle: {
    height,
    width
  },
  image: {
    height: '100%',
    width: '100%'
  }
});
var _default = exports.default = ImagePreview;
//# sourceMappingURL=ImagePreview.js.map