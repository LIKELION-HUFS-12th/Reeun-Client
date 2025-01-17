import { useState } from "react"
import { Alert, SafeAreaView, Text, TextInput, View } from "react-native"


export const useMyPage = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const goToLogoutAlert = (handleLogOut) => {
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

  const goToDeleteAlert = (handleDelete) => {
    Alert.alert("탈퇴하시겠어요?", "모든 정보가 사라집니다", [
      {
        //style을 통해 알러트가 닫힘
        style: "cancel",
        text: "아니요"
      },
      {
        text: "네",
        //버튼을 누르면 동작할 로직을 직접 적어줄 수도 있음
        onPress: () => {setDeleteModalVisible(true);console.log(deleteModalVisible)},
      }
      //버튼관리
    ])
  }
  
  const inputPassword = () => {
    

    return(
      <SafeAreaView>
        <Modal isVisible={deleteModalVisible} animationIn={'slideInRight'} animationOut={'slideOutRight'} onBackdropPress={() => setDeleteModalVisible(false)} >
          <View style={{width:200, height:100, backgroundColor:'red', position:'absolute', marginTop:300}}>
            <Text>
              탈퇴하시려면 비밀번호를 입력해주세요
            </Text>
            <TextInput></TextInput>
          </View>
        </Modal>
      </SafeAreaView>

    )
  }

  return{
    goToDeleteAlert,
    goToLogoutAlert,
    inputPassword,
    setDeleteModalVisible,
    deleteModalVisible
  }
}