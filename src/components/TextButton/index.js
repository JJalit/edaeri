import React from 'react';

import StyledPressable from './StyledPressable';
import StyledText from './StyledText';

function TextButton(props) {
  const { style, onPress, text } = props;
  return (
    <StyledPressable onPress={onPress} style={style}>
      <StyledText>{text}</StyledText>
    </StyledPressable>
  );
}

export default TextButton;
