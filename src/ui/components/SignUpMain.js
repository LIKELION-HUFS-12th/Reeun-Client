import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

const SignUpMain = ({step, setStep}) => {
  const questionEl = ["이메일", "비밀번호", "닉네임", ["학교", "입학년도"]]
  const questionList = ["이메일 주소를", "비밀번호를", "닉네임을", ["출신학교를", "입학년도를"]]
  const placeholderText = step === 4 ? `${questionList[3][0]} 입력하세요`:`${questionList[step-1]} 입력하세요`

  const handleQuestion = () => {
    return(
      <InputArea>
        <InputTitle>{step === 4 ? questionEl[3][0]:questionEl[step-1]}</InputTitle>
        <InputBox
          placeholder={placeholderText}
        ></InputBox>
      </InputArea>
    )
  }

  return (
    <MainContents>
      <MainText>당신의 정보를 입력해주세요</MainText>
      {handleQuestion()}
    </MainContents>
  )
}

export default SignUpMain

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
  padding:20px;
  width:290px;
  height:50px;
  border-radius:10px;
`