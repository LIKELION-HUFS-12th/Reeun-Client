import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

const Signup_Complete = () => {
  return (
    <SafeAreaView style={{justifyContent:'center', alignItems:'center', gap:'150'}}>
      <Contents>
        <View style={{justifyContent:'center', alignItems:'center', gap:'25'}}>
          <TitleText>환영해요!</TitleText>
          <View>
            <Circle></Circle>
            <ConfettiImage source={require("../../assets/confetti_icon.png")}/>
          </View>
        </View>
        <MainText>리운과 함께{"\n"}그리운 그때로 돌아가봐요</MainText>
      </Contents>
      <StartButton>
        <StartText>시작하기</StartText>
      </StartButton>
    </SafeAreaView>
  )
}

export default Signup_Complete

const Contents = styled.View`
  margin-top:150px;
  justify-content:center;
  align-items:center;
  gap:50px;
`

const TitleText = styled.Text`
  font-size: 44px;
  font-weight:900;
`

const Circle = styled.View`
  width:75px;
  height:75px;
  background-color:#fb5e3d;
  border-radius:50%;
  position:absolute;
  top:35;
  left:-20;
`

const ConfettiImage = styled.Image`
  width:128px;
  height:128px;
`

const MainText = styled.Text`
  font-size:22px;
  text-align:center;
  color: #898989;
  line-height:33px;
`

const StartButton = styled.TouchableOpacity`
  width:160px;
  height:40px;
  background-color:#fb5e3d;
  border-radius:20px;
  justify-content:center;
  align-items:center;
`

const StartText = styled.Text`
  font-size:17px;
  color:white;
  font-weight:900
`