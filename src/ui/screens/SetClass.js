import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUserInfoStore, useUserStore } from '../../logic/store/user';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { useAsync } from '../../hooks/useAsync';

const SetClass = ({navigation}) => {
  const {userInfo, setUserInfo} = useUserInfoStore();
  const {user, setUser} = useUserStore();
  const [grade, setGrade] = useState("");
  const [classNum, setClassNum] = useState("");
  const {handleSetClass} = useAsync();

  

  return (
   <SafeAreaView style={{backgroundColor:"white"}}>
    <View style={{marginTop:190, marginLeft:30}}>
     <Text style={{fontSize:20, lineHeight:'30'}}><Text style={{color:"#FB5E3D", fontWeight:"bold"}}>{userInfo.username} </Text>님이{"\n"}등록하고 싶은 반을 입력해주세요</Text>
     <InputArea>
       <InputTitle>학년 입력</InputTitle>
       <InputBox
        // placeholder={"안녕"} onChange={(event) => {handlePresentValue(event)}}
        placeholder={"ex)3학년일 경우 3"}
        value={grade}
        onChange={(e) => {
          setGrade(e.nativeEvent.text);
          console.log(e.nativeEvent.text)
        }}
      >
        
      </InputBox>
      <InputTitle>반 입력</InputTitle>
       <InputBox
        // placeholder={"안녕"} onChange={(event) => {handlePresentValue(event)}}
        placeholder={"ex)2반일 경우 2"}
        value={classNum}
        onChange={(e) => {
          setClassNum(e.nativeEvent.text);
          console.log(e.nativeEvent.text);
        }}
      >
        
      </InputBox>
    </InputArea>
    </View>
    <View style={{justifyContent:'center', alignItems:'center', marginTop:200}}>
        <NextStepButton onPress={() => {handleSetClass(grade, classNum, navigation)}}>
          <NextText>등록하기</NextText>
        </NextStepButton>
      </View>
      
  </SafeAreaView>
    
  )
}

export default SetClass;

const MainContents = styled.View`
  
`

const MainText = styled.Text`
  font-size:20px;
`

const InputArea = styled.View`
  margin-top:20px;
`

const InputTitle = styled.Text`
  font-size:12px;
  color:#898989;
  margin-bottom:10px;
  position:relative;
  left: 10px;
  top:5px;
`

const InputBox = styled.TextInput`
  background-color:#f4f4f4;
  padding:15px 20px;
  width:290px;
  height:60px;
  border-radius:10px;
  font-size:16px;
`

const NextStepButton = styled.TouchableOpacity`
  width:160px;
  height:40px;
  background-color:#fb5e3d;
  border-radius:20px;
  justify-content:center;
  align-items:center;
  margin-bottom:60px;
`

const NextText = styled.Text`
  font-size:17px;
  color:white;
  font-weight:900
`

