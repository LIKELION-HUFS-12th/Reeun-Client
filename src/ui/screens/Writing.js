import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';

export default function WritingScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleToggleAnonymous = () => setIsAnonymous((prev) => !prev);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Container>
        <Header>
          <CloseButton onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/close.png')} style={{ width: 15, height: 15 }} />
          </CloseButton>
          <TitleText>글쓰기</TitleText>
          <DoneButton onPress={() => console.log('게시')} activeOpacity={0.7}>
            <DoneText>완료</DoneText>
          </DoneButton>
        </Header>

        <InputContainer>
          <Input
            placeholder="제목"
            value={title}
            onChangeText={setTitle}
          />

          <ContentInput
            placeholder="내용"
            multiline
            value={content}
            onChangeText={setContent}
          />
        </InputContainer>

        <AnonymousSection>
          <CheckBoxButton onPress={handleToggleAnonymous}>
            <CheckBoxIcon isChecked={isAnonymous} />
            <Text style={{ fontSize: 13, color: '#6c6c6c' }}>익명 </Text>
          </CheckBoxButton>
        </AnonymousSection>

      </Container>
    </KeyboardAvoidingView>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const CloseButton = styled.TouchableOpacity``;

const TitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const DoneButton = styled.TouchableOpacity``;

const DoneText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #6c6c6c;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

const Input = styled.TextInput`
  height: 40px;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.main};
  margin-bottom: 20px;
  font-size: 17px;
  color: ${(props) => props.theme.text};
`;

const ContentInput = styled.TextInput`
  height: 530px;
  padding: 10px;
  font-size: 15px;
  color: ${(props) => props.theme.text};
`;

const AnonymousSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const CheckBoxButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const CheckBoxIcon = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 3px;
  border-width: 2px;
  border-color: #6c6c6c;
  background-color: ${(props) => (props.isChecked ? props.theme.main : 'transparent')};
  margin-right: 5px;
`;
