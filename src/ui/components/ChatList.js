// src/ui/components/ChatList.js
import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export default function ChatList({ messages }) {
  return (
    <ChatListContainer>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem isMine={item.sender === '나'}>
            <SenderText>{item.sender}</SenderText>
            <MessageText>{item.message}</MessageText>
            <TimeText>{item.created_at}</TimeText>
          </ChatItem>
        )}
      />
    </ChatListContainer>
  );
}

const ChatListContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const ChatItem = styled.View`
  background-color: ${(props) => (props.isMine ? props.theme.mineBackground || '#DCF8C6' : props.theme.otherBackground || '#FFFFFF')};
  padding: 12px 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  align-self: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  max-width: 70%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SenderText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.text || '#555555'};
  margin-bottom: 4px;
`;

const MessageText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.text || '#000000'};
  margin-bottom: 4px;
`;

const TimeText = styled.Text`
  font-size: 10px;
  color: ${(props) => props.theme.done || '#AAAAAA'};
  text-align: right;
`;
