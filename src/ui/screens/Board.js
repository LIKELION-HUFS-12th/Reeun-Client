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
        <TopRow>
          <BackButton onPress={() => navigation.goBack()}>
            <BackIcon source={require('../../../assets/back.png')} />
          </BackButton>
          <MenuButton>
            <MenuIcon source={require('../../../assets/menu.png')} />
          </MenuButton>
        </TopRow>
        <BottomRow>
          <SchoolName>{schoolName}</SchoolName>
          <RegularText>
            초등학교 전체 커뮤니티 (<BoldText>{year}</BoldText>)
          </RegularText>
        </BottomRow>
      </Header>

      <MemberSection>
        <MemberText>
          멤버 <BoldNumber>{memberCount}</BoldNumber>
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
  position: relative;
`;

const Header = styled.View`
  margin-bottom: 15px;
  margin-top: 50px;
`;

const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BottomRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.TouchableOpacity`
  padding: 10px;
`;

const BackIcon = styled.Image`
  width: 15px;
  height: 15px;
`;

const SchoolName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-right: 3px;
  color: ${(props) => props.theme.main};
`;

const RegularText = styled.Text`
  font-size: 18px;
  font-weight: normal;
  color: ${(props) => props.theme.text};
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
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const MemberText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.text};
  margin-right: 10px;
`;

const BoldNumber = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.main};
`;

const AddButton = styled.TouchableOpacity`
  padding: 1px;
`;

const ButtonText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.main};
`;

const Post = styled.View`
  background-color: ${(props) => props.theme.itemBackground};
  padding: 18px;
  margin-bottom: 15px;
  border-radius: 20px;
`;

const PostTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 5px;
`;

const PostPreview = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
`;

const PostDate = styled.Text`
  font-size: 10px;
  color: #898989;
`;

const WriteButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.main};
  padding: 10px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  left: 50%;
  width: 96px;
  margin-left: -58px;
`;

const WriteButtonText = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: bold;
`;

const WritingIcon = styled.Image`
  width: 13px;
  height: 13px;
  margin-right: 8px;
`;

const styles = {
  posts: {
    paddingBottom: 80,
  },
};
