import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import RNRestart from 'react-native-restart';
import styled from 'styled-components/native';

import { storage, data } from '../../../config';
import { TextButton } from '../../../components';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const { getToken, removeToken } = storage;
const { drawerItems } = data;

const MenuButton = styled.Pressable``;

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background: #fff;

  width: 100%;
  padding: 24px 16px;
  border: ${props => (props.item ? '1px solid #f8f9fa' : 'none')};
`;

const ImageWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Dummy = styled.View`
  width: 25px;
  height: 24px;
`;

function CustomDrawerContent(props) {
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
      <Wrapper style={{ borderBottomWidth: 1, borderBottomColor: '#adb5bd' }}>
        <Dummy />
        <Pressable onPress={() => props.navigation.closeDrawer()}>
          <Image source={require('../../../../images/drawer/cancel.png')} style={{ width: 25, height: 24 }} />
        </Pressable>
      </Wrapper>
      {drawerItems.map((drawerItem, i) => {
        const { id, text, image, url } = drawerItem;
        if (auth.data.findIndex(item => item.menu_id === id) !== -1) {
          return (
            <MenuButton key={i} onPress={() => goWebView(url)}>
              <Wrapper item>
                <ImageWrapper>
                  <Image source={image} style={{ width: 28, height: 28 }} />
                  <Text style={styles.text}>{text}</Text>
                </ImageWrapper>
                <Image source={require('../../../../images/drawer/arrow.png')} style={{ width: 12, height: 12 }} />
              </Wrapper>
            </MenuButton>
          );
        }
        return (
          <MenuButton key={i}>
            <Wrapper item>
              <ImageWrapper>
                <Image source={image} style={{ width: 28, height: 28 }} />
                <Text style={styles.text}>{text}</Text>
              </ImageWrapper>
              <Image source={require('../../../../images/drawer/arrow.png')} style={{ width: 12, height: 12 }} />
            </Wrapper>
          </MenuButton>
        );
      })}
      <TextButton onPress={onPressLogout} text="로그아웃" style={{ marginTop: 260 }} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default CustomDrawerContent;
