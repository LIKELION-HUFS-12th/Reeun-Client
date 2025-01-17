
export const useBoard = () => {


  const handleMenu = (setModalVisible, schoolMember, setSchoolMember, getSchoolMember, getClassMember, version, setClassMember, selectedClass, getAnonymous, setIsAnonymous) => {
    // setIsAnonymous(getAnonymous())
    getAnonymous();
    version==='School' ?
    getSchoolMember(setSchoolMember)
    
    :
    getClassMember(setClassMember, selectedClass)
    setModalVisible(true);

    
    
    console.log(selectedClass);
    
  }

  return{
    handleMenu
  }
}