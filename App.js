import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< Updated upstream

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
=======
import HomeScreen from './src/screens/Home';
import { ThemeProvider } from 'styled-components/native'; // Theme Provider 사용해서 색상 전역으로 사용!!
import { color } from './src/styles/Color';
import Chat from './src/screens/Chat';

export default function App() {
  return (
    <ThemeProvider theme={color}>
      <View style={styles.container}>
        <Chat/>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
>>>>>>> Stashed changes
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
