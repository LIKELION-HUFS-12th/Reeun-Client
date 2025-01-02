import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

const ClassEl = ({grade, grade_text}) => {
  return (
    <ClassElBody>
      <GradeBody>
        <Text style={{color:"white", fontSize:"20", fontWeight:"800"}}>{grade}</Text>
      </GradeBody>
      <GradeText>{grade_text}</GradeText>
    </ClassElBody>
  )
}

export default ClassEl

const ClassElBody = styled.View`
  background-color:#F5F5F5;
  width:120px;
  height:110px;
  border-radius:15px;
  padding:20px;
  box-sizing:border-box;
  margin:0 10px;
`

const GradeBody = styled.View`
  background-color:#FB5E3D;
  width:32px;
  height:32px;
  border-radius:10px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const GradeText = styled.Text`
  color:#898989;
  font-size:20px;
  font-weight:800;
`
