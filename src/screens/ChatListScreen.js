import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export default function ChatListScreen() {
  const chatRooms = [
    { id: '1', title: '나누군지아는사람?', description: '굿' },
    { id: '2', title: '해커스 토플 인터미디엇 5권', description: '대화를 시작해보세요.' },
  ];

  return (
    <Screen>
      <Header>
        <HeaderTitle>쪽지</HeaderTitle>
      </Header>
      <Content>
        {chatRooms.map((room) => (
          <ChatRoom key={room.id}>
            <Avatar />
            <ChatInfo>
              <ChatTitle>{room.title}</ChatTitle>
              <ChatDescription>{room.description}</ChatDescription>
            </ChatInfo>
          </ChatRoom>
        ))}
      </Content>
    </Screen>
  );
}

// Get screen dimensions
const { width } = Dimensions.get('window');

// Styled Components
const Screen = styled.View`
  flex: 1;
  background-color: #ffffff;
  width: 100%;
`;

const Header = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  margin-top: 50px;
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const ChatRoom = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  width: ${width - 40}px; /* 화면 크기를 기준으로 조정 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const Avatar = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #e4e4e4;
  margin-right: 15px;
`;

const ChatInfo = styled.View`
  flex: 1;
`;

const ChatTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
`;

const ChatDescription = styled.Text`
  font-size: 14px;
  color: #666666;
`;
