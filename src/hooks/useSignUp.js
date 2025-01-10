
export const useSingUp = () => {
  
  const handleStep = (setStep, setUserInfo, presentValue, setPresentValue) => {
    setStep(prev => prev + 1)
    setUserInfo((prev) => [...prev, presentValue])
    
    console.log(presentValue);
    setPresentValue("");
  }

  const handlePresentValue = (event, setPresentValue) => {
    setPresentValue(event.nativeEvent.text);
    console.log(event.nativeEvent.text);
    
  }

  return{
    handleStep,
    handlePresentValue
  }
}