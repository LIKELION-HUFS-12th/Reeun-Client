import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { ThemeProvider, useTheme } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/ui/screens/Home';
import ChatListScreen from './src/ui/screens/ChatListScreen';
import Notification from './src/ui/screens/Notification';
import MyPage from './src/ui/screens/MyPage';
import { color } from './src/ui/styles/Color';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigation';
import Login_Home from './src/ui/screens/Login_Home';
import Signup_home from './src/ui/screens/Signup_home';
import Login_Contents from './src/ui/screens/Login_Contents';
import Signup_Contents from './src/ui/screens/Signup_Contents';
import SetSchool from './src/ui/screens/SetSchool';
import SetClass from './src/ui/screens/SetClass';
import BoardScreen from './src/ui/screens/Board';
import WritingScreen from './src/ui/screens/Writing';
import { useUserStore } from './src/logic/store/user';

const Stack = createNativeStackNavigator();

// Stack Navigator
function AppNavigator() {
  const {user} = useUserStore();

  return (
    <Stack.Navigator initialRouteName={user ? "Tabs" : "Login"}>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{headerShown:false}}/>
      {/* 다른 화면 추가 가능 */}
      <Stack.Screen name='Login' component={Login_Home} options={{headerShown:false}}/>
      <Stack.Screen name='SignUp' component={Signup_home} options={{headerShown:false}}/>
      <Stack.Screen name='LoginContents' component={Login_Contents} options={{headerShown:false}}/>
      <Stack.Screen name='SignUpContents' component={Signup_Contents} options={{headerShown:false}}/>
      <Stack.Screen name='SetSchool' component={SetSchool} options={{headerShown:false}}/>
      <Stack.Screen name='SetClass' component={SetClass} options={{headerShown:false}}/>
      <Stack.Screen name='Board' component={BoardScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Writing" component={WritingScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

// App 컴포넌트
export default function App() {
  return (
    
    // <NavigationContainer>
    //   
    // </NavigationContainer>
    
    <ThemeProvider theme={color}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
