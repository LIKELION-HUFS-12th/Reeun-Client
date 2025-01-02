import React from 'react';
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

export default function AppTopBar({ title, icon, onIconPress, rightIcon, onRightIconPress }) {
  return (
    <SafeAreaContainer>
      <HeaderContainer>
        <IconGroup>
          {icon && (
            <TouchableOpacity onPress={onIconPress}>
              <IconWrapper>
                <Ionicons name={icon} size={22} color="black" />
              </IconWrapper>
            </TouchableOpacity>
          )}
        </IconGroup>
        <Title>{title}</Title>
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <IconWrapper>
              <Ionicons name={rightIcon} size={22} color="black" />
            </IconWrapper>
          </TouchableOpacity>
        )}
      </HeaderContainer>
    </SafeAreaContainer>
  );
}

const SafeAreaContainer = styled(SafeAreaView)`
  background-color: ${(props) => props.theme.background};
`;

const HeaderContainer = styled.View`
  padding-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 20px;
  background-color: ${(props) => props.theme.background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  padding-bottom: 5px;
  color: ${(props) => props.theme.text};
`;

const IconGroup = styled.View`
  flex-direction: row;
`;

const IconWrapper = styled.View`
  padding-left: 6px;
  padding-right: 6px;
`;
