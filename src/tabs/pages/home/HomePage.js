import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import styled from 'styled-components/native';

import { storage, data } from '../../../config';

const { getToken } = storage;
const { menuItems } = data;

const MenuButton = styled.TouchableOpacity`
  align-items: center;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  width: 84px;
  height: 84px;
  margin: 8px 10px;

  background: #fff;
  box-shadow: 0 1px 5px rgba(15, 32, 91, 0.15);
  border: ${props => (props.active ? '1px solid  #828cf4' : '0.5px solid rgba(0, 0, 0, 0.13)')};
`;

export default function HomePage({ props, route, navigation }) {
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
    navigation.navigate('WEBVIEW', { url: web_url });
  }

  return (
    <SafeAreaView>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: 312,
            marginTop: 16,
          }}
        >
          {menuItems.map((menuItem, i) => {
            const { id, text, active, inactive, url, width, height } = menuItem;
            if (menu.findIndex(item => item.menu_id === id) !== -1) {
              return (
                <MenuButton key={i} onPress={() => goWebView(url)}>
                  <Wrapper active>
                    <Image source={active} style={{ width: width, height: height }} />
                  </Wrapper>
                  <Text style={styles.itemName}>{text}</Text>
                </MenuButton>
              );
            }
            return (
              <MenuButton key={i}>
                <Wrapper>
                  <Image source={inactive} style={{ width: width, height: height }} />
                </Wrapper>
                <Text style={styles.itemName}>{text}</Text>
              </MenuButton>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 84,
    height: 84,
    marginVertical: 24,
    marginHorizontal: 10,
  },
  itemName: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemDescription: {
    fontWeight: 'normal',
    fontSize: 11,
    color: '#4d5df0',
  },
});
