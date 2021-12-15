import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import { storage } from '../../../config';

const { getToken } = storage;

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
      <FlatGrid
        itemDimension={100}
        data={menu}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goWebView(item.menu_url)}>
            <View style={[styles.itemContainer, { backgroundColor: '#FFFFFF' }]}>
              <Text style={styles.itemName}>{item.menu_name}</Text>
              <Text style={styles.itemDescription}>{item.menu_name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  ImageStyle1: {
    marginLeft: -30,
    height: 35,
    width: 50,
    resizeMode: 'stretch',
  },
  ImageStyle2: {
    height: 50,
    width: 100,
    resizeMode: 'stretch',
  },

  ImageStyle3: {
    marginRight: -30,
    height: 40,
    width: 40,
    resizeMode: 'stretch',
  },

  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  itemName: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  itemDescription: {
    fontWeight: 'normal',
    fontSize: 11,
    color: '#4d5df0',
  },
});
