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

const Tab = createBottomTabNavigator();

function TabBarIcon({ iconPath, focused, routeName }) {
  const theme = useTheme(); // ThemeProvider의 theme에 접근

  // 아이콘 크기 설정
  const iconSize = routeName === 'Mypage' ? { width: 35, height: 35 } : { width: 25, height: 25 };

  // 선택되었을 때 원의 위치 및 크기 설정
  const focusOn =
    routeName === 'Mypage'
      ? { top: 2, right: -1, width: 19, height: 19 } // Mypage에서의 포커스
      : { top: -2, right: -5, width: 18, height: 18 }; // 기본

  return (
    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={iconPath}
        style={iconSize}
        resizeMode="contain"
      />
      {focused && (
        <View
          style={{
            position: 'absolute',
            ...focusOn, // 동적 스타일 적용
            backgroundColor: `${theme.mainPoint}CF`, // 투명도 설정 00~FF
            borderRadius: 20,
            borderWidth: 0,
          }}
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={color}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              let iconPath;

              if (route.name === 'Home') {
                iconPath = require('./assets/home.png');
              } else if (route.name === 'ChatList') {
                iconPath = require('./assets/dm.png');
              } else if (route.name === 'Notification') {
                iconPath = require('./assets/notification.png');
              } else if (route.name === 'Mypage') {
                iconPath = require('./assets/my.png');
              }

              return <TabBarIcon iconPath={iconPath} focused={focused} routeName={route.name} />;
            },
            tabBarActiveTintColor: '#3498db',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="ChatList" component={ChatListScreen} />
          <Tab.Screen name="Notification" component={Notification} />
          <Tab.Screen name="Mypage" component={MyPage} />
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
