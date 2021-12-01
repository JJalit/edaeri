import { useState } from "react";
import { WebView } from 'react-native-webview';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, Alert } from 'react-native';


export default function TodoPage({navigation}) {
        let [cmdCode2, setCmdCode] = useState("");
        let [id2, setId] = useState("");
        let [token2, setToken] = useState("");
        let [url, setUrl] = useState("");
    
    
          async function getUserData() {
              const cmdCode = await AsyncStorage.getItem('cmdCode');
              const id = await AsyncStorage.getItem('id');
              const token = await AsyncStorage.getItem('token');
    
              const parseCmdCode = JSON.parse(cmdCode);
              const parseId = JSON.parse(id);
              const parseToken = JSON.parse(token);
    
              setCmdCode(parseCmdCode["cmdCode"]);
              setId(parseId["id"]);
              setToken(parseToken["token"]);
              setUrl("https://erp.edaeri.com/gw/app/groupware/task/TaskTodo.jsp?cmdCode="+cmdCode2+"&usrID="+id2+"&usrTK="+token2)
    
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
                source={{uri: url}}
                javaScriptEnable={true}
                injectedJavaScript={injectedJavascript}
                onMessage={(event) => {
                  console.log(event);
                  if (event) {
                    navigation.reset({
                      routes: [{ name: "홈" }],
                    });
                  } else {
                    console.log("not event");
                  }
                }}
            />
            </SafeAreaView>
      );
  }