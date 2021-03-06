import React from 'react';

import StyledTextInput from './StyledTextInput';

function Input(props) {
  const { style, onBlur, onFocus, onChangeText, value, placeholder, password } = props;
  return (
    <StyledTextInput
      style={style}
      onBlur={onBlur}
      onFocus={onFocus}
      onChangeText={onChangeText}
      value={value}
      maxLength={20}
      placeholder={placeholder}
      placeholderTextColor="#808080"
      secureTextEntry={password}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
}

export default Input;
