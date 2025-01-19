import React, { useCallback, useEffect, useState } from 'react'
import {  Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import Modal from 'react-native-modal';
import { useAnonymousAtClassStore, useAnonymousStore, useUserInfoStore } from '../../logic/store/user';
import { useAsync } from '../../hooks/useAsync';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MemberModal = ({modalVisible, setModalVisible, schoolMember, classMember, version, selectedClass ,setClassMember, setSchoolMember}) => {
  const {userInfo} = useUserInfoStore();
  const {openNicknameToSchool, openNicknameToClass, getUserInfo} = useAsync();
  const {isAnonymousAtSchool} = useAnonymousStore();
  const {isAnonymousAtClasses} = useAnonymousAtClassStore();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh((prev) => !prev); // 리렌더링 트리거
  }, [isAnonymousAtClasses, isAnonymousAtSchool, userInfo, schoolMember, classMember]);

  // useEffect(
    
  //     setIsAnonymous(getAnonymous());
    
  // ,[])

  useEffect(() => {
    console.log('isAnonymousAtClass changed:', isAnonymousAtClasses);
    getUserInfo();
  }, [isAnonymousAtClasses]);





  return (
    <SafeAreaView>
      <Modal isVisible={modalVisible} animationIn={'slideInRight'} animationOut={'slideOutRight'} onBackdropPress={() => setModalVisible(false)} propagateSwipe={true}>
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
            {version==="School" && isAnonymousAtSchool === true ? (
                
                <View style={{position:'absolute', top:300, right:30, zIndex:9}}>
                  <Text style={{fontSize:20, fontWeight:600, textAlign:'center'}}>내 정보 공개 후 {"\n"}유저 목록을{"\n"} 조회할 수 있어요!</Text>
                  
                  <TouchableOpacity onPress={() => version==="School" ? openNicknameToSchool(setSchoolMember) : openNicknameToClass(selectedClass)} style={{marginTop:100, backgroundColor:"#FB5E3D", width:140, height:40, borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', zIndex:9}}>
                    <Text style={{color:'white', fontSize:'16', fontWeight:700}}>내 정보 공개하기</Text>
                  </TouchableOpacity>
                </View>) : <></> }
                {version === "Class" && isAnonymousAtClasses===true ?
            (
              <View style={{position:'absolute', top:300, right:30, zIndex:9}}>
                <Text style={{fontSize:20, fontWeight:600, textAlign:'center'}}>내 정보 공개 후 {"\n"}유저 목록을{"\n"} 조회할 수 있어요!</Text>
                
                <TouchableOpacity onPress={() => version==="School" ? openNicknameToSchool(setSchoolMember) : openNicknameToClass(selectedClass, classMember, setClassMember)} style={{marginTop:100, backgroundColor:"#FB5E3D", width:140, height:40, borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center', zIndex:9}}>
                  <Text style={{color:'white', fontSize:'16', fontWeight:700}}>내 정보 공개하기</Text>
                </TouchableOpacity>
              </View>)
            : <View></View>}
            <ScrollView>

                
              
              { version === "School" ? (
                
                schoolMember.map((el, index) => (
                  el.id === userInfo.id ? null : (
                    
                      <View
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          left: 170,
                          top: 200 + index * 30,
                        }}
                      >
                        <Text style={{ fontSize: 17, fontWeight: "700", flex: 1 }}>
                          {el.name ? el.name : `user id:${el.id}`}
                        </Text>
                        <TouchableOpacity style={{ position: "absolute", left: 130 }}>
                          <Image
                            source={require("../../../assets/dm.png")}
                            style={{ width: 22, height: 22 }}
                          />
                        </TouchableOpacity>
                      </View>
                    
                  )
                ))
              ) : (
                
                classMember.map((el, index) => (
                  el.id === userInfo.id ? null : (
                    
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        left: 170,
                        top: 200 + index * 30,
                      }}
                    >
                      <Text style={{ fontSize: 17, fontWeight: "700",}}>
                        {el.name ? el.name : `user id:${el.id}`}
                      </Text>
                      <TouchableOpacity style={{ position: "absolute", left:140}}>
                        <Image
                          source={require("../../../assets/dm.png")}
                          style={{ width: 22, height: 22 }}
                        />
                      </TouchableOpacity>
                    </View>
                    
                  )
                ))
              )}
              </ScrollView>
            
         <></>
        
        
          
      </Modal>
    </SafeAreaView>
  )
}

export default MemberModal