import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'

const SignUpStep = ({step, setStep}) => {
  const steps = [1, 2, 3, 4]

  return (
    <StepContents>
      {steps.map(el => {
        return(
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            
            <StepBox style={{backgroundColor:el===step ? "#FB5E3D" : "#f4f4f4"}}>
              <StepNum style={{color:el===step? "white" : "#898989"}}>
                {el}
              </StepNum>
            </StepBox>
            
            
            {
              el!==4 ? <Dotes>{"-"}{"-"}</Dotes> : <></>
            }
            
            
          </View>
          
        )
      })}
      
      
    </StepContents>
  )
}

export default SignUpStep


const StepContents = styled.View`
  flex-direction:row;
  margin-top:180px;
  margin-bottom:40px;
`

const StepBox = styled.View`
  width:30px;
  height:30px;
  background-color:#F4F4F4;
  border-radius:10px;
  justify-content:center;
  align-items:center;
`

const StepNum = styled.Text`
  color:#898989;
  font-weight:700;
  font-size:17px;
`

const Dotes = styled.Text`
  font-size:20px;
  color:#D9D9D9;
  font-weight:800;
` 