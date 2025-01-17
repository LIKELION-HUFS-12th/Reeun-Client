import { useState } from "react";


export const useLogIn = () => {
  

  const handleId = (e, setId) => {
    setId(e.nativeEvent.text);
    console.log(e.nativeEvent.text)
  }

  const handlePassword = (e, setPassword) => {
    setPassword(e.nativeEvent.text);
    console.log(e.nativeEvent.text)
  }

  return{
    handleId,
    handlePassword
  }
}