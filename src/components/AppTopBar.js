import React from 'react';
import { SafeAreaView, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'styled-components/native';

export default function AppTopBar({title, icon}) {
  return (
        <SafeAreaContainer>
        <HeaderContainer>
          <IconGroup>
            <IconButton name={icon} />
          </IconGroup>
          <Title>{title}</Title>
        </HeaderContainer>
      </SafeAreaContainer>
  );
}

const IconButton = (props) => (
  <IconWrapper>
  <Ionicons name={props.name} size={22} color='black' />
</IconWrapper>
);

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
  justify-content: flex-start;
  align-items: baseline;
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

