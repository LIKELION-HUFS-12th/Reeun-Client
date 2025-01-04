import React from 'react'
import { View } from 'react-native'
import Signup_home from './Signup_home'

const Login_Home = ({navigation}) => {
  return (
    <View>
      <Signup_home ver={"login"} navigation={navigation}/>
    </View>
  )
}

export default Login_Home