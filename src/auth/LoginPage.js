import React, { useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';

import { Button, ImageInput, CheckBoxText, LogoImage, Header, Section, TextButton } from '../components';
import { storage } from '../config';

const LoginPage = ({ navigation }) => {
  const { storeToken } = storage;
  const [loginData, setLoginData] = useState({ companyCode: '', id: '', password: '', isSelected: false });

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
          storeToken('isAutoLogin', loginData.isSelected);
          storeToken('pw', loginData.password);
          storeToken('token', res['HEADER']['AUTH_TOKEN']);
          storeToken('cmdCode', loginData.companyCode);
          storeToken('id', loginData.id);

          navigation.navigate('MAIN', { data: res.DATA });
        } else Alert.alert('아이디나 비밀번호를 확인해주세요.');
      })
      .catch(err => console.log(err));
  };

  const onChangeText = (value, name) => {
    setLoginData(loginData => ({ ...loginData, [name]: value }));
  };

  const onSelect = () => {
    setLoginData(loginData => ({ ...loginData, isSelected: !loginData.isSelected }));
  };

  return (
    <Header>
      <Section>
        <LogoImage source={require('../../images/logo.png')} />
        <ImageInput onChangeText={e => onChangeText(e, 'companyCode')} value={loginData.companyCode} placeholder="회사코드" />
        <ImageInput onChangeText={e => onChangeText(e, 'id')} value={loginData.id} placeholder="아이디" />
        <ImageInput password onChangeText={e => onChangeText(e, 'password')} value={loginData.password} placeholder="비밀번호" />
        <CheckBoxText value={loginData.isSelected} onValueChange={e => onChangeText(e, 'isSelected')} onPress={onSelect} />
        <Button text="로그인" onPress={onPress} />
        <TextButton onPress={() => navigation.navigate('REGISTER')} text="회원가입" />
      </Section>
    </Header>
  );
};

export default LoginPage;
