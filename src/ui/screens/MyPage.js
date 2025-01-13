import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import ClassEl from '../components/ClassEl'
import { useUserInfoStore, useUserStore } from '../../logic/store/user'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsync } from '../../hooks/useAsync'
import { useMyPage } from '../../hooks/useMyPage'
import { useFocusEffect } from '@react-navigation/native'
import ClassAddEl from '../components/ClassAddEl'
import Modal from 'react-native-modal'


const MyPage = ({navigation}) => {
  const class_num = [1, "", 3]
  const {user, setUser} = useUserStore();
  const {userInfo, setUserInfo} = useUserInfoStore();
  const {handleLogOut, handleDelete, getUserInfo} = useAsync();
  const {goToLogoutAlert, goToDeleteAlert, deleteModalVisible, setDeleteModalVisible} = useMyPage();
  const [deletePassword, setDeletePassword] = useState("");

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    },[user])
  )
  

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
          {!user ? "":userInfo.school ? userInfo.school.school_name
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
            {user ? userInfo.classList?.length > 0 ? 
          <>
          { userInfo.classList.map((el, index) => {
            return(
            <ClassEl grade={el.grade} grade_text={`${el.grade}학년 ${el.order}반`} key={index}></ClassEl>
            )
          })
            
          }
          <ClassAddEl navigation={navigation}/>
          </>
          :
          <ClassAddEl navigation={navigation} />

          :
          <ClassAddEl navigation={navigation} />}
          </ScrollView>
        
      </ViewMyClass>
      <View style={{ marginTop:user?'50':'90'}}>
      {user ? <LogOutButton onPress={() => {goToLogoutAlert(handleLogOut)}}>
        <LogOutText>로그아웃</LogOutText>
      </LogOutButton>
      :
      <></>}
      
      <CancleButton onPress={() => user ? goToDeleteAlert(handleDelete) : navigation.navigate('Login')}>
        <CancleText>{user ? "탈퇴하기" : "로그인하기"}</CancleText>
      </CancleButton>
      </View>
      <SafeAreaView>
        
        <Modal isVisible={deleteModalVisible} animationIn={'fadeIn'} animationOut={'fadeOut'} onBackdropPress={() => setDeleteModalVisible(false)} >
          <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <View style={{width:270, height:150, backgroundColor:'#EFEFEF', position:'absolute', top:"-50", justifyContent:'center', alignItems:'center',
            borderRadius:15, 
          }}>
            <Text style={{fontSize:'18', fontWeight:600, textAlign:'center', marginBottom:10}} >
              {"탈퇴하시려면 비밀번호를 \n입력해주세요"}
            </Text>
            
            <TextInput secureTextEntry={true} style={{backgroundColor:"white", width:'200', padding:5, borderRadius:2,}} placeholder='비밀번호를 입력하세요' value={deletePassword} onChange={(e) => {setDeletePassword(e.nativeEvent.text)}}></TextInput>
            <View style={{width:250, backgroundColor:"#B2B2B4", height:'.5', marginTop:'15'}}></View>
            <TouchableOpacity onPress={() => handleDelete(deletePassword , setDeleteModalVisible)} style={{paddingVertical:15, paddingHorizontal:100, marginBottom:'-20'}}>
              <Text style={{color:"#017BFF", fontSize:18, fontWeight:500}}>확인</Text>
            </TouchableOpacity>
          </View>
          </View>
        </Modal>
        
      </SafeAreaView>
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