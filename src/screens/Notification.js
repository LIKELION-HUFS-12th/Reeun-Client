import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import AppTopBar from '../components/AppTopBar';

const notifications = [
  { id: '1', community:'[리운초등학교(2008)]', title:'새 게시글이 있습니다.', message: '얘들아 나 김멋사인데 잘 지내니?...', created_at: '2024-09-04 11:25' },
  { id: '2', community:'[리운초등학교(2008)]', title:'새 게시글이 있습니다.', message: '와대박 다들 그 소식 들었니 다름이 아니라 내가..', created_at: '2024-09-04 11:25' },
  { id: '3', community:'[6학년 5반]', title:'새 댓글이 있습니다.', message: '웬일이야 시간 너무빠른거 아니니', created_at: '2024-09-04 11:25' },
];

export default function Notification() {
  return (
    <Container>
      <AppTopBar />
      <NotiList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotiItem>
            <NotiTitle>{item.community} {item.title}</NotiTitle>
            <NotiText>{item.message}</NotiText>
            <NotiTime>{item.created_at}</NotiTime>
          </NotiItem>
        )}
      />
    </Container>
  );
}

// Styled components using color
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  width: 100%;
`;

const NotiList = styled(FlatList)`
  padding: 20px 20px;
  width: 100%;
`;

const NotiItem = styled.View`
  background-color: ${(props) => props.theme.itemBackground};
  padding: 15px;
  margin-bottom: 18px;
  border-radius: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
`;

const NotiTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;

const NotiText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

const NotiTime = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.done};
`;
