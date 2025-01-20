import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { Animated, TouchableWithoutFeedback, Alert } from 'react-native';
import axios from 'axios';
import { useUserStore } from '../../logic/store/user';
import BASE_URL from '../../logic/api/BaseUrl';
import useParticipant from '../../logic/hooks/useParticipant';

export default function ChatSideModal({ isVisible, onClose, otherId }) {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const { participant, loading } = useParticipant(otherId); // 훅 사용
  const token = useUserStore.getState().user; // 토큰 가져오기

  // 슬라이드 애니메이션 처리
  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  // 쪽지 나가기 API 호출
  const handleExitChat = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}message/exitMessage`,
        { otherId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        Alert.alert('성공', '쪽지를 나갔습니다.');
        onClose();
      } else {
        throw new Error(response.data?.message || '쪽지 나가기 실패');
      }
    } catch (error) {
      Alert.alert('오류', error.message || '쪽지 나가기 중 오류가 발생했습니다.');
    }
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
              <ParticipantSection>
                <SectionTitle>참여자 2</SectionTitle>
                <Participant>
                  <ParticipantImage
                    source={require('../../../assets/owner_profile.png')}
                  />
                  <ParticipantText>나</ParticipantText>
                </Participant>
                {participant ? (
                  <Participant>
                  <ParticipantImage
                    source={require('../../../assets/comment_profile.png')}
                  />
                    <ParticipantText>{participant.nickname}</ParticipantText>
                  </Participant>
                ) : (
                  <Participant>
                    <ParticipantImage
                      source={require('../../../assets/comment_profile.png')}
                    />
                    <ParticipantText>참여자 정보를 불러오는 중...</ParticipantText>
                  </Participant>
                )}
              </ParticipantSection>
            </ModalContent>
            <Footer>
              <FooterButton onPress={handleExitChat}>
                <FooterTextRed>나가기</FooterTextRed>
              </FooterButton>
            </Footer>
          </AnimatedModal>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    )
  );
}

// Styled Components (기존 스타일 유지)
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

const ParticipantSection = styled.View`
  margin-top: 10px;
`;

const SectionTitle = styled.Text`
  color: ${(props) => props.theme.text || '#000000'};
  font-size: 15px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const Participant = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 5px;
`;

const ParticipantImage = styled.Image`
  width: 38px;
  height: 38px;
  border-radius: 20px;
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

const FooterButton = styled.TouchableOpacity`
  background-color: white;
  padding: 10px 20px;
  border-radius: 5px;
`;

const FooterTextRed = styled.Text`
  color: #ff0000;
  font-size: 14px;
`;
