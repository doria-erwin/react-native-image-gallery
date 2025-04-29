import React from 'react';
import PanContainer from './PanContainer';
const SwipeContainer = ({
  children,
  close,
  setIsDragging,
  disableSwipe
}) => {
  return disableSwipe ? /*#__PURE__*/React.createElement(React.Fragment, null, children) : /*#__PURE__*/React.createElement(PanContainer, {
    setIsDragging: setIsDragging,
    close: close
  }, children);
};
export default SwipeContainer;
//# sourceMappingURL=SwipeContainer.js.map