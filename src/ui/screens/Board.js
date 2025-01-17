import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { useUserInfoStore, useUserStore } from '../../logic/store/user';
import { useAsync } from '../../hooks/useAsync';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import MemberModal from '../components/MemberModal';
import { useBoard } from '../../hooks/useBoard';

export default function BoardScreen({route ,navigation}) {
  const {user} = useUserStore();
  const {userInfo} = useUserInfoStore();
  const schoolName = userInfo.school.school_name.split("초등학교");
  const year = userInfo.enrollYear; 
  const {getSchoolBoardPosts ,getClassBoardPosts, getSchoolMember, getClassMember} = useAsync();
  const {handleMenu } = useBoard();
  const {version, selectedClass, setSelectedClass} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [schoolMember, setSchoolMember] = useState([]);
  const [classMember, setClassMember] = useState([]);
  const [postList, setPostList] = useState([]);
  const memberCount = version === "School" ? schoolMember.length : classMember.length;


  // const postList = [{"id": 1,
  //     "user": "mutsa",
  //     "school_name": "경기초등학교",
  //     "admission_year": 2007,
  //     "title": "새 게시글 제목",
  //     "body": "게시글 내용입니다.",
  //     "created_at": "2024-09-04",
  //     "comments": [
  //       {
  //         "id": 0,
  //         "user": "mutsa2", // 댓글단 유저의 아이디
  //         "comment": "댓글입니다.",
  //         "created_at": "2024-10-04",
  //         "board": 1
  //       }
  //     ]},{"id": 2,
  //     "user": "mutsa",
  //     "school_name": "경기초등학교",
  //     "admission_year": 2007,
  //     "title": "새 게시글 제목2",
  //     "body": "게시글 내용입니다.2",
  //     "created_at": "2024-09-07",
  //     "comments": [
  //       {
  //         "id": 0,
  //         "user": "mutsa2", // 댓글단 유저의 아이디
  //         "comment": "댓글입니다.",
  //         "created_at": "2024-10-04",
  //         "board": 1
  //       }
  //     ]}]


  useFocusEffect(
    useCallback(() => {
      if(version==="School"){
        getSchoolBoardPosts();
      }
      if(version==="Class"){
        getClassBoardPosts(selectedClass, setPostList);
      }
      
      console.log(schoolMember);
    },[user])
  )


  


  return (
    <Container>
      <Header>
        <TopRow>
          <BackButton onPress={() => navigation.navigate('Home')}>
            <BackIcon source={require('../../../assets/back.png')} />
          </BackButton>
          <MenuButton onPress={() => handleMenu(setModalVisible, schoolMember, setSchoolMember, getSchoolMember, getClassMember, version, setClassMember, selectedClass)}>
            <MenuIcon source={require('../../../assets/menu.png')} />
          </MenuButton>
          
        </TopRow>
        <BottomRow>
          <SchoolName>{version === 'School' ? schoolName : `${selectedClass.grade}학년 ${selectedClass.order}반`}</SchoolName>
          <RegularText>
            {version === "School" ? "초등학교 전체 커뮤니티" : "학급 커뮤니티"} {version === "School" ? <BoldText>{`(${year})`}</BoldText> : <></>}
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
        {postList.map((el, index) => {
          return(
            <Post key={index}>
              <PostTitle>{el.title}</PostTitle>
              <PostPreview>{el.body}</PostPreview>
              <PostDate>{`댓글 ${el.comments.length} ${el.created_at}`}</PostDate>
            </Post>
          )
        })}
      </ScrollView>

      <WriteButton onPress={() => navigation.navigate("Writing")}>
        <WriteButtonText>
          글쓰기  <WritingIcon source={require('../../../assets/writing.png')} />
        </WriteButtonText>
      </WriteButton>
      <MemberModal modalVisible={modalVisible} setModalVisible={setModalVisible} schoolMember={schoolMember} classMember={classMember} version={version} selectedClass={selectedClass}></MemberModal>

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

const Post = styled.TouchableOpacity`
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
