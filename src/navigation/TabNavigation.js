// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../ui/components/TabBarIcons';
import HomeScreen from '../ui/screens/Home';
import ChatListScreen from '../ui/screens/ChatListScreen';
import Notification from '../ui/screens/Notification';
import MyPage from '../ui/screens/MyPage'

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconPath;

          if (route.name === 'Home') {
            iconPath = require('../../assets/home.png');
          } else if (route.name === 'ChatList') {
            iconPath = require('../../assets/dm.png');
          } else if (route.name === 'Notification') {
            iconPath = require('../../assets/notification.png');
          } else if (route.name === 'Mypage') {
            iconPath = require('../../assets/my.png');
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
  );
}

export default TabNavigator;
