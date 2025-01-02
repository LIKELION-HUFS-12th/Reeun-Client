import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native'; // Theme Provider 사용해서 색상 전역으로 사용!!
import { color } from './src/ui/styles/Color';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/ui/screens/Home';
import ChatListScreen from './src/ui/screens/ChatListScreen';
import Notification from './src/ui/screens/Notification';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
<ThemeProvider theme={color}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              let iconPath;

              if (route.name === 'Home') {
                iconPath = focused
                  ? require('./assets/home.png') // 활성화된 아이콘으로 수정해야됨
                  : require('./assets/home.png'); // 비활성화된 아이콘
              } else if (route.name === 'ChatList') {
                iconPath = focused
                  ? require('./assets/dm.png') // 활성화아이콘으로 수정필요
                  : require('./assets/dm.png');
              } else if (route.name === 'Notification') {
                iconPath = focused
                  ? require('./assets/notification.png') // 활성화아이콘으로 수정필요
                  : require('./assets/notification.png');
              }

              return (
                <Image
                  source={iconPath}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              );
            },
            tabBarActiveTintColor: '#3498db', // 활성 탭 색상
            tabBarInactiveTintColor: 'gray', // 비활성 탭 색상
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="ChatList" component={ChatListScreen} />
          <Tab.Screen name="Notification" component={Notification} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
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
