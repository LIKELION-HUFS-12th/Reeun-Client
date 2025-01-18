import axios from 'axios';
import BASE_URL from './BaseUrl';

export const fetchChatRooms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/member/`);
    if (response.status === 200 && response.data.length === 0) {
      throw new Error('채팅방이 없습니다. 새로운 대화를 시작해보세요.');
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('채팅방이 존재하지 않습니다. 새로운 대화를 시작해보세요.');
    }
    throw new Error('데이터를 불러오는 중 문제가 발생했습니다.');
  }
};
