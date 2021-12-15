import React from 'react';

import StyledView from './StyledView';
import Input from '../Input';

function ImageInput(props) {
  const { style, source, onChangeText, value, placeholder, password } = props;
  return (
    <StyledView style={style}>
      <Input onChangeText={onChangeText} value={value} placeholder={placeholder} password={password} />
    </StyledView>
  );
}

export default ImageInput;
