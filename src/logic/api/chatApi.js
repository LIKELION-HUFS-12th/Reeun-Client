import axios from 'axios';
import BASE_URL from './BaseUrl';

// 쪽지 조회
export const getMessages = async (otherId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/message/getMessage/${otherId}/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더 추가
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch messages:', error.response?.data || error.message);
    throw error;
  }
};

// 쪽지 전송
export const sendMessage = async (receiverId, content, token) => {
    try {
      const url = `${BASE_URL}message/sendMessage/`;
      console.log('Request URL:', url);
      console.log('Payload:', { receiverId, content });
  
      const response = await axios.post(
        url,
        { receiverId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Failed to send message:', error.response?.data || error.message);
      console.error('Error Details:', error.toJSON());
      throw error;
    }
  };
  
