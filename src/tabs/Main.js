import React, { useEffect } from 'react';
import { Alert, BackHandler, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MailPage from './pages/mail/MailPage';
import LetterPage from './pages/letter/LetterPage';
import TodoPage from './pages/todo/TodoPage';
import HomePage from './pages/home/HomeRoutePage';

const Tab = createBottomTabNavigator();

const resetHomeStackOnTabPress = ({ navigation, route }) => ({
  tabPress: e => {
    console.log(navigation.dispatch);
    navigation.reset({
      index: 0,
      routes: [{ name: '홈' }],
    });
  },
});

const resetMailStackOnTabPress = ({ navigation, route }) => ({
  tabPress: e => {
    console.log(navigation.dispatch);
    navigation.reset({
      routes: [{ name: '메일' }],
      key: '홈',
    });
  },
});

const resetLetterStackOnTabPress = ({ navigation, route }) => ({
  tabPress: e => {
    console.log(navigation.dispatch);
    navigation.reset({
      routes: [{ name: '쪽지' }],
    });
  },
});

const resetTodoStackOnTabPress = ({ navigation, route }) => ({
  tabPress: e => {
    console.log(navigation.dispatch);
    navigation.reset({
      routes: [{ name: '나의할일' }],
    });
  },
});

export default function MainPage(props) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('', '앱을 종료하시겠습니까?', [
        {
          text: '취소',
          onPress: () => null,
        },
        { text: '확인', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);
  return (
    <NavigationContainer independent="true">
      <Tab.Navigator
        initialRouteName="홈"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#4f61e7',
          tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.38)',
          tabBarStyle: {
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            height: 90,
            backgroundColor: 'white',
          },
          tabBarLabelStyle: {
            marginBottom: 10,
            fontSize: 13,
            fontWeight: 'bold',
          },
          labelPosition: 'below-icon',
          tabBarLabel: route.name,
          tabBarIcon: ({ size, focused }) => TabBarIcon(route.name, size, focused),
        })}
      >
        <Tab.Screen
          name="홈"
          component={HomePage}
          options={{ headerShown: false }}
          initialParams={props.route.params}
          listeners={resetHomeStackOnTabPress}
        />
        <Tab.Screen name="메일" component={MailPage} options={{ headerShown: false }} listeners={resetMailStackOnTabPress} />
        <Tab.Screen name="쪽지" component={LetterPage} options={{ headerShown: false }} listeners={resetLetterStackOnTabPress} />
        <Tab.Screen name="나의할일" component={TodoPage} options={{ headerShown: false }} listeners={resetTodoStackOnTabPress} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const TabBarIcon = (name, size, focused) => {
  let iconImagePath;
  if (name === '홈') {
    iconImagePath = focused ? require('../../images/home_color.png') : require('../../images/home.png');
  } else if (name === '메일') {
    iconImagePath = focused ? require('../../images/mail_color.png') : require('../../images/mail.png');
  } else if (name === '쪽지') {
    iconImagePath = focused ? require('../../images/message_color.png') : require('../../images/message.png');
  } else {
    iconImagePath = focused ? require('../../images/todo_color.png') : require('../../images/todo.png');
  }
  return (
    <Image
      style={{
        marginBottom: 15,
        width: size * 1.1,
        height: size * 1.1,
      }}
      source={iconImagePath}
    />
  );
};
