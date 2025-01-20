import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import CommentEl from '../components/CommentEl'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { useUserStore } from '../../logic/store/user'
import { useAsync } from '../../hooks/useAsync'

const ViewPost = ({route}) => {
  const height = Dimensions.get('screen').height;
  const {el,version, postList, setPostList} = route.params;
  const navigation = useNavigation();
  const [comment, setComment] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const {user} = useUserStore();
  const {getSchoolBoardPosts, getClassBoardPosts} = useAsync();

  useEffect(() => {
    console.log(el);
    version === "School" ? getSchoolBoardPosts(setPostList) : getClassBoardPosts(setPostList);


  }, [isComplete, el, postList])

  const handleCommentSchool = async() => {
    try {
      const response = await axios.post(`https://reeun.store/board/${el.id}/comments/`,{
        comment:comment
      },{
        headers:{
          Authorization:`Bearer ${user}`
        }
      })
      console.log(response.data);
      const newComment = {
        user: [{ name: user.name }], // 사용자의 이름 또는 ID
        comment: comment,
        created_at: new Date().toISOString(), // 현재 시간
      };
      el.comments = [...el.comments, newComment]; // 기존 댓글에 새 댓글 추가
      setComment(""); // 입력 필드 초기화
      // setIsComplete((prev) => !prev);
      console.log("el comments",el.comments)
      
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleCommentClass = async() => {
    try {
      const response = await axios.post(`https://reeun.store/classboard/comment/write/`,{
        classBoardId:el.id,
        comment:comment
      },{
        headers:{
          Authorization:`Bearer ${user}`
        }
      })
      console.log(response.data);
      
      const newComment = {
        user: [{ name: user.name }], // 사용자의 이름 또는 ID
        comment: comment,
        created_at: new Date().toISOString(), // 현재 시간
      };
      el.comments = [...el.comments, newComment]; // 기존 댓글에 새 댓글 추가
      setComment(""); // 입력 필드 초기화
      // setIsComplete((prev) => !prev);
      console.log(el.comments)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSchoolPostDelete = async() => {
    try {
      const response = await axios.delete(`https://reeun.store/board/${el.id}/`,{
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

  const handleClassPostDelete = async() => {
    try {
      const response = await axios.delete(`https://reeun.store/classboard/delete/`,{
        headers: {
          Authorization: `Bearer ${user}`,
        },
        data: {
          classBoardId: el.id, // 요청 본문에 전달할 데이터
        },
      })
      console.log(response.data);
      navigation.goBack()
    } catch (error) {
      console.log(error)
      console.log(el.id)
    }
  }

  const handleDeleteAlert = (handleDeleteFunction) => {
    
      Alert.alert("게시물을 삭제 하시겠어요?", "", [
        {
          //style을 통해 알러트가 닫힘
          style: "cancel",
          text: "아니요"
        },
        {
          text: "네",
          //버튼을 누르면 동작할 로직을 직접 적어줄 수도 있음
          onPress: () => handleDeleteFunction(),
        }
        //버튼관리
      ])
    
  }
  

  return (
    <SafeAreaView style={{backgroundColor:'white', height:height}}>
      <PostHeader>
        <TouchableOpacity style={{position:"absolute", left:"30"}} onPress={() => navigation.goBack()}>
          <Image source={require("../../../assets/arrow_back_gray.png")}  />
        </TouchableOpacity>
        <HeaderText>
          <Text style={{fontSize:"16"}}>{version === "School" ? "전체 커뮤니티" : "학급 커뮤니티"}</Text>
          {version === "School" ?
          <Text style={{fontSize:"20"}}><Text style={{color:"#FB5E3D", fontWeight:"900"}}>{el.school_name} </Text>초등학교{`(${el.admission_year})`}</Text>
          :
          <Text style={{fontSize:"20"}}><Text style={{color:"#FB5E3D", fontWeight:"900"}}>{`${el.grade}학년 ${el.order}반`} </Text>{`(${el.admission_year})`}</Text>

          } 
        </HeaderText>
      </PostHeader>
      <OwnerProfile>
        <OwnerProfileImg source={require("../../../assets/owner_profile.png")} />
        <View style={{display:"flex", flexGrow:2, gap:"5"}}>
          <OwnerName >{el.user.name ? el.user.name : el.user.id}</OwnerName>
          <UpLoadDate>{el.created_at}</UpLoadDate>
        </View>
        <TouchableOpacity style={{marginRight:"25", width:25, height:25}} onPress={() => version === "School" ? handleDeleteAlert(handleSchoolPostDelete): handleDeleteAlert(handleClassPostDelete)}> 
          <Image source={require("../../../assets/delete.png")} style={{width:20, height:20}}></Image>
        </TouchableOpacity>
      </OwnerProfile>
      <PostContent>
        <ContentTitle>{el.title}</ContentTitle>
        <ContentText>{el.body}</ContentText>
      </PostContent>
      
      <CommentsBody>
        <CommentCount>
          <Text >댓글 </Text>
          <Text style={{color:"#FB5E3D", fontWeight:"600"}}>{el.comments.length}</Text>
        </CommentCount>
        <ScrollView>
        {el.comments.map((el, index) => {
          return(
            <View key={index}>
              <CommentEl user_name={el.user[0]?.name || '익명'} comment={el.comment} date={el.created_at.slice(0,10)} index={index}/>
            </View>
          )
        })}
        </ScrollView>

      </CommentsBody>
      
      <InputBody>
        {/* <AnonymityCheck>
        <BouncyCheckbox
          size={25}
          fillColor="#F3F0F0"
          unfillColor="red"
          text="익명"
          iconStyle={{borderRadius:5, backgroundColor:"#F3F0F0", marginLeft:"20"}}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          onPress={(isChecked) => {}}
          
        />
        </AnonymityCheck> */}
        <CommentInput
          placeholder="댓글을 입력하세요"
          placeholderTextColor="#898989"
          value={comment}
          onChange={(e) => setComment(e.nativeEvent.text)}
        />
        <TouchableOpacity style={{width:60, backgroundColor:"#FB5E3D", paddingVertical:20, borderRadius:15, display:'flex', justifyContent:'center', alignItems:'center'}}
          onPress={() => {version === "School" ? handleCommentSchool() : handleCommentClass(); setIsComplete(true);}}
        >
        
          <Text style={{fontWeight:700, color:"white"}}>입력</Text>
        </TouchableOpacity>
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
  margin-top:20px;
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
  height:400px;
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
  justify-content:center;
  gap:10px;
  position:absolute;
  bottom:30px;
  left:20px;
`


const AnonymityCheck = styled.View`

`

const CommentInput = styled.TextInput`
  width:280px;
  background-color:#F5F5F5;
  padding:20px;
  border-radius:20px;
`