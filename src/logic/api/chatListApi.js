import axios from 'axios';
import BASE_URL from './BaseUrl';
import { useUserStore } from '../store/user'; // 토큰 가져오기 위한 store import

export const fetchChatRooms = async () => {
  try {
    const token = useUserStore.getState().user;

    const response = await axios.get(`${BASE_URL}message/`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    console.log('API Response:', response.data);

    if (response.status === 200) {
      let chatRooms = response.data.data;
      console.log('Extracted ChatRooms:', chatRooms);

      if (!Array.isArray(chatRooms) || chatRooms.length === 0) {
        throw new Error('채팅방이 없습니다. 새로운 대화를 시작해보세요.');
      }

      // name 필드가 null인 경우 기본값 설정
      chatRooms = chatRooms.map(room => ({
        id: room.id,
        name: room.name || '쪽지', // 기본값 설정
      }));

      return chatRooms;
    }

    throw new Error('Unexpected response status');
  } catch (error) {
    console.error('Error fetching chat rooms:', error.response?.data || error.message);
    if (error.response) {
      console.error('Error details:', {
        status: error.response.status,
        data: error.response.data,
      });
    }
    throw new Error('채팅방이 없습니다. 새로운 대화를 시작해보세요.');
  }
};
