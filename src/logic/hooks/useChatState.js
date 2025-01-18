import { useState, useEffect } from 'react';
import { sendMessageToAPI, getMessagesFromAPI } from '../api/chatApi';

export default function useChatState() {
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // API에서 메시지 가져오기
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessagesFromAPI();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  // 상태 관리
  const handleSend = async (messageText) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-CA'); // YYYY-MM-DD 형식
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newMessage = {
      id: String(messages.length + 1),
      sender: '나',
      message: messageText,
      created_at: `${formattedDate} ${formattedTime}`,
    };


    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      await sendMessageToAPI(newMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const toggleModal = () => setIsModalVisible((prev) => !prev);


  useEffect(() => {
    fetchMessages();
  }, []);

  return { messages, handleSend, isModalVisible, toggleModal, loading };
}
