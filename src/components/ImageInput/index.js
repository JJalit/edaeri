import React from 'react';

import StyledView from './StyledView';
import StyledImage from './StyledImage';
import Input from '../Input';

function ImageInput(props) {
  const { style, source, onChangeText, value, placeholder } = props;
  return (
    <StyledView style={style}>
      <StyledImage source={source} />
      <Input onChangeText={onChangeText} value={value} placeholder={placeholder} />
    </StyledView>
  );
}

export default ImageInput;
