import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import RNRestart from 'react-native-restart';

import Wrapper from './components/DrawerItem/Wrapper';
import { DrawerItem, ImageButton } from './components';
import { TextButton } from '../../../components';
import { storage, data } from '../../../config';

const { getToken, removeToken } = storage;
const { drawerItems } = data;

function DrawerContent(props) {
  const [auth, setAuth] = useState({ cmdCode: '', id: '', token: '', data: [] });

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const auth = await getToken('auth');
    setAuth(auth);
  }

  function goWebView(item) {
    let web_url = item + `?cmdCode=${auth.cmdCode}&usrID=${auth.id}&usrTK=${auth.token}`;
    props.navigation.navigate('WEBVIEW', { url: web_url });
  }

  async function onPressLogout() {
    removeToken('auth');

    const isLogin = await getToken('auth');
    if (isLogin === null) return RNRestart.Restart();
  }

  return (
    <DrawerContentScrollView {...props}>
      <Wrapper style={styles.border}>
        <View style={styles.closeIcon} />
        <ImageButton
          onPress={() => props.navigation.closeDrawer()}
          source={require('../../../../images/drawer/cancel.png')}
          imageStyle={styles.closeIcon}
        />
      </Wrapper>
      {drawerItems.map((drawerItem, i) => {
        const { id, text, image, url } = drawerItem;
        if (auth.data.findIndex(item => item.menu_id === id) !== -1)
          return <DrawerItem key={i} onPress={() => goWebView(url)} image={image} text={text} />;
        return <DrawerItem key={i} image={image} text={text} />;
      })}
      <TextButton onPress={onPressLogout} text="로그아웃" style={styles.textButtonPosition} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    width: 25,
    height: 24,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#adb5bd',
  },
  textButtonPosition: {
    marginTop: 260,
  },
});

export default DrawerContent;
