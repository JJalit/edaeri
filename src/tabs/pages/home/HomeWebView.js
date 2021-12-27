import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

import Screen from '../../../components/Screen';

const injectedJavascript = `(function() {
  window.postMessage = function(data) {
window.ReactNativeWebView.postMessage(data);
};
})()`;

const HomeWebViewPage = ({ route, navigation }) => {
  const { url } = route.params;

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      navigation.reset({
        routes: [{ name: 'HOME' }],
        key: '홈',
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  const onMessage = e => {
    console.log(e);
    if (e) {
      navigation.reset({
        routes: [{ name: 'HOME' }],
        key: '홈',
      });
    } else console.log('not event');
  };

  return (
    <Screen>
      <WebView
        source={{ uri: url, headers: { viewType: 'webView' } }}
        javaScriptEnable={true}
        injectedJavaScript={injectedJavascript}
        onMessage={onMessage}
      />
    </Screen>
  );
};

export default HomeWebViewPage;
