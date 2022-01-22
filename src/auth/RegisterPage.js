import React from 'react';
import { WebView } from 'react-native-webview';

import Screen from '../components/Screen';

const RegisterPage = () => {
  return (
    <Screen>
      <WebView source={{ uri: 'https://www.edaeri.com/#/joinAgreement' }} startInLoadingState={true} originWhitelist={'*'} />
    </Screen>
  );
};

export default RegisterPage;
