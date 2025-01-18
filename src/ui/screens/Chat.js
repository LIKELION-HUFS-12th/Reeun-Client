import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AppTopBar from '../components/AppTopBar';
import ChatList from '../components/ChatList';
import ChatInput from '../components/ChatInput';
import ChatSideModal from '../components/ChatSideModal';
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import useChatState from '../../logic/hooks/useChatState';

export default function Chat() {
  const navigation = useNavigation();
  const { messages, handleSend, isModalVisible, toggleModal, loading } = useChatState();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={-40}
        >
          <AppTopBar
            title="채팅"
            iconSource={require('../../../assets/arrow_back_black.png')}
            onIconPress={() => navigation.goBack()}
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
