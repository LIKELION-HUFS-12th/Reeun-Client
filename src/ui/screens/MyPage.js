import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import ClassEl from '../components/ClassEl'
import { useUserInfoStore, useUserStore } from '../../logic/store/user'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPage = ({navigation}) => {
  const class_num = [1, "", 3]
  const {user, setUser} = useUserStore();
  const {userInfo, setUserInfo} = useUserInfoStore();

  

  const handleLogOut = async() => {
    try {
      const response = await axios.post('https://reeun.store/member/logout/',{}, {
        headers:{
          Authorization : `Bearer ${user}`
        }
      
      })
      console.log("성공!");
      setUserInfo([]);
      setUser(false);
      console.log(userInfo);
      console.log(user);
    } catch (error) {
      console.log(error);
      console.log("에러!!");
    }
  }

  const handleDelete = async() => {
    try {
      const response = await axios.post('https://reeun.store/member/delete/',{
        password:"password123!"
      }, {
        headers:{
          Authorization : `Bearer ${user}`
        }
      
      })
      console.log("성공!")
      setUser(false);
    } catch (error) {
      console.log(error);
      console.log("에러!!");
    }
  }

  const goToLogoutAlert = () => {
    Alert.alert("로그아웃 하시겠어요?", "", [
      {
        //style을 통해 알러트가 닫힘
        style: "cancel",
        text: "아니요"
      },
      {
        text: "네",
        //버튼을 누르면 동작할 로직을 직접 적어줄 수도 있음
        onPress: () => handleLogOut(),
      }
      //버튼관리
    ])
  }

  const goToDeleteAlert = () => {
    Alert.alert("탈퇴하시겠어요?", "모든 정보가 사라집니다", [
      {
        //style을 통해 알러트가 닫힘
        style: "cancel",
        text: "아니요"
      },
      {
        text: "네",
        //버튼을 누르면 동작할 로직을 직접 적어줄 수도 있음
        onPress: () => handleLogOut(),
      }
      //버튼관리
    ])
  }
  
  useEffect(() => {
    setUserInfo([]);
  
  }, [user])
  
  
  

  return (
    <SafeAreaView style={{maxWidth:"350px", backgroundColor:"white", position:"relative"}}>
      
      <MyPageHeader>
        <TouchableOpacity>
          <Image source={require("../../../assets/arrow_back_black.png")}/>
        </TouchableOpacity>
        <MyPageText>마이페이지</MyPageText>
      </MyPageHeader>
      <EditButton>
          <Image source={require("../../../assets/edit_icon.png")}/>
          <Text>프로필 편집</Text>
      </EditButton>
      <ProfileContents>
        <ProfileImg source={require('../../../assets/profile_img.png')} />
        <UserName>{user ? userInfo.username:"로그인해주세요"}</UserName>
        <UserSchool><Text style={{color:"#FB5E3D", fontWeight:"700"}}>
          {userInfo.school ? userInfo.school
          :<TouchableOpacity><Text style={{fontSize:17, color:"#6c6c6c", fontWeight:'bold', textDecorationLine:'underline'}}>등록하기</Text></TouchableOpacity>}</Text>
          </UserSchool>
      </ProfileContents>
      <ViewMyActivity>
        <MyPostButton >
          <Image source={require("../../../assets/post_icon.png")}/>
          <Text style={{color:"#757373"}}>내가 쓴 게시물</Text>
        </MyPostButton>
        <MyCommentButton>
          <Image source={require("../../../assets/comment_icon.png")} />
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
      <View style={{ marginTop:user?'50':'90'}}>
      {user ? <LogOutButton onPress={goToLogoutAlert}>
        <LogOutText>로그아웃</LogOutText>
      </LogOutButton>
      :
      <></>}
      
      <CancleButton onPress={() => navigation.navigate('Login')}>
        <CancleText>{user ? "탈퇴하기" : "로그인하기"}</CancleText>
      </CancleButton>
      </View>
      
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

const LogOutButton = styled.TouchableOpacity`
  margin-left:30px;
  padding:10px 0;
`

const LogOutText = styled.Text`
  font-size:20px;
`

const CancleButton = styled.TouchableOpacity`
  margin-left:30px;
  
`

const CancleText = styled.Text`
  color:#D90C0C;
  font-size:20px;
  
`