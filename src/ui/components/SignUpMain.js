import React, { useState } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import axios from 'axios';

const SignUpMain = ({step, setStep}) => {
  const questionEl = ["아이디", "비밀번호", "닉네임", ["학교", "입학년도"]]
  const questionList = ["아이디를", "비밀번호를", "닉네임을", ["출신학교를", "입학년도를"]]
  const placeholderText = step === 4 ? `${questionList[3][0]} 입력하세요`:`${questionList[step-1]} 입력하세요`
  const [userInfo, setUserInfo] = useState([]);
  const [presentValue, setPresentValue] = useState("");
  
  const handleStep = () => {
    setStep(prev => prev + 1)
    setUserInfo((prev) => [...prev, presentValue])
    
    console.log(presentValue);
    setPresentValue("");
    console.log(userInfo)
  }

  const handlePresentValue = (event) => {
    setPresentValue(event.nativeEvent.text);
    console.log(event.nativeEvent.text);
    
  }

  const handleSignUp = async () => {
    // setStep(prev => prev + 1)
    // setUserInfo((prev) => [...prev, presentValue])
    console.log(userInfo);
    try {
      response = await axios.post("https://reeun.store/member/signup/",{
        username:userInfo[0],
        password1:userInfo[1],
        password2:userInfo[2]
      })
      console.log(response.data.user);
    } catch (error) {
      console.log(error)
    }
    
  }


  const handleQuestion = () => {
    return(
      <>
      <InputArea>
        <InputTitle>{step === 4 ? questionEl[3][0]:questionEl[step-1]}</InputTitle>
        <InputBox
          placeholder={placeholderText} value={presentValue} onChange={(event) => {handlePresentValue(event)}}
        ></InputBox>
      </InputArea>
      <View style={{justifyContent:'center', alignItems:'center', marginTop:250}}>
          <NextStepButton>
            <NextText onPress={step===4 ? handleSignUp:handleStep}>{ step === 4 ? "가입하기" : "다음 단계로"}</NextText>
          </NextStepButton>
        </View>
      </>
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

`

const NextText = styled.Text`
  font-size:17px;
  color:white;
  font-weight:900
`