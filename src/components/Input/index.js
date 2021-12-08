import React from 'react';

import StyledTextInput from './StyledTextInput';

function Input(props) {
  const { style, onChangeText, value, placeholder } = props;
  return (
    <StyledTextInput
      style={style}
      onChangeText={onChangeText}
      value={value}
      maxLength={20}
      placeholder={placeholder}
      placeholderTextColor="#808080"
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}

export default Input;
