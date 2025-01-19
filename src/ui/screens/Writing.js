import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';  // ScrollView를 명시적으로 임포트
import styled from 'styled-components/native';
import axios from 'axios'
import { useUserInfoStore, useUserStore } from '../../logic/store/user';

export default function WritingScreen({ route}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const {version, selectedClass} = route.params;
  const navigation = useNavigation();
  const {userInfo} = useUserInfoStore();
  const {user} = useUserStore();


  const handleToggleAnonymous = () => setIsAnonymous((prev) => !prev);

  const handleWritingClass = async() => {
    try {
      const response = await axios.post("https://reeun.store/classboard/",{
        grade:selectedClass.grade,
        order:selectedClass.order,
        admission_year:userInfo.enrollYear,
        title:title,
        body:content
      },{
        headers:{
          Authorization:`Bearer ${user}`
        }
      })
      console.log(response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(selectedClass);
  }, [])
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <TopRow>
                <CloseButton onPress={() => navigation.goBack()}>
                  <Image source={require('../../../assets/close.png')} style={{ width: 13, height: 13 }} />
                </CloseButton>
                <TitleText>글쓰기</TitleText>
              </TopRow>
              <DoneButton onPress={() => handleWritingClass()} activeOpacity={0.7}>
                <DoneText>완료</DoneText>
              </DoneButton>
            </Header>

            <InputContainer>
              <Input
                placeholder="제목"
                value={title}
                onChange={(e) => {setTitle(e.nativeEvent.text);console.log(e.nativeEvent.text)}}
                placeholderTextColor="#000"
              />

              <ContentInput
                placeholder="내용"
                multiline
                value={content}
                onChange={(e) => {setContent(e.nativeEvent.text);console.log(e.nativeEvent.text)}}
                
              />
            </InputContainer>

            <AnonymousSection>
              <CheckBoxButton onPress={handleToggleAnonymous}>
                <CheckBoxIcon isChecked={isAnonymous} />
                <Text style={{ fontSize: 13, color: '#6c6c6c' }}>익명 </Text>
              </CheckBoxButton>
            </AnonymousSection>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: ${(props) => props.theme.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CloseButton = styled.TouchableOpacity``;

const TitleText = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.text};
  margin-left: 25px;
`;

const DoneButton = styled.TouchableOpacity``;

const DoneText = styled.Text`
  font-size: 17px;
  color: #6c6c6c;
`;

const InputContainer = styled.View`
  margin-bottom: 50px;
`;

const Input = styled.TextInput`
  padding-left: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.main};
  margin-top: 30px;
  margin-bottom: 5px;
  font-size: 17px;
  color: ${(props) => props.theme.text};
  font-weight: bold;
`;

const ContentInput = styled.TextInput`
  padding-left: 10px;
  height: 500px;
  font-size: 15px;
  color: ${(props) => props.theme.text};
`;

const AnonymousSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const CheckBoxButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
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
