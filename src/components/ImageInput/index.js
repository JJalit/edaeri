import React from 'react';
import { Image, Pressable, View } from 'react-native';

import ErrorText from './ErrorText';
import StyledView from './StyledView';
import Input from '../Input';

function ImageInput(props) {
  const { style, onChangeText, value, placeholder, password, onClose, error, errorText } = props;

  const styles = {
    border: {
      borderBottomWidth: 1,
      borderBottomColor: error ? '#ff4127' : value.length > 0 ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)',
    },
    dummy: {
      height: 20,
      marginVertical: 6.5,
    },
  };

  return (
    <>
      <StyledView style={[style, styles.border]}>
        <Input onChangeText={onChangeText} value={value} placeholder={placeholder} password={password} />
        {value.length > 0 && (
          <Pressable onPress={onClose}>
            <Image source={require('../../../images/ion_close.png')} style={{ width: 13, height: 13 }} />
          </Pressable>
        )}
      </StyledView>
      {error ? <ErrorText>{errorText}</ErrorText> : <View style={styles.dummy} />}
    </>
  );
}

export default ImageInput;
