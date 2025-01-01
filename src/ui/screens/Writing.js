import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';

export default function WritingScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);  // 익명 체크 상태 추가

  const handleToggleAnonymous = () => setIsAnonymous((prev) => !prev);  // 체크박스 토글 함수

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Container>
        <Header>
          <CloseButton onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/close.png')} style={{ width: 20, height: 20 }} />
          </CloseButton>
          <TitleText>글쓰기</TitleText>
          <DoneButton onPress={() => console.log('게시')} activeOpacity={0.7}>
            <DoneText>완료</DoneText>
          </DoneButton>
        </Header>

        <InputContainer>
          <LabelText>제목</LabelText>
          <Input
            placeholder="제목을 입력해주세요"
            value={title}
            onChangeText={setTitle}
          />
          <Line />

          <ContentInput
            placeholder="내용을"
            multiline
            value={content}
            onChangeText={setContent}
          />
        </InputContainer>

        <AnonymousSection>
          <CheckBoxButton onPress={handleToggleAnonymous}>
            <CheckBoxIcon isChecked={isAnonymous} />
            <Text style={{ fontSize: 16, color: '#6c6c6c' }}>익명 </Text>
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
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const DoneButton = styled.TouchableOpacity``;

const DoneText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.main};
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

const LabelText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text};
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.main};
  margin-bottom: 20px;
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

const Line = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.main};
  margin-bottom: 10px;
`;

const ContentInput = styled.TextInput`
  height: 120px;
  border-width: 1px;
  border-color: ${(props) => props.theme.main};
  padding: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.text};
  text-align-vertical: top;
`;

const AnonymousSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

const CheckBoxButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

const CheckBoxIcon = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border-width: 2px;
  border-color: #6c6c6c;
  background-color: ${(props) => (props.isChecked ? props.theme.main : 'transparent')};
  margin-right: 10px;
`;
