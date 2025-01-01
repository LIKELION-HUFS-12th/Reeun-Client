import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

export default function BoardScreen({ navigation }) {
  const schoolName = "리운"; 
  const year = "2008"; 
  const memberCount = 11;

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <BackIcon source={require('../../../assets/back.png')} />
        </BackButton>
        <SchoolName>{schoolName}</SchoolName>
        <BoldText>초등학교 전체 커뮤니티 ({year})</BoldText>
        <MenuButton>
          <MenuIcon source={require('../../../assets/menu.png')} />
        </MenuButton>
      </Header>

      <MemberSection>
        <MemberText>
          멤버 {memberCount}
        </MemberText>
        <AddButton onPress={() => navigation.navigate('WriteScreen')}>
          <ButtonText>+</ButtonText>
        </AddButton>
      </MemberSection>

      <ScrollView contentContainerStyle={styles.posts}>
        <Post>
          <PostTitle>와 우리 학급도 여기 있네??</PostTitle>
          <PostPreview>다들 보고 싶다!</PostPreview>
          <PostDate>댓글 2 2024-09-04 익명</PostDate>
        </Post>
        <Post>
          <PostTitle>와 우리 학급도 여기 있네??</PostTitle>
          <PostPreview>다들 보고 싶다!</PostPreview>
          <PostDate>댓글 2 2024-09-04 익명</PostDate>
        </Post>
      </ScrollView>

      <WriteButton onPress={() => navigation.navigate('WriteScreen')}>
        <WriteButtonText>
          글쓰기  <WritingIcon source={require('../../../assets/writing.png')} />
        </WriteButtonText>
      </WriteButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
`;

const Header = styled.View`
  margin-bottom: 15px;
  margin-top: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const BackButton = styled.TouchableOpacity`
  padding: 10px;
`;

const BackIcon = styled.Image`
  width: 15px;
  height: 15px;
`;

const SchoolName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-right: 5px;
  color: ${(props) => props.theme.main};
`;

const BoldText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const MenuButton = styled.TouchableOpacity`
  padding: 10px;
`;

const MenuIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const MemberSection = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
`;

const MemberText = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.text};
  margin-right: 10px;
`;

const AddButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  margin-top: -10px;
`;

const ButtonText = styled.Text`
  font-size: 28px;
  color: ${(props) => props.theme.main};
`;

const Post = styled.View`
  background-color: ${(props) => props.theme.itemBackground};
  padding: 18px;
  margin-bottom: 15px;
  border-radius: 20px;
`;

const PostTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 5px;
`;

const PostPreview = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
`;

const PostDate = styled.Text`
  font-size: 14px;
  color: #898989;
`;

const WriteButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.main};
  padding: 15px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 30px;
  left: 40%;
`;

const WriteButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: bold;
`;

const WritingIcon = styled.Image`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`;

const styles = {
  posts: {
    paddingBottom: 80,
  },
};
