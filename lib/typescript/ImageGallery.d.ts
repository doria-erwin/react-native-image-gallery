import React from 'react';
import { IProps } from './types';
declare const defaultProps: {
    hideThumbs: boolean;
    resizeMode: string;
    thumbColor: string;
    thumbResizeMode: string;
    thumbSize: number;
};
declare const ImageGallery: {
    (props: IProps & typeof defaultProps): React.JSX.Element;
    defaultProps: {
        hideThumbs: boolean;
        resizeMode: string;
        thumbColor: string;
        thumbResizeMode: string;
        thumbSize: number;
    };
};
export default ImageGallery;
