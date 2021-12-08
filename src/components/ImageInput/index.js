import React from 'react';

import StyledView from './StyledView';
import StyledImage from './StyledImage';
import Input from '../Input';

function ImageInput(props) {
  const { style, source, onChangeText, value, placeholder, password } = props;
  return (
    <StyledView style={style}>
      <StyledImage source={source} />
      <Input onChangeText={onChangeText} value={value} placeholder={placeholder} password={password} />
    </StyledView>
  );
}

export default ImageInput;
