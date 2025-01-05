import React, { useState } from 'react'
import { Text, View, TouchableOpacity, FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { useUserInfoStore } from '../../logic/store/user'
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';

const SetSchool = () => {
  // const {userInfo, setUserInfo} = useUserInfoStore();

  // return (
  //   <SafeAreaView style={{backgroundColor:"white"}}>
  //     <Text>{userInfo.username}님의 초등학교를 입력해주세요</Text>
  //     <InputArea>
  //       <InputTitle>초등학교 선택</InputTitle>
  //       <InputBox
  //         // placeholder={"안녕"} onChange={(event) => {handlePresentValue(event)}}
          
  //       >
          
  //       </InputBox>
  //     </InputArea>
  //     <View style={{justifyContent:'center', alignItems:'center', marginTop:250}}>
  //         <NextStepButton >
  //           <NextText >안녕</NextText>
  //         </NextStepButton>
  //       </View>
  //   </SafeAreaView>
  // )

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    toggleModal();  // 선택 후 모달 닫기
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>
        Selected Item: {selectedItem || 'None'}
      </Text>
      <TouchableOpacity onPress={toggleModal} style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 5 }}>
        <Text>Select an Item</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Select an Item</Text>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemSelect(item)}>
                <Text style={{ fontSize: 16, padding: 10 }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );


  


// export default PickerExample;


}

export default SetSchool;



const MainContents = styled.View`
  
`

const MainText = styled.Text`
  font-size:20px;
`

const InputArea = styled.View`
  margin-top:20px;
`

const InputTitle = styled.Text`
  font-size:12px;
  color:#898989;
  margin-bottom:10px;
  position:relative;
  left: 10px;
  top:5px;
`

const InputBox = styled.TextInput`
  background-color:#f4f4f4;
  padding:15px 20px;
  width:290px;
  height:60px;
  border-radius:10px;
  font-size:16px;
`

const NextStepButton = styled.TouchableOpacity`
  width:160px;
  height:40px;
  background-color:#fb5e3d;
  border-radius:20px;
  justify-content:center;
  align-items:center;
  margin-bottom:60px;
`

const NextText = styled.Text`
  font-size:17px;
  color:white;
  font-weight:900
`

