import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, TouchableOpacity } from 'react-native';

const initialNotifications = [
  { id: '1', community: '[리운초등학교(2008)]', title: '새 게시글이 있습니다.', message: '얘들아 나 김멋사인데 잘 지내니?...', created_at: '2024-09-04 11:25', isRead: false },
  { id: '2', community: '[리운초등학교(2008)]', title: '새 게시글이 있습니다.', message: '와대박 다들 그 소식 들었니 다름이 아니라 내가..', created_at: '2024-09-04 11:25', isRead: true },
  { id: '3', community: '[6학년 5반]', title: '새 댓글이 있습니다.', message: '웬일이야 시간 너무빠른거 아니니', created_at: '2024-09-04 11:25', isRead: false },
];

export default function Notification() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const toggleReadStatus = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>알림</HeaderTitle>
      </Header>
      <NotiList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleReadStatus(item.id)}>
            <NotiItem isRead={item.isRead}>
              <NotiTitle isRead={item.isRead}>{item.community} {item.title}</NotiTitle>
              <NotiText isRead={item.isRead}>{item.message}</NotiText>
              <NotiTime>{item.created_at}</NotiTime>
            </NotiItem>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
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

const NotiList = styled(FlatList)`
  padding: 20px;
  width: 100%;
`;

const NotiItem = styled.View`
  background-color: ${(props) =>
    props.isRead ? '#f5f5f5' : props.theme.itemBackground};
  padding: 15px;
  margin-bottom: 18px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
`;

const NotiTitle = styled.Text`
  font-size: 18px;
  font-weight: ${(props) => (props.isRead ? '400' : '600')};
  color: ${(props) => (props.isRead ? props.theme.text : '#FF0000')}; /* 읽지 않은 경우 빨간색 */
`;

const NotiText = styled.Text`
  font-size: 16px;
  color: ${(props) => (props.isRead ? props.theme.text : '#FF0000')}; /* 읽지 않은 경우 빨간색 */
`;

const NotiTime = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.done};
`;
