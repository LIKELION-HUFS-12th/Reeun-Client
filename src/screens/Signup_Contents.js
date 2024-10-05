import React, { useState } from 'react'
import { View } from 'react-native'
import SignUpStep from '../components/SignUpStep'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignUpMain from '../components/SignUpMain'

const Signup_Contents = () => {
  const[step, setStep] = useState("")

  return (
    <SafeAreaView>
      <SignUpStep/>
      <SignUpMain/>
    </SafeAreaView>
  )
}

export default Signup_Contents