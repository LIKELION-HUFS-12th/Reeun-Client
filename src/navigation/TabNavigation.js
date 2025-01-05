import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';
import { useTheme } from 'styled-components/native';

import HomeScreen from '../ui/screens/Home';
import ChatStack from './ChatStack'; // ChatListScreen 대신 ChatStack import
import Notification from '../ui/screens/Notification';
import MyPage from '../ui/screens/MyPage';

const Tab = createBottomTabNavigator();

function TabBarIcon({ iconPath, focused, routeName }) {
  const theme = useTheme();
  const iconSize = routeName === 'Mypage' ? { width: 35, height: 35 } : { width: 25, height: 25 };
  const focusOn =
    routeName === 'Mypage'
      ? { top: 2, right: -1, width: 19, height: 19 }
      : { top: -2, right: -5, width: 18, height: 18 };

  return (
    <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={iconPath} style={iconSize} resizeMode="contain" />
      {focused && (
        <View
          style={{
            position: 'absolute',
            ...focusOn,
            backgroundColor: `${theme.mainPoint}CF`,
            borderRadius: 20,
          }}
        />
      )}
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconPath;

          if (route.name === 'Home') {
            iconPath = require('../../assets/home.png');
          } else if (route.name === 'Chat') { // ChatList -> Chat 변경
            iconPath = require('../../assets/dm.png');
          } else if (route.name === 'Notification') {
            iconPath = require('../../assets/notification.png');
          } else if (route.name === 'Mypage') {
            iconPath = require('../../assets/my.png');
          }

          return <TabBarIcon iconPath={iconPath} focused={focused} routeName={route.name} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Mypage" component={MyPage} />
    </Tab.Navigator>
  );
}
