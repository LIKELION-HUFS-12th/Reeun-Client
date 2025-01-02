import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Signup_home from './src/screens/Signup_home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Signup_Complete from './src/screens/Signup_Complete';
import Signup_Contents from './src/screens/Signup_Contents';
import Login_Home from './src/screens/Login_Home';
import Login_Contents from './src/screens/Login_Contents';
import MyPage from './src/screens/MyPage';
import ViewPost from './src/screens/ViewPost';

export default function App() {
  return (
    <SafeAreaProvider>
      <View>
        {/* <Signup_home/> */}
        {/* <Signup_Complete/> */}
        {/* <Signup_Contents/> */}
        {/* <Login_Home/> */}
        {/* <Login_Contents/> */}
        <MyPage/>
        {/* <ViewPost/> */}
      </View>
    </SafeAreaProvider>
  );
}


