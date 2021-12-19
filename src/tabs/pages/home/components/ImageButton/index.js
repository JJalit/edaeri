import React from 'react';
import { Image, Pressable } from 'react-native';

function ImageButton(props) {
  const { style, onPress, source, imageStyle } = props;
  return (
    <Pressable onPress={onPress} style={style}>
      <Image source={source} style={imageStyle} />
    </Pressable>
  );
}

export default ImageButton;
