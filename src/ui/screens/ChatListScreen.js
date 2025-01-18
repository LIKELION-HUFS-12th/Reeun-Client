import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import useFetchChatRooms from '../../logic/hooks/useFetchChatRooms';

export default function ChatListScreen({ navigation }) {
  const { chatRooms, loading, error } = useFetchChatRooms();

  return (
    <Screen>
      <Header>
        <HeaderTitle>쪽지</HeaderTitle>
      </Header>

      {/* 로딩 상태 */}
      {loading && (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#0000ff" />
        </LoadingContainer>
      )}

      {/* 에러 상태 */}
      {error && (
        <ErrorContainer>
          <ErrorText>{error}</ErrorText>
        </ErrorContainer>
      )}

      {/* 빈 목록 상태 */}
      {!loading && !error && chatRooms.length === 0 && (
        <EmptyContainer>
          <EmptyText>채팅방이 없습니다. 새로운 대화를 시작해보세요!</EmptyText>
        </EmptyContainer>
      )}

      {/* 채팅 목록 */}
      {!loading && !error && chatRooms.length > 0 && (
        <Content>
          {chatRooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              onPress={() => navigation.navigate('Chat', { roomId: room.id, title: room.title })}
            >
              <ChatRoom>
                <Avatar source={require('../../../assets/comment_profile.png')} />
                <ChatInfo>
                  <ChatTitle>{room.title}</ChatTitle>
                  <ChatDescription>{room.description}</ChatDescription>
                </ChatInfo>
              </ChatRoom>
            </TouchableOpacity>
          ))}
        </Content>
      )}
    </Screen>
  );
}

// 창 크기에 맞게
const { width } = Dimensions.get('window');

// 스타일링
const Screen = styled.View`
  flex: 1;
  background-color: #ffffff;
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
  width: ${width - 40}px;
  margin: 0 auto;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
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

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  font-size: 16px;
  color: red;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #888888;
`;
