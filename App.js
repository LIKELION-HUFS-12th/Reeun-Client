import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/Home';
import { ThemeProvider } from 'styled-components/native'; // Theme Provider 사용해서 색상 전역으로 사용!!
import { color } from './src/styles/Color';

export default function App() {
  return (
    <ThemeProvider theme={color}>
      <View style={styles.container}>
        <HomeScreen />
        <StatusBar style="auto" />
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