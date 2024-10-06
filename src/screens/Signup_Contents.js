import React, { useState } from 'react'
import { View } from 'react-native'
import SignUpStep from '../components/SignUpStep'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignUpMain from '../components/SignUpMain'
import styled from 'styled-components/native'

const Signup_Contents = () => {
  const[step, setStep] = useState(1)
  const handleStep = () => {
    setStep(prev => prev + 1)
  }

  return (
    <SafeAreaView>
      <View style={{margin:"auto"}}>
        <SignUpStep step={step} setStep={setStep}/>
        <SignUpMain step={step} setStep={setStep}/>
        <View style={{justifyContent:'center', alignItems:'center', marginTop:250}}>
          <NextStepButton>
            <NextText onPress={handleStep}>{ step === 4 ? "가입하기" : "다음 단계로"}</NextText>
          </NextStepButton>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

export default Signup_Contents


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