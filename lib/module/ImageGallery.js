import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Dimensions, FlatList, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import ImagePreview from './ImagePreview';
import SwipeContainer from './SwipeContainer';
const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get('window');
const defaultProps = {
  hideThumbs: false,
  resizeMode: 'contain',
  thumbColor: '#d9b44a',
  thumbResizeMode: 'cover',
  thumbSize: 48
};
const ImageGallery = props => {
  const {
    close,
    hideThumbs,
    images,
    initialIndex,
    isOpen,
    renderCustomImage,
    renderCustomThumb,
    renderFooterComponent,
    renderHeaderComponent,
    resizeMode,
    thumbColor,
    thumbResizeMode,
    thumbSize,
    disableSwipe
  } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const keyExtractorThumb = (item, index) => item && item.id ? item.id.toString() : index.toString();
  const keyExtractorImage = (item, index) => item && item.id ? item.id.toString() : index.toString();
  const scrollToIndex = i => {
    setActiveIndex(i);
    if (topRef !== null && topRef !== void 0 && topRef.current) {
      topRef.current.scrollToIndex({
        animated: true,
        index: i
      });
    }
    if (bottomRef !== null && bottomRef !== void 0 && bottomRef.current) {
      if (i * (thumbSize + 10) - thumbSize / 2 > deviceWidth / 2) {
        var _bottomRef$current;
        bottomRef === null || bottomRef === void 0 || (_bottomRef$current = bottomRef.current) === null || _bottomRef$current === void 0 || _bottomRef$current.scrollToIndex({
          animated: true,
          index: i
        });
      } else {
        var _bottomRef$current2;
        bottomRef === null || bottomRef === void 0 || (_bottomRef$current2 = bottomRef.current) === null || _bottomRef$current2 === void 0 || _bottomRef$current2.scrollToIndex({
          animated: true,
          index: 0
        });
      }
    }
  };
  const renderItem = ({
    item,
    index
  }) => {
    return /*#__PURE__*/React.createElement(ImagePreview, {
      index: index,
      isSelected: activeIndex === index,
      item: item,
      resizeMode: resizeMode,
      renderCustomImage: renderCustomImage
    });
  };
  const renderThumb = ({
    item,
    index
  }) => {
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: () => scrollToIndex(index),
      activeOpacity: 0.8
    }, renderCustomThumb ? renderCustomThumb(item, index, activeIndex === index) : /*#__PURE__*/React.createElement(Image, {
      resizeMode: thumbResizeMode,
      style: activeIndex === index ? [styles.thumb, styles.activeThumb, {
        borderColor: thumbColor
      }, {
        width: thumbSize,
        height: thumbSize
      }] : [styles.thumb, {
        width: thumbSize,
        height: thumbSize
      }],
      source: {
        uri: item.thumbUrl ? item.thumbUrl : item.url
      }
    }));
  };
  const onMomentumEnd = e => {
    const {
      x
    } = e.nativeEvent.contentOffset;
    scrollToIndex(Math.round(x / deviceWidth));
  };
  useEffect(() => {
    if (isOpen && initialIndex) {
      setActiveIndex(initialIndex);
    } else if (!isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen, initialIndex]);
  const getImageLayout = useCallback((_, index) => {
    return {
      index,
      length: deviceWidth,
      offset: deviceWidth * index
    };
  }, []);
  const getThumbLayout = useCallback((_, index) => {
    return {
      index,
      length: thumbSize,
      offset: thumbSize * index
    };
  }, [thumbSize]);
  return /*#__PURE__*/React.createElement(Modal, {
    animationType: isOpen ? 'slide' : 'fade',
    visible: isOpen
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(SwipeContainer, {
    disableSwipe: disableSwipe,
    setIsDragging: setIsDragging,
    close: close
  }, /*#__PURE__*/React.createElement(FlatList, {
    initialScrollIndex: initialIndex,
    getItemLayout: getImageLayout,
    data: images,
    horizontal: true,
    keyExtractor: keyExtractorImage,
    onMomentumScrollEnd: onMomentumEnd,
    pagingEnabled: true,
    ref: topRef,
    renderItem: renderItem,
    scrollEnabled: !isDragging,
    showsHorizontalScrollIndicator: false
  })), hideThumbs ? null : /*#__PURE__*/React.createElement(FlatList, {
    initialScrollIndex: initialIndex,
    getItemLayout: getThumbLayout,
    contentContainerStyle: styles.thumbnailListContainer,
    data: props.images,
    horizontal: true,
    keyExtractor: keyExtractorThumb,
    pagingEnabled: true,
    ref: bottomRef,
    renderItem: renderThumb,
    showsHorizontalScrollIndicator: false,
    style: [styles.bottomFlatlist, {
      bottom: thumbSize
    }]
  }), renderHeaderComponent ? /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, renderHeaderComponent(images[activeIndex], activeIndex)) : null, renderFooterComponent ? /*#__PURE__*/React.createElement(View, {
    style: styles.footer
  }, renderFooterComponent(images[activeIndex], activeIndex)) : null));
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
    height: deviceHeight,
    justifyContent: 'center',
    width: deviceWidth
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  footer: {
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  activeThumb: {
    borderWidth: 3
  },
  thumb: {
    borderRadius: 12,
    marginRight: 10
  },
  thumbnailListContainer: {
    paddingHorizontal: 10
  },
  bottomFlatlist: {
    position: 'absolute'
  }
});
ImageGallery.defaultProps = defaultProps;
export default ImageGallery;
//# sourceMappingURL=ImageGallery.js.map