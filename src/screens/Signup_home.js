import React from 'react'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import logo from '../../assets/logo.png'

const Signup_home = ({ver}) => {

  return (
    <SafeAreaView>
      <Contents>
        <LogoImg source={logo}></LogoImg>
        <Text style={{fontSize:24, color:"#777777", lineHeight:33, fontWeight:200}}>
          <Text style={{color:'#fb5e3d', fontWeight:700}}>{ver==="login" ? "로그인" : "회원가입"}{" "}</Text>
          하고,{"\n"}그리운 친구들과{"\n"}추억을 {ver==="login" ? "이어나가보세요" : "공유해보세요"}
        </Text>
      </Contents>
      <SignupStart>
        <View style={{justifyContent:'center', alignItems:'center', gap:20}}>
          <TouchableOpacity style={{backgroundColor:'#f5f5f5', width:250, height: 50, justifyContent:'center', borderRadius:10  }}>
            <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center', gap:15}}>
              <Image source={require('../../assets/id_icon.png')} style={{width:26, height:26}}></Image>
              <Text style={{textAlign:'center', fontSize:16, fontWeight:500}}>
                {ver==="login" ? "아이디로 로그인하기" : "아이디 입력 후 시작하기"}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row', gap:5}}>
            <Text style={{color:"#898989", fontSize:14}}>{ver==="login" ? "회원이 아니신가요?" : "이미 회원이신가요?"}</Text>
            <TouchableOpacity>
              <Text style={{textDecorationLine:"underline", fontSize:15}}>{ver==="login" ? "회원가입하기" : "로그인하기"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SignupStart>
    </SafeAreaView>
  )
}

export default Signup_home


const LogoImg = styled.Image`
  width:100px;
  height:100px;

`

const Contents = styled.View`
  marginTop:150px;
  marginBottom:225px;
  marginLeft:40px;
  gap:20
`

const SignupStart = styled.View`
`

const StartButton = styled.TouchableOpacity`
  backgroundColor: 'blue';
  color:'red;
`
