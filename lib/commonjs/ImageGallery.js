"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _ImagePreview = _interopRequireDefault(require("./ImagePreview"));
var _SwipeContainer = _interopRequireDefault(require("./SwipeContainer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  height: deviceHeight,
  width: deviceWidth
} = _reactNative.Dimensions.get('window');
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
  const [activeIndex, setActiveIndex] = (0, _react.useState)(0);
  const [isDragging, setIsDragging] = (0, _react.useState)(false);
  const topRef = (0, _react.useRef)(null);
  const bottomRef = (0, _react.useRef)(null);
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
    return /*#__PURE__*/_react.default.createElement(_ImagePreview.default, {
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: () => scrollToIndex(index),
      activeOpacity: 0.8
    }, renderCustomThumb ? renderCustomThumb(item, index, activeIndex === index) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
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
  (0, _react.useEffect)(() => {
    if (isOpen && initialIndex) {
      setActiveIndex(initialIndex);
    } else if (!isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen, initialIndex]);
  const getImageLayout = (0, _react.useCallback)((_, index) => {
    return {
      index,
      length: deviceWidth,
      offset: deviceWidth * index
    };
  }, []);
  const getThumbLayout = (0, _react.useCallback)((_, index) => {
    return {
      index,
      length: thumbSize,
      offset: thumbSize * index
    };
  }, [thumbSize]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    animationType: isOpen ? 'slide' : 'fade',
    visible: isOpen
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_SwipeContainer.default, {
    disableSwipe: disableSwipe,
    setIsDragging: setIsDragging,
    close: close
  }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
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
  })), hideThumbs ? null : /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
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
  }), renderHeaderComponent ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.header
  }, renderHeaderComponent(images[activeIndex], activeIndex)) : null, renderFooterComponent ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.footer
  }, renderFooterComponent(images[activeIndex], activeIndex)) : null));
};
const styles = _reactNative.StyleSheet.create({
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
var _default = exports.default = ImageGallery;
//# sourceMappingURL=ImageGallery.js.map