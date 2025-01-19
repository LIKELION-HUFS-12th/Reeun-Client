import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'

const CommentEl = ({user_name, comment, date, index}) => {
  return (
              <View style={{display:"flex", flexDirection:"row", alignItems:'center',margin:"auto", gap:'15', marginBottom:"15"}} key={index}>
                <CommentBody>
                  <CommentProfile source={require("../../../assets/comment_profile.png")} />
                  <View style={{display:"flex", flexGrow:2, gap:"3"}}>
                    <CommentUserName>{user_name}</CommentUserName>
                    <CommentContent>{comment}</CommentContent>
                  </View>
                  <CommentDate>{date}</CommentDate>
                </CommentBody>
                <TouchableOpacity style={{marginRight:"0"}}> 
                    <Image source={require("../../../assets/add_icon.png")} />
                </TouchableOpacity>
              </View>
  )
}

export default CommentEl


const CommentBody = styled.View`
  display:flex;
  flex-direction:row;
  width:320px;
  gap:20px;
  align-items:center;
  padding:15px;
  background-color:#F4F4F4;
  border-radius:20px;
  box-sizing:border-box;
`

const CommentProfile = styled.Image`
  flex-grow:1;
  max-width:40px;
  max-height:40px;
`

const CommentUserName = styled.Text`
  font-size:16px;
  font-weight:600;
`

const CommentContent = styled.Text`

`

const CommentDate = styled.Text`
  font-size:12px;
`