import React from 'react';
import { ThemeProvider } from 'styled-components/native'; // Theme Provider 사용해서 색상 전역으로 사용!!
import { color } from './src/styles/Color';

export default function App() {
  return (
    <ThemeProvider theme={color}>
    </ThemeProvider>
  );
}
