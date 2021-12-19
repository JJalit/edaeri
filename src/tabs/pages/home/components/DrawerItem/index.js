import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

import Wrapper from './Wrapper';
import ImageWrapper from './ImageWrapper';
import StyledText from './StyledText';

function DrawerItem(props) {
  const { style, image, text, onPress } = props;
  return (
    <Pressable style={style} onPress={onPress}>
      <Wrapper item>
        <ImageWrapper>
          <Image source={image} style={styles.image} />
          <StyledText>{text}</StyledText>
        </ImageWrapper>
        <Image source={require('../../../../../../images/drawer/arrow.png')} style={styles.arrowIcon} />
      </Wrapper>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 28,
    height: 28,
  },
  arrowIcon: {
    width: 12,
    height: 12,
  },
});

export default DrawerItem;
