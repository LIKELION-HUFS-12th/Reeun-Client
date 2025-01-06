import React, { useState } from 'react'
import { View } from 'react-native'
import SignUpStep from '../components/SignUpStep'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignUpMain from '../components/SignUpMain'
import styled from 'styled-components/native'
import Signup_Complete from './Signup_Complete'

const Signup_Contents = ({navigation}) => {
  const[step, setStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  
  

  return (
    <>
    {isComplete ?
      <Signup_Complete navigation={navigation}/>
    :
    <SafeAreaView style={{backgroundColor:"white"}}>
      <View style={{margin:"auto"}}>
        <SignUpStep step={step} setStep={setStep}/>
        <SignUpMain step={step} setStep={setStep} setIsComplete={setIsComplete}/>
        
        
      </View>
    </SafeAreaView>
    }
    </>
  )
}

export default Signup_Contents


