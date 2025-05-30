import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
const {
  height,
  width
} = Dimensions.get('window');
const ImagePreview = ({
  index,
  isSelected,
  item,
  renderCustomImage,
  resizeMode
}) => {
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => {}
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.containerStyle
  }, renderCustomImage ? renderCustomImage(item, index, isSelected) : /*#__PURE__*/React.createElement(Image, {
    resizeMode: resizeMode,
    source: {
      uri: item.url
    },
    style: styles.image
  }))));
};
const styles = StyleSheet.create({
  containerStyle: {
    height,
    width
  },
  image: {
    height: '100%',
    width: '100%'
  }
});
export default ImagePreview;
//# sourceMappingURL=ImagePreview.js.map