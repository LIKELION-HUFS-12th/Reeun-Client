import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { useUserStore } from '../../logic/store/user'

const ClassAddEl = ({navigation}) => {
  const {user} = useUserStore();

  return (
    <ClassElBody onPress={() => {navigation.navigate(user?'SetClass':'Login')}}>
      <GradeText>새로운       반을 등록하세요</GradeText>
      <Text style={{color:'#FB5E3D', fontSize:'25', fontWeight:"700"}}>+</Text>
    </ClassElBody>
    
  )
}

export default ClassAddEl;

const ClassElBody = styled.TouchableOpacity`
  
  background-color:#F5F5F5;
  width:120px;
  height:110px;
  border-radius:15px;
  padding:20px;
  box-sizing:border-box;
  margin:0 10px;
  display:flex;
  justify-content:center;
`

const GradeBody = styled.View`
  background-color:#FB5E3D;
  width:32px;
  height:32px;
  border-radius:10px;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-bottom:10px;
  flex-wrap:wrap;
  
`

const GradeText = styled.Text`
  word-break:keep-all;
  color:#6c6c6c;
  font-size:18px;
  font-weight:800;
`
