import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

import { MenuItem, Header, Section } from './components';
import { storage, data } from '../../../config';

const { getToken } = storage;
const { menuItems } = data;

export default function HomePage({ navigation }) {
  const [auth, setAuth] = useState({ cmdCode: '', id: '', token: '', data: [] });

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const auth = await getToken('auth');
    setAuth(auth);
  }

  function goWebView(item) {
    let web_url = item + `?cmdCode=${auth.cmdCode}&usrID=${auth.id}&usrTK=${auth.token}&viewType=webView`;
    navigation.navigate('WEBVIEW', { url: web_url });
  }

  return (
    <SafeAreaView>
      <Header>
        <Section>
          {menuItems.map((menuItem, i) => {
            const { id, text, active, inactive, url, width, height } = menuItem;
            if (auth.data.findIndex(item => item.menu_id === id) !== -1)
              return (
                <MenuItem key={i} onPress={() => goWebView(url)} active={true} source={active} width={width} height={height} text={text} />
              );
            return <MenuItem key={i} active={false} source={inactive} width={width} height={height} text={text} />;
          })}
        </Section>
      </Header>
    </SafeAreaView>
  );
}
