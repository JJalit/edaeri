import React from 'react';

import StyledView from './StyledView';
import Input from '../Input';

function ImageInput(props) {
  const { style, onChangeText, value, placeholder, password } = props;

  const styles = {
    border: {
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <StyledView style={[style, styles.border]}>
      <Input onChangeText={onChangeText} value={value} placeholder={placeholder} password={password} />
    </StyledView>
  );
}

export default ImageInput;
