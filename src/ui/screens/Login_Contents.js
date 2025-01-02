import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import logo from '../../assets/logo.png'

const Login_Contents = () => {
  return (
    <SafeAreaView>
      <View style={{margin:"auto"}}>
        <LogoImg source={logo}></LogoImg>
        <LoginBody>
          <LoginText>로그인</LoginText>
          <InputBody>
            <LoginInput
              placeholder="아이디를 입력하세요"
              placeholderTextColor="#898989">
            </LoginInput>
            <LoginInput
              placeholder="비밀번호를 입력하세요"
              placeholderTextColor="#898989">
            </LoginInput>
          </InputBody>
        </LoginBody>
        <View style={{justifyContent:'center', alignItems:'center', marginTop:150}}>
          <LoginButton>
            <ButtonText>로그인하기</ButtonText>
          </LoginButton>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

export default Login_Contents


const LogoImg = styled.Image`
  width:100px;
  height:100px;
  margin-top:150px;
  position:relative;
  left:10px;
`

const LoginBody = styled.View`
  margin-top:30px;
  gap:20px;

`

const LoginText = styled.Text`
  font-size:24px;
  position:relatvie;
  left: 20px;
`

const InputBody = styled.View`
  gap:15px;
`

const LoginInput = styled.TextInput`
  width:300px;
  height:60px;
  padding:20px;
  background-color:#f4f4f4;
  border-radius:20px;
`

const LoginButton = styled.TouchableOpacity`
  width:160px;
  height:40px;
  background-color:#fb5e3d;
  border-radius:20px;
  justify-content:center;
  align-items:center;
`

const ButtonText = styled.Text`
  font-size:17px;
  color:white;
  font-weight:900
`

