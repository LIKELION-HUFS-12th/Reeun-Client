import axios from 'axios';
import BASE_URL from './BaseUrl';
import { useUserStore } from '../store/user'; // useUserStore를 import

// 쪽지 조회
export const getMessages = async (otherId) => {
  try {
    // useUserStore를 통해 user 상태에서 토큰 가져오기
    const token = useUserStore.getState().user;

    // 서버로부터 메시지 데이터 요청
    const response = await axios.get(`${BASE_URL}message/getMessage/${otherId}/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    // 응답 데이터 처리
    const { data } = response.data; // 'data' 키에서 메시지 배열 추출
    if (!Array.isArray(data)) {
      console.error('Invalid data format: Expected an array');
      throw new Error('서버로부터 잘못된 데이터 형식이 반환되었습니다.');
    }

    // 필요한 데이터만 반환
    return data.map((message) => ({
      senderId: message.sender.id,
      senderNickname: message.sender.name, // 수정
      receiverId: message.receiver.id,
      receiverNickname: message.receiver.name, // 수정
      content: message.content?.trim() || '(내용 없음)',
      createDate: message.createDate,
      isMyChat: message.isMyChat,
    }));    
  } catch (error) {
    console.error('Failed to fetch messages:', error.response?.data || error.message);
    throw error;
  }
};

// 쪽지 전송
export const sendMessage = async (receiverId, content) => {
  try {
    // useUserStore를 통해 user 상태에서 토큰 가져오기
    const token = useUserStore.getState().user;

    // 서버로 메시지 전송 요청
    const response = await axios.post(
      `${BASE_URL}message/sendMessage/`,
      {
        receiverId,
        content: content?.trim(), // 공백 제거
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }
    );

    // 응답 데이터 처리 및 반환
    const { data } = response.data;
    return {
      senderId: data.sender.id,
      senderNickname: data.sender.nickname,
      receiverId: data.receiver.id,
      receiverNickname: data.receiver.nickname,
      content: data.content,
      createDate: data.createDate,
    };
  } catch (error) {
    // 404 에러 처리
    if (error.response?.status === 404) {
      console.error('Send message API endpoint not found:', error.response.data);
      throw new Error('메시지 전송 경로를 찾을 수 없습니다. 서버 설정을 확인하세요.');
    } else {
      // 기타 에러 처리
      console.error('Failed to send message:', error.response?.data || error.message);
      throw new Error('메시지 전송 중 문제가 발생했습니다.');
    }
  }
};

// 쪽지 나가기
export const exitChat = async (otherId) => {
  const token = useUserStore.getState().user; // 토큰 가져오기

  const response = await axios.post(
    `${BASE_URL}message/exitMessage`,
    { otherId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (response.status === 201) {
    return true;
  }
  throw new Error(response.data?.message || '쪽지 나가기 실패');
};