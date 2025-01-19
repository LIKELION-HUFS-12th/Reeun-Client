import { useAnonymousAtClassStore, useAnonymousStore, useMemberCountStore, useUserInfoStore } from "../logic/store/user";

export const useBoard = () => {
  const {isAnonymousAtSchool} = useAnonymousStore();
  const {userInfo} = useUserInfoStore();
  const {isAnonymousAtClasses, setIsAnonymousAtClass} = useAnonymousAtClassStore();


  const handleMenu = (setModalVisible, schoolMember, setSchoolMember, getSchoolMember, getClassMember, version, setClassMember, selectedClass, getAnonymous, setIsAnonymous) => {
    

    // setIsAnonymous(getAnonymous())
    getAnonymous();
    version==='School' ?
    getSchoolMember(setSchoolMember)
    
    :
    getClassMember(setClassMember, selectedClass)
    setModalVisible(true);
    if(version === "Class"){
    const handleAnonymousAtClass = () => {
      const checkClass = userInfo.classList.filter((el) => el.grade === selectedClass.grade);
      console.log(checkClass[0].isAnonymous);
      setIsAnonymousAtClass(checkClass[0].isAnonymous);
    }
    handleAnonymousAtClass();}
    
    console.log(selectedClass);
    console.log('anonymous',isAnonymousAtClasses)
    
    
  }

  return{
    handleMenu
  }
}