import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MailPage({ navigation }) {
  let [cmdCode, setCmdCode] = useState('');
  let [id, setId] = useState('');
  let [token, setToken] = useState('');
  let [url, setUrl] = useState('');

  async function getUserData() {
    const cmdCode = await AsyncStorage.getItem('cmdCode');
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');

    const parseCmdCode = JSON.parse(cmdCode);
    const parseId = JSON.parse(id);
    const parseToken = JSON.parse(token);

    setCmdCode(parseCmdCode['cmdCode']);
    setId(parseId['id']);
    setToken(parseToken['token']);
    setUrl('https://erp.edaeri.com/gw/app/email/Email.jsp?cmdCode=' + cmdCode + '&usrID=' + id + '&usrTK=' + token);
  }
  getUserData();

  const injectedJavascript = `(function() {
            window.postMessage = function(data) {
          window.ReactNativeWebView.postMessage(data);
        };
      })()`;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <WebView
        source={{ uri: url }}
        javaScriptEnable={true}
        injectedJavaScript={injectedJavascript}
        onMessage={event => {
          console.log(event);
          if (event) {
            navigation.reset({
              routes: [{ name: '홈' }],
            });
          } else {
            console.log('not event');
          }
        }}
      />
    </SafeAreaView>
  );
}
