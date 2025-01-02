import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import ClassEl from '../components/ClassEl'

const MyPage = () => {
  const class_num = [1, "", 3]

  return (
    <SafeAreaView style={{maxWidth:"350px"}}>
      
      <MyPageHeader>
        <TouchableOpacity>
          <Image source={require("../../assets/arrow_back_black.png")}/>
        </TouchableOpacity>
        <MyPageText>마이페이지</MyPageText>
      </MyPageHeader>
      <EditButton>
          <Image source={require("../../assets/edit_icon.png")}/>
          <Text>프로필 편집</Text>
      </EditButton>
      <ProfileContents>
        <ProfileImg source={require('../../assets/profile_img.png')} />
        <UserName>김멋사</UserName>
        <UserSchool><Text style={{color:"#FB5E3D", fontWeight:"700"}}>리운</Text>초등학교{"(2008)"}</UserSchool>
      </ProfileContents>
      <ViewMyActivity>
        <MyPostButton>
          <Image source={require("../../assets/post_icon.png")}/>
          <Text style={{color:"#757373"}}>내가 쓴 게시물</Text>
        </MyPostButton>
        <MyCommentButton>
          <Image source={require("../../assets/comment_icon.png")} />
          <Text style={{color:"#757373"}}>내가 쓴 댓글</Text>
        </MyCommentButton>
      </ViewMyActivity>
      <ViewMyClass>
        <Text style={{fontSize:'20', fontWeight:"700", marginLeft:"30", marginBottom:"15"}}>나의 반</Text>
        
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {class_num.map((num, index)=>{
              return(
              num === ""?
              
              <ClassEl grade={index+1} grade_text={"입력하기"}></ClassEl>

              :
              <ClassEl grade={index+1} grade_text={`${index+1}학년 ${num}반`}/>
              )
            })}
          </ScrollView>
        
      </ViewMyClass>
      <CancleButton>
        <CancleText>탈퇴하기</CancleText>
      </CancleButton>
    </SafeAreaView>
  )
}

export default MyPage


const MyPageHeader = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  align-items:center;
  margin-left:10px;
  margin-top:10px;
`

const MyPageText = styled.Text`
  font-size:20px;
  margin-left:10px;
`

const ProfileContents = styled.View`
  justify-content:center;
  align-items:center;
  gap:15px;
`

const ProfileImg = styled.Image`

`

const UserName = styled.Text`
  font-size:20px;
  font-weight:700;
  color:#FB5E3D;
`

const UserSchool = styled.Text`
  font-size:18px;
  margin-top:-10px;
`

const EditButton = styled.TouchableOpacity`
  display:flex;
  
  margin-right:30px;
  margin-top:30px;
  flex-direction:row;
  justify-content:flex-end;
  gap:5px;
  
`

const ViewMyActivity = styled.View`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  gap:12px;
  margin-top:50px;
`

const MyPostButton = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  gap:7px;
  justify-content:center;
  align-items:center;
  background-color:#F4F4F4;
  width:150px;
  height:70px;
  border-radius:10px;
`

const MyCommentButton = styled.TouchableOpacity`
  display:flex;
  flex-direction:row;
  gap:7px;
  justify-content:center;
  align-items:center;
  background-color:#F4F4F4;
  width:150px;
  height:70px;
  border-radius:10px;
`

const ViewMyClass = styled.View`
  display:flex;
  margin-top:40px;
`

const ClassList = styled.View`
  display:flex;
  flex-direction:row;
  gap:20px;
  overflow-x:scroll;
`

const CancleButton = styled.TouchableOpacity`
  margin-left:30px;
  margin-top:140px;
`

const CancleText = styled.Text`
  color:#D90C0C;
  font-size:20px;
  
`