import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native'; // useRoute로 파라미터 받기
import AppTopBar from '../components/AppTopBar';
import ChatList from '../components/ChatList';
import ChatInput from '../components/ChatInput';
import ChatSideModal from '../components/ChatSideModal';
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import useChatState from '../../logic/hooks/useChatState';
import { useAsync } from '../../hooks/useAsync';

export default function Chat() {
  const navigation = useNavigation();
  const route = useRoute();

  // 안전하게 파라미터 받기
  const { recipientId, recipientName } = route.params || {}; // 파라미터가 없으면 빈 객체로 처리
  if (!recipientId) {
    console.error('Recipient ID is missing');
  }

  const { getToken } = useAsync(); // useAsync에서 토큰 가져오기
  const [token, setToken] = useState(null);

  // 토큰 가져오기
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getToken();
        setToken(fetchedToken);
      } catch (error) {
        console.error('Failed to fetch token:', error);
      }
    };
    fetchToken();
  }, [getToken]);

  const { messages, handleSend, isModalVisible, toggleModal, loading } = useChatState(recipientId, token);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={-40}
        >
          <AppTopBar
            title={recipientName || '채팅'} // 전달된 recipientName 또는 기본값 사용
            iconSource={require('../../../assets/arrow_back_black.png')}
            onIconPress={() => navigation.navigate('Chatlist', { screen: 'ChatList' })}
            rightIconSource="ellipsis-vertical"
            onRightIconPress={toggleModal}
          />

          <Content>
            {loading ? (
              <LoadingContainer>
                <ActivityIndicator size="large" color="#0000ff" />
              </LoadingContainer>
            ) : (
              <ChatList messages={messages} />
            )}
          </Content>

          <ChatInputContainer>
            <ChatInput onSend={handleSend} />
          </ChatInputContainer>
        </KeyboardAvoidingView>

        {/* recipientId를 otherId로 전달 */}
        <ChatSideModal isVisible={isModalVisible} onClose={toggleModal} otherId={recipientId} />
      </Screen>
    </TouchableWithoutFeedback>
  );
}

const Screen = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background || '#FFFFFF'};
  width: 100%;
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
  padding-bottom: 60px;
`;

const ChatInputContainer = styled.View`
  height: 100px;
  width: 100%;
  border-top-width: 0.1px;
  border-top-color: #e0e0e0;
  background-color: ${(props) => props.theme.background || '#FFFFFF'};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
