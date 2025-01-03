import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/ui/screens/Home';
import { ThemeProvider } from 'styled-components/native'; // Theme Provider 사용해서 색상 전역으로 사용!!
import { color } from './src/ui/styles/Color';
import Login_Home from './src/ui/screens/Login_Home';
import Signup_home from './src/ui/screens/Signup_home';
import Signup_Contents from './src/ui/screens/Signup_Contents';
import Login_Contents from './src/ui/screens/Login_Contents';

export default function App() {
  return (
    <ThemeProvider theme={color}>
      <View style={styles.container}>
        {/* <HomeScreen /> */}
        {/* <StatusBar style="auto" /> */}
        {/* <Signup_home></Signup_home> */}
        {/* <Signup_Contents></Signup_Contents> */}
        <Login_Contents></Login_Contents>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

