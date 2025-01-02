import React, { useState } from 'react';
import styled from 'styled-components/native';
import AppTopBar from '../components/AppTopBar';
import ChatList from '../components/ChatList';
import ChatInput from '../components/ChatInput';
import ChatSideModal from '../components/ChatSideModal'; // 사이드 모달: 채팅방, 참여자 정보
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function Chat() {
  const dummyMessages = [
    { id: '1', sender: '나', message: '혹시 김멋사?', created_at: '2024-12-28 12:31 PM' },
    { id: '2', sender: '익명', message: '오', created_at: '2024-12-28 12:40 PM' },
  ];

  const [messages, setMessages] = useState(dummyMessages);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSend = (message) => {
    const now = new Date();
  
    const formattedDate = now.toLocaleDateString('en-CA'); // YYYY-MM-DD 형식
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  
    setMessages([
      ...messages,
      {
        id: String(messages.length + 1),
        sender: '나',
        message,
        created_at: `${formattedDate} ${formattedTime}`,
      },
    ]);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding" // iOS에서만 작동
          keyboardVerticalOffset={-40} // 상태바 + 상단바 높이 조정
        >
          <AppTopBar
            title="채팅"
            icon="arrow-back"
            onIconPress={() => console.log("뒤로가기 클릭됨")}
            rightIcon="ellipsis-vertical"
            onRightIconPress={toggleModal}
          />
          <Content>
            <ChatList messages={messages} />
          </Content>
          <ChatInputContainer>
            <ChatInput onSend={handleSend} />
          </ChatInputContainer>
        </KeyboardAvoidingView>
        {/* ChatSideModal 추가 */}
        <ChatSideModal isVisible={isModalVisible} onClose={toggleModal} />
      </Screen>
    </TouchableWithoutFeedback>
  );
}

// Styled Components
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
  height: 100px; /* 입력창 높이 고정 */
  width: 100%;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  background-color: ${(props) => props.theme.background || '#FFFFFF'};
`;
