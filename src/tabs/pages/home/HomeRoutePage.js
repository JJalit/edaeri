import React from "react";
import {
  NavigationContainer
} from "@react-navigation/native";
import {
  createDrawerNavigator
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";

import DrawerContent from "./DrawerContent";

import HomeWebViewPage from "./HomeWebView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomePage from "./HomePage";
import RNRestart from "react-native-restart";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import LogoImage from "../../../../images/ic_logo.png";
import RightImage from "../../../../images/ic_out.png";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function HomeRoutePage({ route, navigation }) {
  useEffect(() => {
    AsyncStorage.setItem(
      "mainData",
      JSON.stringify({
        data: route.params.data,
      })
    );
  });

  async function onPressLogout() {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("id");
    AsyncStorage.removeItem("pw");
    AsyncStorage.removeItem("cmdCode");
    AsyncStorage.removeItem("mainData");

    const isAutoLogin = await AsyncStorage.getItem("isAutoLogin");
    if (isAutoLogin == "true") {
      AsyncStorage.setItem("isAutoLogin", "false");
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("id");
      AsyncStorage.removeItem("pw");
      AsyncStorage.removeItem("mainData");
      AsyncStorage.removeItem("cmdCode");
    }
    const userData = await AsyncStorage.getItem("token");

    if (userData == null) {
      RNRestart.Restart();
    }
  }

  return (
    <NavigationContainer independent="true">
      <Drawer.Navigator
        initialRouteName="Drawer"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="HOME"
          component={HomePage}
          options={{
            headerTitleAlign: 'center',
            headerShown: true,
            gestureEnabled: false,
            headerTitle: () => (
              <Image source={LogoImage} style={styles.ImageStyle2} />
            ),
            headerRight: () => (
              <TouchableOpacity onPress={onPressLogout}>
                <Image source={RightImage} style={styles.ImageStyle3} />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="WEBVIEW"
          component={HomeWebViewPage}
          options={{ headerShown: false, gestureEnabled: true }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  ImageStyle1: {
    marginLeft: 10,
    height: 35,
    width: 45,
    resizeMode: "stretch",
  },
  ImageStyle2: {
    height: 40,
    width: 80,
    resizeMode: "stretch",
  },
  ImageStyle3: {
    height: 40,
    width: 45,
    resizeMode: "stretch",
    marginRight: 10,
  },
});