// src/ui/screens/Chat.js
import React from 'react';
import styled from 'styled-components/native';
import AppTopBar from '../components/AppTopBar';
import ChatList from '../components/ChatList';
import ChatInput from '../components/ChatInput';

export default function Chat() {
  const dummyMessages = [
    { id: '1', sender: '익명', message: '안녕하세요!', created_at: '2024-12-28 12:30 PM' },
    { id: '2', sender: '나', message: '안녕하세요! 반가워요!', created_at: '2024-12-28 12:31 PM' },
  ];

  const handleSend = (message) => {
    console.log('보낸 메시지:', message);
    // 실제로는 메시지를 목록에 추가하거나 서버에 전송하는 로직이 여기에 들어감.
  };

  return (
    <Container>
      <AppTopBar title="채팅" icon="arrow-back" />
      <ChatList messages={dummyMessages} />
      <ChatInput onSend={handleSend} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background || '#FFFFFF'};
  width: 100%;
`;
