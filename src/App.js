import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import MainPage from './tabs/Main.js';

const Stack = createStackNavigator();
function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LOGIN">
        <Stack.Screen name="LOGIN" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="REGISTER" component={RegisterPage} options={{ headerShown: false }} />
        <Stack.Screen name="MAIN" component={MainPage} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
