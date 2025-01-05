import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, TouchableOpacity, Image } from "react-native";
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
  padding: 20px 10px 20px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.background || '#ffffff'};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  flex: 1;
  color: ${(props) => props.theme.text || '#000000'};
`;

const IconImage = styled.Image`
  width: 22px;
  height: 22px;
`;
