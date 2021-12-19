import React from 'react';
import { Image } from 'react-native';

import ImageWrapper from './ImageWrapper';
import MenuButton from './MenuButton';
import StyledText from './StyledText';

function MenuItem(props) {
  const { style, active, onPress, source, text, width, height } = props;
  return (
    <MenuButton activeOpacity={0.5} onPress={onPress} style={style}>
      <ImageWrapper active={active}>
        <Image source={source} style={{ width: width, height: height }} />
      </ImageWrapper>
      <StyledText>{text}</StyledText>
    </MenuButton>
  );
}

export default MenuItem;
