import React from 'react';
import CheckBox from '@react-native-community/checkbox';

import StyledView from './StyledView';
import StyledText from './StyledText';

function CheckBoxText(props) {
  const { style, value, onValueChange, onPress } = props;

  const styles = {
    checkbox: {
      height: 20,
      width: 20,
      marginRight: 10,
    },
  };
  return (
    <StyledView style={style}>
      <CheckBox
        style={styles.checkbox}
        boxType="square"
        value={value}
        onValueChange={onValueChange}
        animationDuration={0.5}
        onAnimationType="bounce"
        offAnimationType="bounce"
      />
      <StyledText onPress={onPress}>로그인 상태 유지</StyledText>
    </StyledView>
  );
}

export default CheckBoxText;
