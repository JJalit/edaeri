import React from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native";
import { useEffect } from "react";
import { BackHandler } from "react-native";

const HomeWebViewPage = ({ route, navigation }) => {
  const { url } = route.params;

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      navigation.reset({
        routes: [{ name: "HOME" }],
        key: "홈",
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const injectedJavascript = `(function() {
      window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };
  })()`;  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <WebView 
          source={{ uri: url }}
          javaScriptEnable={true}
            injectedJavaScript={injectedJavascript}
            onMessage={(event) => {
              console.log(event);
              if (event) {
                navigation.reset({
                  routes: [{ name: "HOME" }],
                  key: "홈",
                });
              } else {
                console.log("not event");
              }
            }}
         />
    </SafeAreaView>
  );
};

export default HomeWebViewPage;
