import React from 'react';

import StyledButton from './StyledButton';
import StyledText from './StyledText';

function Button(props) {
  const { style, onPress, text } = props;
  return (
    <StyledButton style={style} activeOpacity={0.5} onPress={onPress}>
      <StyledText>{text}</StyledText>
    </StyledButton>
  );
}

export default Button;
