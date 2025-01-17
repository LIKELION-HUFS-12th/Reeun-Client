import React from 'react';
import axios from 'axios';
import { useUserInfoStore, useUserStore } from '../logic/store/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsync = () => {
  const {userInfo, setUserInfo} = useUserInfoStore();
  const {user, setUser} = useUserStore();

  const handleSignUp = async (setIsComplete, userInfo,setUserInfo, presentValue, setPresentValue) => {
    // setStep(prev => prev + 1)
    // setUserInfo((prev) => [...prev, presentValue])
    setPresentValue("");
    try {
      const response = await axios.post("https://reeun.store/member/signup/",{
        username: userInfo[0],
        password1: userInfo[1],
        password2: userInfo[2]
      })
      console.log(response.data.user);
      setIsComplete(true);
    } catch (error) {
      console.log(error);
      console.log(userInfo);
      
    }
    
  }

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken'); // 저장된 키 이름 확인
      // console.log(token); // 여기서 token은 문자열
      return(token)
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    try {
      // const token = await getToken(); // getToken의 결과를 기다림
      if (!user) {
        console.log("token is null or undefined")
        return;
      }
      const response = await axios.get("https://reeun.store/member/getinfo/", {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      const data = response.data.data;
      // AsyncStorage.setItem('userData', JSON.stringify(data));
      setUserInfo(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogIn = async (id, password, navigation) => {
    try {
      const response = await axios.post("https://reeun.store/member/login/",{
      username:id,
      password:password
    });
      const data = response.data.data;
      const accessToken = data.access;
      // AsyncStorage.setItem('accessToken', accessToken);
      // AsyncStorage.setItem('userData', JSON.stringify(data.user));
      setUser(accessToken);
      navigation.navigate("Tabs");
      console.log(user);
    } catch (error) {
      console.log(error);
      console.log(id);
    }
    
  }

  const handleLogOut = async() => {
    try {
      const response = await axios.post('https://reeun.store/member/logout/',{}, {
        headers:{
          Authorization : `Bearer ${user}`
        }
      
      })
      console.log("성공!");
      setUserInfo([]);
      setUser(false);
      AsyncStorage.mergeItem('accessToken', "");
      AsyncStorage.mergeItem('userData', "");
      console.log(userInfo);
      console.log(user);
    } catch (error) {
      console.log(error);
      console.log("에러!!");
    }
  }

  const handleDelete = async(deletePassword, setDeleteModalVisible) => {
    try {
      const response = await axios.post('https://reeun.store/member/delete/',{
        password:deletePassword
      }, {
        headers:{
          Authorization : `Bearer ${user}`
        }
      
      })
      console.log("성공!")
      setUser(false);
      setUserInfo([]);
      setDeleteModalVisible(false);
    } catch (error) {
      console.log(error);
      console.log("에러!!");
    }
  }

  const handleSetClass = async(grade, classNum, navigation) => {
    try {
      const response = await axios.post("https://reeun.store/member/setclass/",{
        grade:Number(grade),
        order:Number(classNum)
      },{
        headers:{
          Authorization:`Bearer ${user}`
        }
      })
      console.log("성공!");
      navigation.navigate("Tabs");
    } catch (error) {
      console.log(error);
      console.log(typeof(Int(grade)));
    }
  }

  const getSchoolBoardPosts = async() => {
    try {
      const response = await axios.get('https://reeun.store/board/',{
        headers:{
          Authorization:`Bearer ${user}`
        }
      })
      console.log(response.data);
    } catch (error) {
      console.log(error.message );
      console.log(user);
    }
  }

  const getClassBoardPosts = async (selectedClass, setPostList) => {
    try {
      const response = await axios.get(`https://reeun.store/classboard/${userInfo.enrollYear}/${selectedClass.grade}/${selectedClass.order}/`,{
        headers:{
          Authorization:`Bearer ${user}`
        }
      })
      console.log(response.data);
      setPostList(response.data.data);
    } catch (error) {
      console.log(error);
      console.log(selectedClass)
    }
  }

  const getSchoolMember = async(setSchoolMember) => {
    try {
      const response = await axios.get("https://reeun.store/member/getschoolmembers/",{
        headers:{
          Authorization: `Bearer ${user}`
        }
      })
      console.log(response.data);
      setSchoolMember(response.data.data);
    } catch (error) {
      console.log(error);
      console.log("실패!")
      console.log(user);
    }
  }

  const getClassMember = async(setClassMember,selectedClass) => {
    try {
      const response = await axios.get(`https://reeun.store/member/getclassmembers/${selectedClass.grade}/`,{
      
        headers:{
          Authorization: `Bearer ${user}`
        }
      })
      console.log(response);
      setClassMember(response.data.data);
    } catch (error) {
      console.log(error);
      console.log("학급 유저 목록 조회 실패!")
    }
  }

  const openNicknameToSchool = async() => {
    try {
      const response = await axios.post("https://reeun.store/member/openNicknameToSchool/",{},{
        headers:{
          Authorization: `Bearer ${user}`
        }
      })
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log(user);
    }
  }

  const openNicknameToClass = async() => {
    try {
      const response = await axios.post("https://reeun.store/member/openNicknameToClass/",{grade:2},{
        headers:{
          Authorization: `Bearer ${user}`
        }
      })
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log(user);
    }
  }


  return {
    handleSignUp,
    getToken,
    getUserInfo,
    handleLogIn,
    handleLogOut,
    handleDelete,
    handleSetClass,
    getSchoolBoardPosts,
    getClassBoardPosts,
    getSchoolMember,
    getClassMember,
    openNicknameToSchool,
    openNicknameToClass

  }
}

