import React, { useCallback, useEffect, useState } from 'react'
import {  Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import Modal from 'react-native-modal';
import { useUserInfoStore } from '../../logic/store/user';
import { useAsync } from '../../hooks/useAsync';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MemberModal = ({modalVisible, setModalVisible, schoolMember, classMember, version, selectedClass}) => {
  const {userInfo} = useUserInfoStore();
  const {openNicknameToSchool, openNicknameToClass} = useAsync();
  

  // useEffect(
    
  //     setIsAnonymous(getAnonymous());
    
  // ,[])




  return (
    <SafeAreaView>
      <Modal isVisible={modalVisible} animationIn={'slideInRight'} animationOut={'slideOutRight'} onBackdropPress={() => setModalVisible(false)}>
        <View style={{width:Dimensions.get('screen').width/1.7
        , height:Dimensions.get('screen').height, backgroundColor:"white", position:'absolute', right:'-17'}}>
          <Text style={{marginTop:80, fontSize:'24', fontWeight:'700', position:'absolute', left:'20', color:"#FB5E3D"}}>
            {version === "School" ? userInfo.school.school_name:`${selectedClass.grade}학년 ${selectedClass.order}반`}
            </Text>
          <Text style={{marginTop:110, fontSize:'22', fontWeight:'700', position:'absolute', left:'20'}}>유저목록</Text>
        </View>
            <View style={{ display:'flex', gap:10, justifyContent:'center',position:'absolute', left:140, top:150}}>
              <Text style={{fontSize:17, fontWeight:'700', marginLeft:30}}>{userInfo.name?userInfo.name : userInfo.username}</Text>
            <View style={{width:Dimensions.get('screen').width/1.8, height:'.5', backgroundColor:"#B2B2B0"}}></View>
            </View>
        <ScrollView >
          {version==="School" ? schoolMember.map((el, index) => {
            return(
              <>
              {el.id === userInfo.id ? <></>:
            <View key={index} style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center',position:'absolute', left:170, top:200+index*30}}>
              <Text style={{fontSize:17, fontWeight:'700', flex:'1'}}>{el.name?el.name:`user id:${el.id}`}</Text>
              <TouchableOpacity style={{position:'absolute', left:130}}>
                <Image source={require("../../../assets/dm.png")} style={{width:22, height:22}}></Image>
              </TouchableOpacity>
            </View>
            }
            </>
            )
          }) : classMember.map((el, index) => {
            return(
              <>
              {el.id === userInfo.id ? <></>:
            <View key={index} style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center',position:'absolute', left:170, top:200+index*30}}>
              <Text style={{fontSize:17, fontWeight:'700'}}>{el.name?el.name:`user id:${el.id}`}</Text>
              <TouchableOpacity style={{position:'relative', left:70}}>
                <Image source={require("../../../assets/dm.png")} style={{width:22, height:22}}></Image>
              </TouchableOpacity>
            </View>
            }
            </>)
          })}
        </ScrollView>
         <></>
        
        <TouchableOpacity onPress={() => version==="School" ? openNicknameToSchool() : openNicknameToClass(selectedClass)} style={{marginTop:200, position:'absolute', left:150, bottom:20}}>
          <Text>내 정보 공개하기</Text>
        </TouchableOpacity>
          
      </Modal>
    </SafeAreaView>
  )
}

export default MemberModal