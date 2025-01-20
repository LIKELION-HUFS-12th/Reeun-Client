import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export default function ChatList({ messages }) {
  return (
    <ChatListContainer>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => `${item.createDate}-${index}`} // 고유 키 설정
        renderItem={({ item }) => (
          <ChatItem isMine={item.isMyChat}>
            <SenderText>{item.isMyChat ? '나' : item.senderNickname}</SenderText>
            <MessageText>{item.content}</MessageText>
            <TimeText>{item.createDate}</TimeText>
          </ChatItem>
        )}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} // 스크롤 가능한 영역 확보
        keyboardShouldPersistTaps="handled" // 키보드 활성화 상태에서도 스크롤 가능
        showsVerticalScrollIndicator={false} // 스크롤바 숨김
        inverted // 메시지를 아래에서 위로 렌더링
      />
    </ChatListContainer>
  );
}

const ChatListContainer = styled.View`
  flex: 1;
  padding: 18px;
`;

const ChatItem = styled.View`
  background-color: ${(props) =>
    props.isMine ? props.theme.mineBackground || '#F4F4F4' : props.theme.otherBackground || '#FFFFFF'};
  padding: 12px 18px;
  margin: 15px 5px 0px 5px;
  border-radius: 20px;
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
