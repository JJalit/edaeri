import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

import Screen from '../../../components/Screen';
import { storage } from '../../../config';

const { getToken } = storage;

const injectedJavascript = `(function() {
  window.postMessage = function(data) {
window.ReactNativeWebView.postMessage(data);
};
})()`;

export default function LetterPage({ navigation }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const auth = await getToken('auth');

    setUrl(`https://erp.edaeri.com/gw/app/groupware/note/Note.jsp?cmdCode=${auth.cmdCode}&usrID=${auth.id}&usrTK=${auth.token}`);
  }

  const onMessage = e => {
    console.log(e);
    if (e) {
      navigation.reset({
        routes: [{ name: '홈' }],
      });
    } else console.log('not event');
  };

  return (
    <Screen>
      <WebView
        source={{ uri: url, headers: { viewType: 'webView' } }}
        startInLoadingState={true}
        originWhitelist={'*'}
        javaScriptEnable={true}
        injectedJavaScript={injectedJavascript}
        onMessage={onMessage}
      />
    </Screen>
  );
}
