import React from 'react';
import { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CustomDrawerContent(props) {
  let [cmdCode2, setCmdCode] = useState('');
  let [id2, setId] = useState('');
  let [token2, setToken] = useState('');

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    async function getUserData() {
      const cmdCode = await AsyncStorage.getItem('cmdCode');
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');
      const getMainData = await AsyncStorage.getItem('mainData');

      const parseCmdCode = JSON.parse(cmdCode);
      const parseId = JSON.parse(id);
      const parseToekn = JSON.parse(token);
      const parseGetMainData = JSON.parse(getMainData);

      setCmdCode(parseCmdCode['cmdCode']);
      setId(parseId['id']);
      setToken(parseToekn['token']);
      setMenu(parseGetMainData['data']);
    }
    getUserData();
  });

  function goWebView(item) {
    var web_url = item + `?cmdCode=${cmdCode2}&usrID=${id2}&usrTK=${token2}`;
    props.navigation.navigate('WEBVIEW', {
      url: web_url,
    });
  }

  return (
    <DrawerContentScrollView {...props}>
      {menu.map((item, idx) => (
        <DrawerItem label={item.menu_name} onPress={() => goWebView(item.menu_url)} key={idx} />
      ))}
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
