import axios from 'axios';
import BASE_URL from './BaseUrl';

// 쪽지지 조회
export const getMessages = async (otherId) => {
    try {
      const response = await axios.get(`${BASE_URL}/message/getMessage/${otherId}/`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      throw error;
    }
  };
  
  // 쪽지지 전송
  export const sendMessage = async (message) => {
    try {
      const response = await axios.post(`${BASE_URL}/message/sendMessage/`, { message });
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };