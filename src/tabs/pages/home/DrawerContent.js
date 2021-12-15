import React from 'react';
import { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { storage } from '../../../config';

const { getToken } = storage;

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

  return (
    <DrawerContentScrollView {...props}>
      {menu.map((item, idx) => (
        <DrawerItem label={item.menu_name} onPress={() => goWebView(item.menu_url)} key={idx} />
      ))}
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
