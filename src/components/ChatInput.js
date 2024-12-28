import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      style={{ flex: 1 }}
    >
      <InputContainer>
        <MessageInput
          value={input}
          onChangeText={setInput}
          placeholder="메시지를 입력하세요..."
          multiline={false} /* 높이 고정 */
        />
        <SendButton onPress={handleSend}>
          <SendButtonText>보내기</SendButtonText>
        </SendButton>
      </InputContainer>
    </KeyboardAvoidingView>
  );
}

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  background-color: ${(props) => props.theme.background || '#FFFFFF'};
  height: 60px; /* 높이 고정 */
`;

const MessageInput = styled(TextInput)`
  flex: 1;
  padding: 12px 16px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.otherBackground || '#F5F5F5'};
  font-size: 16px;
  height: 40px; /* 입력창 높이 고정 */
`;

const SendButton = styled(TouchableOpacity)`
  margin-left: 8px;
  padding: 12px 16px;
  border-radius: 20px;
  background-color: ${(props) => props.theme.mineBackground || '#DCF8C6'};
`;

const SendButtonText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text || '#000000'};
  font-weight: bold;
`;
