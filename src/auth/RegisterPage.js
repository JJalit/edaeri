import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native';

const RegisterPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <WebView source={{ uri: 'https://www.edaeri.com/#/joinAgreement' }} />
    </SafeAreaView>
  );
};

export default RegisterPage;
