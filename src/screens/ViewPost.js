import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import CommentEl from '../components/CommentEl'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const ViewPost = () => {
  const comment_user = ["김00", "이00"];
  const comment = ["뭐야ㅋㅋㅋㅋ 너 누군데??", "누구게~?"];
  const date = ["2024.09.04", "2024.09.05"]

  return (
    <SafeAreaView>
      <PostHeader>
        <TouchableOpacity style={{position:"absolute", left:"30"}}>
          <Image source={require("../../assets/arrow_back_gray.png")}  />
        </TouchableOpacity>
        <HeaderText>
          <Text style={{fontSize:"16"}}>전체 커뮤니티</Text>
          <Text style={{fontSize:"20"}}><Text style={{color:"#FB5E3D", fontWeight:"900"}}>리운 </Text>초등학교{"(2008)"}</Text>
        </HeaderText>
      </PostHeader>
      <OwnerProfile>
        <OwnerProfileImg source={require("../../assets/owner_profile.png")} />
        <View style={{display:"flex", flexGrow:2, gap:"5"}}>
          <OwnerName >익명</OwnerName>
          <UpLoadDate>2024-09-04</UpLoadDate>
        </View>
        <TouchableOpacity style={{marginRight:"25"}}> 
          <Image source={require("../../assets/add_icon.png")} />
        </TouchableOpacity>
      </OwnerProfile>
      <PostContent>
        <ContentTitle>와 우리 학급도 여기 있네??</ContentTitle>
        <ContentText>다들 보고싶다!</ContentText>
      </PostContent>
      
      <CommentsBody>
        <CommentCount>
          <Text >댓글</Text>
          <Text style={{color:"#FB5E3D", fontWeight:"600"}}>2</Text>
        </CommentCount>
        <ScrollView>
        {comment_user.map((el, index) => {
          return(
              <CommentEl user_name={el} comment={comment[index]} date={date[index]}/>
          )
        })}
        </ScrollView>

      </CommentsBody>
      
      <InputBody>
        <AnonymityCheck>
        <BouncyCheckbox
          size={25}
          fillColor="#F3F0F0"
          unfillColor="red"
          text="익명"
          iconStyle={{borderRadius:5, backgroundColor:"#F3F0F0", marginLeft:"20"}}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          onPress={(isChecked) => {}}
          
        />
        </AnonymityCheck>
        <CommentInput
          placeholder="댓글을 입력하세요"
          placeholderTextColor="#898989"
        />
      </InputBody>
    </SafeAreaView>
  )
}

export default ViewPost

const PostHeader = styled.View`
  display:flex;
  flex-direction:row;
  position:relative;
  align-items:center;
  justify-content:center;
`

const HeaderText = styled.View`
  display:flex;
  align-items:center;
  gap:5px;
`

const OwnerProfile = styled.View`
  display:flex;
  flex-direction:row;
  height:50px;
  justify-content:center;
  align-items:center;
  gap:10px;
  margin-top:20px;
`

const OwnerProfileImg = styled.Image`
  flex-grow:1;
  max-width:40px;
  max-height:40px;
  z-index:9;
  margin-left:30px;
`

const OwnerName = styled.Text`
  font-size:18px;
  font-weight:700;
`

const UpLoadDate = styled.Text`

`

const PostContent = styled.View`
  padding:0 30px;
  margin-top:25px;
  margin-bottom:50px;
`

const ContentTitle = styled.Text`
  font-size:20px;
  font-weight:700;
  margin-bottom:15px;
`

const ContentText = styled.Text`
  font-size:18px;
`

const CommentsBody = styled.View`
  min-height:400px;
`

const CommentCount = styled.View`
  margin-bottom:10px;
  display:flex;
  flex-direction:row;
  margin-left:30px;
`

const InputBody = styled.View`
  display:flex;
  flex-direction:row;
  align-items:center;
`


const AnonymityCheck = styled.View`

`

const CommentInput = styled.TextInput`
  width:280px;
  background-color:#F5F5F5;
  padding:20px;
  border-radius:20px;
`