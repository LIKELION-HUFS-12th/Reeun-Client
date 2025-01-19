import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useUserInfoStore } from '../../logic/store/user';
import { useAsync } from '../../hooks/useAsync';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 추가

const MemberModal = ({ modalVisible, setModalVisible, schoolMember, classMember, version, selectedClass }) => {
  const { userInfo } = useUserInfoStore();
  const { openNicknameToSchool, openNicknameToClass } = useAsync();
  const navigation = useNavigation(); // 네비게이션 훅 사용

  // 쪽지 아이콘 클릭 시 Chat.js로 이동
  const handleSendMessage = (member) => {
    console.log('Navigating to Chat with:', member);
    navigation.navigate('Chat', {
      screen: 'Chat', // ChatStack 내부의 Chat 화면을 명시적으로 지정
      params: {
        recipientId: member.id,
        recipientName: member.name || `user id:${member.id}`,
      },
    });
  };
  

  return (
    <SafeAreaView>
      <Modal
        isVisible={modalVisible}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.5}
        style={{ justifyContent: 'flex-end', margin: 0 }}
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
            {version === "School"
              ? schoolMember.map((el, index) => (
                  el.id !== userInfo.id && (
                    <View
                      key={index}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}
                    >
                      <Text style={{ fontSize: 17, fontWeight: '700' }}>
                        {el.name ? el.name : `user id:${el.id}`}
                      </Text>
                      <TouchableOpacity onPress={() => handleSendMessage(el)}> {/* 쪽지 아이콘 클릭 시 이동 */}
                        <Image source={require("../../../assets/dm.png")} style={{ width: 22, height: 22 }} />
                      </TouchableOpacity>
                    </View>
                  )
                ))
              : classMember.map((el, index) => (
                  el.id !== userInfo.id && (
                    <View
                      key={index}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}
                    >
                      <Text style={{ fontSize: 17, fontWeight: '700' }}>
                        {el.name ? el.name : `user id:${el.id}`}
                      </Text>
                      <TouchableOpacity onPress={() => handleSendMessage(el)}> {/* 쪽지 아이콘 클릭 시 이동 */}
                        <Image source={require("../../../assets/dm.png")} style={{ width: 22, height: 22 }} />
                      </TouchableOpacity>
                    </View>
                  )
                ))}
          </ScrollView>

          <TouchableOpacity
            onPress={() => (version === "School" ? openNicknameToSchool() : openNicknameToClass(selectedClass))}
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
  );
};

export default MemberModal;
