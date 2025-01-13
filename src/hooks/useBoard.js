
export const useBoard = () => {


  const handleMenu = (setModalVisible, schoolMember, setSchoolMember, getSchoolMember, getClassMember, version, setClassMember, selectedClass) => {
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