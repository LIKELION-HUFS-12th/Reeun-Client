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
    setUserInfo((prev) => [...prev,presentValue]);
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
      console.error('Error reading token:', error);
    }
  };

  const getUserInfo = async () => {
    try {
      const token = await getToken(); // getToken의 결과를 기다림
      if (!token) {
        console.error('Token is null or undefined');
        return;
      }
      const response = await axios.get("https://reeun.store/member/getinfo/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      AsyncStorage.setItem('userData', JSON.stringify(data));
      setUserInfo(data);
      // console.log(data);
      setUserInfo(data);
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
      AsyncStorage.setItem('accessToken', accessToken);
      AsyncStorage.setItem('userData', JSON.stringify(data.user));
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
      console.log(userInfo);
      console.log(user);
    } catch (error) {
      console.log(error);
      console.log("에러!!");
    }
  }

  const handleDelete = async() => {
    try {
      const response = await axios.post('https://reeun.store/member/delete/',{
        password:"password123!"
      }, {
        headers:{
          Authorization : `Bearer ${user}`
        }
      
      })
      console.log("성공!")
      setUser(false);
    } catch (error) {
      console.log(error);
      console.log("에러!!");
    }
  }

  const handleSetClass = async(grade, classNum) => {
    try {
      const response = await axios.post("https://reeun.store/member/setclass/",{
        grade:grade,
        order:classNum
      },{
        headers:{
          Authorization:`Bearer ${user}`
        }
      })
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }



  return {
    handleSignUp,
    getToken,
    getUserInfo,
    handleLogIn,
    handleLogOut,
    handleDelete,
    handleSetClass
  }
}

