import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { useUserInfoStore, useUserStore } from '../../logic/store/user'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Button
} from 'react-native';
import axios from 'axios';
import SignUpStep from '../components/SignUpStep';

const SetSchool = ({navigation}) => {
  const {userInfo, setUserInfo} = useUserInfoStore();
    const {user, setUser} = useUserStore();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [schoolInfo, setSchoolInfo] = useState([]);
    const[step, setStep] = useState(1);
    const [enrollYear, setEnrollYear] = useState("");
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const regionList = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시','경기도', '강원특별자치도', '충청북도', '충청남도', '전북특별자치도', '전라남도', '경상북도', '경상남도', '제주특별자치도', '재외한국학교']

    // const getSchoolInfo = async () => {
    //   try {
    //     const schoolNames = schoolInfo.map(item => item.school_name);
    //     // console.log(schoolNames);
    //     setSchoolInfo(schoolNames);
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  

    useEffect(() => {
  
    }, [])


    const handleNextStep = async(selectedRegion) => {
      if(step===1){
        try {
          const response = await axios.get("https://reeun.store/school/getallschool/");
          const data = response.data.data;
          const schoolList = data.filter((school) => school.city === selectedRegion);
          const schoolNames = schoolList.map(item => item.school_name);
          setSchoolInfo(schoolNames);
          setStep(2);
        } catch (error) {
          console.log(error)
        }
      } else if(step===2){
        try {
          const response = await axios.post("https://reeun.store/member/setschool/",{
            schoolId:2
          },{
            headers:{
              Authorization:`Bearer ${user}`
            }
          })
          console.log(response.data);
        } catch (error) {
          console.log(error);
          
        }
        setStep(3);
      }else if(step===3){
        try {
          const response = await axios.post("https://reeun.store/member/setenrollyear/",{
            enrollYear:enrollYear
          },{
            headers:{
              Authorization:`Bearer ${user}`
            }
          });
          console.log('성공!');
          navigation.navigate('Home')
        } catch (error) {
          console.log(error);
          console.log(typeof(enrollYear));
        }
      }
      
    }


    const RegionPickModal = () => {

  
      const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
    
      const selectRegion = (region) => {
        setSelectedRegion(region);
        toggleModal();
      };
    
      return (
        <Container>
          {/* 선택된 초등학교 표시 */}
          {/* <Label>선택된 초등학교: {ver==='school'?selectedSchool:selectedRegion || '없음'}</Label> */}
    
          {/* 인풋 박스 */}
          <InputBox onPress={toggleModal}>
            <InputText>{selectedRegion || "지역을 선택하세요"}</InputText>
          </InputBox>
    
          {/* 모달 */}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}
          >
            <ModalContainer>
              <ModalContent>
                <ModalTitle>지역 선택</ModalTitle>
                <FlatList
                  data={regionList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <SchoolItem onPress={() => {selectRegion(item)}}>
                      <SchoolText>{item}</SchoolText>
                    </SchoolItem>
                  )}
                />
                <CloseButton onPress={toggleModal}>
                  <CloseText>닫기</CloseText>
                </CloseButton>
              </ModalContent>
            </ModalContainer>
          </Modal>
        </Container>
      );
                }
    

    const SchoolPickModal = () => {

  
      const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
    
      const selectSchool = (school) => {
        setSelectedSchool(school);
        toggleModal();
      };
    
      return (
        <Container>
          {/* 선택된 초등학교 표시 */}
          {/* <Label>선택된 초등학교: {ver==='school'?selectedSchool:selectedRegion || '없음'}</Label> */}
    
          {/* 인풋 박스 */}
          <InputBox onPress={toggleModal}>
            <InputText>{selectedSchool|| '초등학교를 선택하세요'}</InputText>
          </InputBox>
    
          {/* 모달 */}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={toggleModal}
          >
            <ModalContainer>
              <ModalContent>
                <ModalTitle>초등학교 선택</ModalTitle>
                <FlatList
                  data={schoolInfo}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <SchoolItem onPress={() => {selectSchool(item)}}>
                      <SchoolText>{item}</SchoolText>
                    </SchoolItem>
                  )}
                />
                <CloseButton onPress={toggleModal}>
                  <CloseText>닫기</CloseText>
                </CloseButton>
              </ModalContent>
            </ModalContainer>
          </Modal>
        </Container>
      );
          
                }
                const pickYear = () => {
                  const showDatePicker = () => {
                    setDatePickerVisibility(true);
                  };
                
                  const hideDatePicker = () => {
                    setDatePickerVisibility(false);
                  };
                
                  const handleConfirm = (date) => {
                    console.warn("A date has been picked: ", typeof(date.getFullYear()));
                    const year = date.getFullYear();
                    setEnrollYear(year);
                    hideDatePicker();
                  };
                
                  return (
                    <View>
                      <View style={{backgroundColor:'#f4f4f4',padding:15, width:290,height:50,borderRadius:10,fontSize:16, marginLeft:40, marginTop:-25, position:'relative'}}>
                        <Button title="Show Date Picker" onPress={showDatePicker} style={{width:400}}/>
                        <Text style={{color:"#666", fontSize:16, position:'absolute', top:18, left:'15'}}>{enrollYear?enrollYear:"입학년도를 입력해주세요."}</Text>
                        </View>
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />
                      
                    </View>
                  );
                };
                
                return(
                  <>
                  
                    <SafeAreaView style={{backgroundColor:"white"}}>
                      <View style={{marginLeft:30}}>
                        <SignUpStep step={step} setStep={setStep}/>
                      </View>
                      
                      <View style={{marginTop:0, }}>
                      
                      <Text style={{fontSize:20, fontWeight:400, marginLeft:30}}> <Text style={{color:"#FB5E3D", fontWeight:700}}>{userInfo.username} </Text>님의 학교를 입력해주세요</Text>
                      <View style={{display:'flex', gap:20}}>
                        {step===1?
                      <InputArea>
                      {RegionPickModal()}
                      </InputArea>
                      : step===2?

                      <InputArea>
                      
                      {SchoolPickModal()}
                      </InputArea>
                      :
                      <>
                      <InputArea>
                        {pickYear()}
                      </InputArea>
                      </>
                      }
                      </View>
                      </View>
                      <View style={{justifyContent:'center', alignItems:'center', marginTop:step===3?305:280,}}>
                          <NextStepButton onPress={() => step===handleNextStep(selectedRegion)}>
                            <NextText>다음 단계로</NextText>
                          </NextStepButton>
                        </View>
                      
                    </SafeAreaView>
                    </>
                
                  )
  

  }
  

export default SetSchool;



const MainContents = styled.View`
  
`

const MainText = styled.Text`
  font-size:20px;
`

const InputArea = styled.View`
  margin-top:40px;
`

const InputTitle = styled.Text`
  font-size:12px;
  color:#898989;
  margin-bottom:10px;
  position:relative;
  left: 10px;
  top:5px;
`

// const InputBox = styled.TextInput`
//   
// `

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
// `











// Styled Components
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
`;

const InputBox = styled.TouchableOpacity`
background-color:#f4f4f4;
padding:15px 20px;
   width:290px;
   height:50px;
   border-radius:10px;
   font-size:16px;
 
`;

const InputText = styled.Text`
  font-size: 16px;
  color: #666;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  max-height: 50%;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SchoolItem = styled.TouchableOpacity`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const SchoolText = styled.Text`
  font-size: 16px;
`;

const CloseButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  align-items: center;
`;

const CloseText = styled.Text`
  color: #fff;
  font-size: 16px;
`;