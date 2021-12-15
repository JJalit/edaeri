import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import RNRestart from 'react-native-restart';

import { storage } from '../../../config';
import { TextButton } from '../../../components';

const { getToken, removeToken } = storage;

function CustomDrawerContent(props) {
  const [cmdCode, setCmdCode] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const cmdCode = await getToken('cmdCode');
    const id = await getToken('id');
    const token = await getToken('token');
    const mainData = await getToken('mainData');

    setCmdCode(cmdCode);
    setId(id);
    setToken(token);
    setMenu(mainData);
  }

  function goWebView(item) {
    var web_url = item + `?cmdCode=${cmdCode}&usrID=${id}&usrTK=${token}`;
    props.navigation.navigate('WEBVIEW', { url: web_url });
  }

  async function onPressLogout() {
    removeToken('isAutoLogin');
    removeToken('token');
    removeToken('id');
    removeToken('pw');
    removeToken('cmdCode');
    removeToken('mainData');

    const userData = await getToken('token');

    if (userData == null) {
      RNRestart.Restart();
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      {menu.map((item, idx) => (
        <DrawerItem label={item.menu_name} onPress={() => goWebView(item.menu_url)} key={idx} />
      ))}
      <TextButton onPress={onPressLogout} text="로그아웃" />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
