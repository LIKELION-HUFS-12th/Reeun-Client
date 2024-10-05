import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'

const SignUpStep = () => {
  const steps = [1, 2, 3, 4]

  return (
    <StepContents>
      {steps.map(step => {
        return(
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <StepBox>
              <StepNum>
                {step}
              </StepNum>
            </StepBox>
            {
              step!==4 ? <Dotes>{"-"}{"-"}</Dotes> : <></>
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
`

const StepBox = styled.View`
  width:40px;
  height:40px;
  background-color:#F4F4F4;
  border-radius:10px;
  justify-content:center;
  align-items:center;
`

const StepNum = styled.Text`
  color:#898989;
  font-weight:900;
  font-size:20px;
`

const Dotes = styled.Text`
  font-size:20px;
  color:#D9D9D9;
  font-weight:800;
` 