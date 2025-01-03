import React, { useState } from 'react'
import { View } from 'react-native'
import SignUpStep from '../components/SignUpStep'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignUpMain from '../components/SignUpMain'
import styled from 'styled-components/native'

const Signup_Contents = () => {
  const[step, setStep] = useState(1)
  
  

  return (
    <SafeAreaView>
      <View style={{margin:"auto"}}>
        <SignUpStep step={step} setStep={setStep}/>
        <SignUpMain step={step} setStep={setStep}/>
        
        
      </View>
    </SafeAreaView>
  )
}

export default Signup_Contents


