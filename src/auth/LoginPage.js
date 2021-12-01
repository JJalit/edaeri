import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogoImage from '../../images/logo.png';
import CompanyImage from '../../images/ic_company.png';
import IdImage from '../../images/ic_id.png';
import PasswordImage from '../../images/ic_password.png';

const LoginPage = ({ navigation }) => {
  const [companyCode, setCompanyCode] = useState(null);
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSelected, setSelection] = useState(false);

  LoginFunction = () => {
    var data = JSON.stringify({
      HEADER: {
        CMPY_CD: companyCode,
        USERID: id,
        PWD: password,
      },
    });

    var config = {
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
      .then(function (response) {
        var res = response.data;

        if (res['HEADER']['RESPONSE_CODE'] == 'S') {
          if (isSelected == true) {
            AsyncStorage.setItem('isAutoLogin', 'true');
          }

          AsyncStorage.setItem(
            'pw',
            JSON.stringify({
              pw: password,
            })
          );
          AsyncStorage.setItem(
            'token',
            JSON.stringify({
              token: res['HEADER']['AUTH_TOKEN'],
            })
          );
          AsyncStorage.setItem(
            'cmdCode',
            JSON.stringify({
              cmdCode: companyCode,
            })
          );

          AsyncStorage.setItem(
            'id',
            JSON.stringify({
              id: id,
            })
          );

          navigation.navigate('MAIN', {
            data: response.data.DATA,
          });
        } else {
          Alert.alert('아이디나 비밀번호를 확인해주세요.');
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(error);
      });
  };

  RegisterFunction = () => {
    navigation.navigate('REGISTER');
  };

  useEffect(() => {
    try {
      async function getUserData() {
        const isAutoLogin = await AsyncStorage.getItem('isAutoLogin');
        const pw = JSON.parse(await AsyncStorage.getItem('pw')).pw;
        const cmdCode = JSON.parse(await AsyncStorage.getItem('cmdCode')).cmdCode;
        const id = JSON.parse(await AsyncStorage.getItem('id')).id;
        if (isAutoLogin == null) {
          return;
        }

        var data = JSON.stringify({
          HEADER: {
            CMPY_CD: cmdCode,
            USERID: id,
            PWD: pw,
          },
        });

        var config = {
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

        const res = await axios(config);

        AsyncStorage.setItem(
          'token',
          JSON.stringify({
            token: res.data['HEADER']['AUTH_TOKEN'],
          })
        );

        if (isAutoLogin == 'false') {
          return;
        } else {
          navigation.navigate('MAIN', {
            data: res.data.DATA,
          });
        }
      }

      getUserData();
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } catch (e) {
      console.warn('에러발생');
      console.warn(e);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={LogoImage} />

      <View style={styles.SectionStyle}>
        <Image source={CompanyImage} style={styles.ImageStyle} />
        <TextInput
          style={styles.input}
          onChangeText={text => setCompanyCode(text)}
          value={companyCode}
          maxLength={20}
          placeholder="회사코드"
          placeholderTextColor="#808080"
          underlineColorAndroid="transparent"
        />
      </View>

      <View style={styles.SectionStyle}>
        <Image source={IdImage} style={styles.ImageStyle} />
        <TextInput
          style={styles.input}
          onChangeText={text => setId(text)}
          value={id}
          maxLength={20}
          placeholder="아이디"
          placeholderTextColor="#808080"
          underlineColorAndroid="transparent"
        />
      </View>

      <View style={styles.SectionStyle}>
        <Image source={PasswordImage} style={styles.ImageStyle} />
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          maxLength={20}
          placeholder="비밀번호"
          secureTextEntry={true}
          placeholderTextColor="#808080"
          underlineColorAndroid="transparent"
        />
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          style={{ height: 20, width: 20, marginRight: 10 }}
          boxType={'square'}
          value={isSelected}
          onValueChange={setSelection}
          animationDuration={0.5}
          disabled={false}
          onAnimationType={'bounce'}
          offAnimationType={'stroke'}
        />
        <Text style={styles.label}>로그인 상태 유지</Text>
      </View>

      <TouchableOpacity style={styles.LoginButtonStyle} activeOpacity={0.5} onPress={this.LoginFunction}>
        <Text style={styles.TextStyle}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.RegisterButtonStyle} activeOpacity={0.5} onPress={this.RegisterFunction}>
        <Text style={styles.TextStyle}>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4e5cf1',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 150,
    width: Dimensions.get('window').width - 100,
    resizeMode: 'contain',
  },

  input: {
    color: '#000000',
    fontSize: 18,
  },

  LoginButtonStyle: {
    height: 40,
    width: Dimensions.get('window').width - 150,
    marginTop: 60,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },

  RegisterButtonStyle: {
    height: 40,
    marginTop: 50,
    width: Dimensions.get('window').width - 150,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
  },

  TextStyle: {
    color: '#4e5cf1',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  SectionStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: Dimensions.get('window').width - 100,
    height: 40,
    margin: 10,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    alignItems: 'center',
  },

  checkboxContainer: {
    marginLeft: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },

  label: {
    fontSize: 18,
    color: '#FFFFFF',
    margin: 8,
  },
});

export default LoginPage;
