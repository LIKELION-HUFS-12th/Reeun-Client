import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/ui/screens/Home';
import ChatListScreen from './src/ui/screens/ChatListScreen';
import NotificationScreen from './src/ui/screens/Notification';
import MyPageScreen from './src/ui/screens/MyPage';
import { Image, View } from 'react-native';
import Login_Home from './src/ui/screens/Login_Home';
import Signup_home from './src/ui/screens/Signup_home';
import Login_Contents from './src/ui/screens/Login_Contents';
import Signup_Contents from './src/ui/screens/Signup_Contents';

// Tab과 Stack 네비게이터 생성
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown:false,
        initialRouterName:'Home',
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

          return (
            <Image
              source={iconPath}
              style={{
                width: focused ? 35 : 25,
                height: focused ? 35 : 25,
                resizeMode: 'contain',
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ChatList" component={ChatListScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Mypage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator
function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{headerShown:false}}/>
      {/* 다른 화면 추가 가능 */}
      <Stack.Screen name='Login' component={Login_Home} options={{headerShown:false}}/>
      <Stack.Screen name='SignUp' component={Signup_home} options={{headerShown:false}}/>
      <Stack.Screen name='LoginContents' component={Login_Contents} options={{headerShown:false}}/>
      <Stack.Screen name='SignUpContents' component={Signup_Contents} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

// App 컴포넌트
export default function App() {
  return (
    
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    
  );
}
