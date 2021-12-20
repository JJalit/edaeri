import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';

import { Button, ValidationInput, CheckBoxText, LogoImage, Header, Section, TextButton } from '../components';
import { storage, data } from '../config';

const { storeToken, getToken } = storage;
const { inputItems } = data;

const LoginPage = ({ navigation }) => {
  const [loginData, setLoginData] = useState({ companyCode: '', id: '', password: '', isSelected: false });
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const auth = await getToken('auth');
    const isAutoLogin = auth && auth.isAutoLogin;
    const data = auth && auth.data;
    if (isAutoLogin) {
      navigation.navigate('MAIN', { data });
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } else SplashScreen.hide();
  };

  const onPress = () => {
    let data = JSON.stringify({
      HEADER: {
        CMPY_CD: loginData.companyCode,
        USERID: loginData.id,
        PWD: loginData.password,
      },
    });

    let config = {
      method: 'post',
      url: 'https://erp.edaeri.com/api/public/MA_USER_AUTH',
      headers: {
        'Credential-ID': 'web1',
        'Credential-KEY': 'YWVhZTM4ZTkyNmE5MmYxZmVmYzMxZjNmY2ZmMjc2NzU2Zjk4ZjM1OGNjYTBhZDJhMTE4MzRlYTEyYWY1Yjk5NQ==',
        'Content-Type': 'application/json',
        Cookie:
          'JSESSIONID=432A271FC62D909D77DE621C9F3E3FCA.bzneers-api2; SCOUTER=z1orvjpr49t5f1; X-Oracle-BMC-LBS-Route=6d0f9c912056bfe039ee78b9bf3c1a0a5e83f6f6',
      },
      data: data,
    };

    axios(config)
      .then(response => {
        let res = response.data;
        console.log(res);

        if (res['HEADER']['RESPONSE_CODE'] == 'S') {
          let auth = {
            cmdCode: loginData.companyCode,
            id: loginData.id,
            pw: loginData.password,
            isAutoLogin: loginData.isSelected,
            token: res['HEADER']['AUTH_TOKEN'],
            data: res.DATA,
          };

          storeToken('auth', auth);
          navigation.navigate('MAIN', { data: res.DATA });
        } else {
          setError(true);
          Alert.alert('아이디나 비밀번호를 확인해주세요.');
        }
      })
      .catch(err => console.log(err));
  };

  const onChangeText = (value, name) => {
    setLoginData(loginData => ({ ...loginData, [name]: value }));
  };

  const onSelect = () => {
    setLoginData(loginData => ({ ...loginData, isSelected: !loginData.isSelected }));
  };

  const onClose = name => {
    setLoginData(loginData => ({ ...loginData, [name]: '' }));
  };

  const onFocus = id => {
    setFocused(id);
  };

  const onBlur = () => {
    setFocused(null);
  };

  return (
    <Header>
      <ScrollView>
        <Section>
          <LogoImage source={require('../../images/logo.png')} />
          {inputItems.map((item, i) => (
            <ValidationInput
              key={i}
              error={error}
              errorText={item.errorText}
              password={item.name === 'password'}
              onClose={() => onClose(item.name)}
              onChangeText={e => onChangeText(e, item.name)}
              onFocus={() => onFocus(item.id)}
              isFocused={focused === i}
              onBlur={onBlur}
              value={loginData[item.name]}
              placeholder={item.placeholder}
            />
          ))}
          <CheckBoxText value={loginData.isSelected} onValueChange={e => onChangeText(e, 'isSelected')} onPress={onSelect} />
          <Button text="로그인" onPress={onPress} />
          <TextButton onPress={() => navigation.navigate('REGISTER')} text="회원가입" />
        </Section>
      </ScrollView>
    </Header>
  );
};

export default LoginPage;
