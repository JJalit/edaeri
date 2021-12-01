import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatGrid } from 'react-native-super-grid';
import RNRestart from 'react-native-restart';

export default function HomePage({ props, route, navigation }) {
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
      const parseToken = JSON.parse(token);
      const parseGetMainData = JSON.parse(getMainData);

      setCmdCode(parseCmdCode['cmdCode']);
      setId(parseId['id']);
      setToken(parseToken['token']);
      setMenu(parseGetMainData['data']);
    }
    getUserData();
  });

  function goWebView(item) {
    var web_url = item + `?cmdCode=${cmdCode2}&usrID=${id2}&usrTK=${token2}`;
    navigation.navigate('WEBVIEW', {
      url: web_url,
    });
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
