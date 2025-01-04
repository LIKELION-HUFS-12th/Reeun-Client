// src/navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigation';  // Tab 네비게이션

import Login_Home from '../ui/screens/Login_Home';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Tabs" component={TabNavigator} />  TabNavigator를 스택 내에서 관리 */}
      <Stack.Screen name="Login" component={Login_Home} /> {/* 세부 화면 추가 */}
    </Stack.Navigator>
  );
}

export default StackNavigator;