import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './src/navigation/TabNavigation';
import { color } from './src/ui/styles/Color'; 

export default function App() {
  return (
    <ThemeProvider theme={color}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
