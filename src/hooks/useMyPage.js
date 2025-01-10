import { Alert } from "react-native"


export const useMyPage = () => {

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
        onPress: () => handleDelete(),
      }
      //버튼관리
    ])
  }  

  return{
    goToDeleteAlert,
    goToLogoutAlert
  }
}