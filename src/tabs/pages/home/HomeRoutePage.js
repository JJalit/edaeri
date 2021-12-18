import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from './DrawerContent';
import HomeWebViewPage from './HomeWebView';
import HomePage from './HomePage';

const Drawer = createDrawerNavigator();

export default function HomeRoutePage() {
  return (
    <NavigationContainer independent="true">
      <Drawer.Navigator initialRouteName="Drawer" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="HOME"
          component={HomePage}
          options={{
            headerTitleAlign: 'center',
            headerShown: true,
            gestureEnabled: false,
            headerTitle: () => <Image source={require('../../../../images/ic_logo.png')} style={styles.ImageStyle1} />,
          }}
        />
        <Drawer.Screen name="WEBVIEW" component={HomeWebViewPage} options={{ headerShown: false, gestureEnabled: true }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  ImageStyle1: {
    height: 30,
    width: 78,
  },
  ImageStyle2: {
    width: 24,
    height: 24,
  },
});
