// src/components/TabBarIcon.js
import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from 'styled-components';

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

export default TabBarIcon;
