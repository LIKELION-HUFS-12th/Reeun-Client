import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from '../ui/screens/ChatListScreen';
import Chat from '../ui/screens/Chat';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function ChatStack({ navigation, route }) {
  const routeName = getFocusedRouteNameFromRoute(route);

  React.useLayoutEffect(() => {
    if (routeName === 'Chat') {
      navigation.setOptions({ tabBarStyle: { display: 'none' } }); // 탭 바 숨기기
    } else {
      navigation.setOptions({ tabBarStyle: null }); // 기본 탭 바 스타일
    }
  }, [navigation, routeName]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
