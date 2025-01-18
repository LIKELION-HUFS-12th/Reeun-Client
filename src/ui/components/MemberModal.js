import React, { useCallback, useEffect, useState } from 'react';
import {  Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import Modal from 'react-native-modal';
import { useUserInfoStore } from '../../logic/store/user';
import { useAsync } from '../../hooks/useAsync';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MemberModal = ({modalVisible, setModalVisible, schoolMember, classMember, version, selectedClass}) => {
  const {userInfo} = useUserInfoStore();
  const {openNicknameToSchool, openNicknameToClass} = useAsync();

  return (
    <SafeAreaView>
      <Modal 
        isVisible={modalVisible} 
        animationIn={'slideInRight'} 
        animationOut={'slideOutRight'} 
        onBackdropPress={() => setModalVisible(false)} // 외부 클릭 시 닫기
        backdropOpacity={0.5} // 배경 어둡기 설정
        style={{ justifyContent: 'flex-end', margin: 0 }} // 모달 위치 설정
      >
        <View style={{
          width: Dimensions.get('screen').width / 1.7,
          height: Dimensions.get('screen').height,
          backgroundColor: "white",
          position: 'absolute',
          right: 0,
          padding: 20
        }}>
          <Text style={{ marginTop: 80, fontSize: 24, fontWeight: '700', color: "#FB5E3D" }}>
            {version === "School" ? userInfo.school.school_name : `${selectedClass.grade}학년 ${selectedClass.order}반`}
          </Text>
          <Text style={{ marginTop: 20, fontSize: 22, fontWeight: '700' }}>유저목록</Text>

          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 17, fontWeight: '700' }}>
              {userInfo.name ? userInfo.name : userInfo.username} (나)
            </Text>
            <View style={{ width: '100%', height: 0.5, backgroundColor: "#B2B2B0", marginVertical: 10 }}></View>
          </View>

          <ScrollView style={{ marginTop: 10 }}>
            {version === "School" ? schoolMember.map((el, index) => (
              el.id !== userInfo.id && (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                  <Text style={{ fontSize: 17, fontWeight: '700' }}>
                    {el.name ? el.name : `user id:${el.id}`}
                  </Text>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/dm.png")} style={{ width: 22, height: 22 }} />
                  </TouchableOpacity>
                </View>
              )
            )) : classMember.map((el, index) => (
              el.id !== userInfo.id && (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                  <Text style={{ fontSize: 17, fontWeight: '700' }}>
                    {el.name ? el.name : `user id:${el.id}`}
                  </Text>
                  <TouchableOpacity>
                    <Image source={require("../../../assets/dm.png")} style={{ width: 22, height: 22 }} />
                  </TouchableOpacity>
                </View>
              )
            ))}
          </ScrollView>

          <TouchableOpacity 
            onPress={() => version === "School" ? openNicknameToSchool() : openNicknameToClass(selectedClass)} 
            style={{
              marginTop: 20,
              backgroundColor: '#FB5E3D',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white', fontWeight: '700' }}>내 정보 공개하고 유저 목록 보기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default MemberModal;
