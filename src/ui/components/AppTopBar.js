import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import styled from 'styled-components/native';

export default function AppTopBar({ title, iconSource, onIconPress, rightIconSource, onRightIconPress }) {
  return (
    <SafeAreaContainer>
      <HeaderContainer>
        {iconSource && (
          <TouchableOpacity onPress={onIconPress}>
            <IconImage source={iconSource} />
          </TouchableOpacity>
        )}
        <Title>{title}</Title>
        {rightIconSource && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons name={rightIconSource} size={22} color="black" />
          </TouchableOpacity>
        )}
      </HeaderContainer>
    </SafeAreaContainer>
  );
}

const SafeAreaContainer = styled(SafeAreaView)`
  background-color: ${(props) => props.theme.background || '#ffffff'};
`;

const HeaderContainer = styled.View`
  padding: 20px 20px 10px 20px;
  flex-direction: row;
  align-items: center; /* 아이콘과 텍스트를 수평 정렬 */
  justify-content: space-between; /* 좌우 아이콘과 제목 간 간격 일정 */
  background-color: ${(props) => props.theme.background || '#ffffff'};
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.text || '#000000'};
`;

const IconImage = styled.Image`
  width: 22px;
  height: 22px;
`;
