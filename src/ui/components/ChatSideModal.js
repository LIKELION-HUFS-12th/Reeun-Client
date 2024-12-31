import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated, TouchableWithoutFeedback } from 'react-native';

export default function ChatSideModal({ isVisible, onClose }) {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0, // 화면 안으로 슬라이드
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300, // 화면 밖으로 이동
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

    const handleGoToPost = () => {
    // 여기에 게시글 이동 로직 추가 (예: 네비게이션 함수 호출)
    console.log("게시글로 이동!");
  };

  return (
    isVisible && (
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalOverlay>
          <AnimatedModal style={{ transform: [{ translateX: slideAnim }] }}>
            <ModalHeader>
              <CloseButton onPress={onClose}>
                <CloseText>닫기</CloseText>
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <Profile>
                <ProfileDetails>
                  <ProfileTitle>리운초 전체게시판</ProfileTitle>
                  <ProfileSubtitle>나누군지아는사람?</ProfileSubtitle>
                </ProfileDetails>
              </Profile>
              <GoToPostButton onPress={handleGoToPost}>
                <GoToPostText>게시글로 바로가기</GoToPostText>
              </GoToPostButton>
              <Divider />
              <ParticipantSection>
                <SectionTitle>참여자 2</SectionTitle>
                <Participant>
                  <ParticipantCircle />
                  <ParticipantText>나 (익명)</ParticipantText>
                </Participant>
                <Participant>
                  <ParticipantCircle />
                  <ParticipantText>익명 (글쓴이)</ParticipantText>
                </Participant>
              </ParticipantSection>
            </ModalContent>
            <Footer>
              <FooterText>나가기</FooterText>
              <FooterTextRed>신고하기</FooterTextRed>
            </Footer>
          </AnimatedModal>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    )
  );
}

// Styled Components
const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const AnimatedModal = styled(Animated.View)`
  width: 250px;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.theme.background || '#FFFFFF'};
  border-left-width: 1px;
  border-left-color: #e0e0e0;
`;

const ModalHeader = styled.View`
  margin-top: 50px;
  height: 50px;
  padding: 10px 15px;
  background-color: ${(props) => props.theme.background || '#FFFFFF'};
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  justify-content: center;
  align-items: flex-end;
`;

const CloseButton = styled.TouchableOpacity``;

const CloseText = styled.Text`
  color: ${(props) => props.theme.text || '#000000'};
  font-size: 16px;
`;

const ModalContent = styled.ScrollView`
  padding: 15px;
  flex-grow: 0;
  max-height: 300px;
`;

const Profile = styled.View`
  align-items: center;
  margin-bottom: 15px;
`;

const ProfileDetails = styled.View`
  align-items: center;
`;

const ProfileTitle = styled.Text`
  color: ${(props) => props.theme.text || '#000000'};
  font-size: 18px;
  font-weight: bold;
`;

const ProfileSubtitle = styled.Text`
  color: #666666;
  font-size: 14px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;
`;

const ParticipantSection = styled.View``;

const SectionTitle = styled.Text`
  color: ${(props) => props.theme.text || '#000000'};
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Participant = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const ParticipantCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #e4e4e4;
  margin-right: 12px;
`;

const ParticipantText = styled.Text`
  color: ${(props) => props.theme.text || '#000000'};
  font-size: 16px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 15px 15px;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  margin-top: auto;
  margin-bottom: 50px;
`;

const FooterText = styled.Text`
  color: ${(props) => props.theme.text || '#000000'};
  font-size: 14px;
`;

const FooterTextRed = styled.Text`
  color: #ff0000;
  font-size: 14px;
`;

const GoToPostButton = styled.TouchableOpacity`
  padding: 10px 20px;
  border-radius: 5px;
  align-items: center;
  border: 1px solid #e4e4e4;
  background-color: transparent;
  margin-bottom: 3px;
`;

const GoToPostText = styled.Text`
  color: #505050;
  font-size: 16px;
  font-weight: bold;
`;
