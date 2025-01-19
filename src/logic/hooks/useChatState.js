import { useState, useEffect, useCallback } from 'react';
import { getMessages, sendMessage } from '../api/chatApi';

export default function useChatState(recipientId, token) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 메시지 가져오기
  const fetchMessages = useCallback(async () => {
    if (!token) {
      console.error('Authorization token is missing');
      return;
    }
    setLoading(true);
    try {
      const data = await getMessages(recipientId, token);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [recipientId, token]);

  // 메시지 전송
  const handleSend = async (messageText) => {
    if (!token) {
      console.error('Authorization token is missing');
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-CA'); // YYYY-MM-DD 형식
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newMessage = {
      id: String(messages.length + 1),
      sender: '나',
      message: messageText,
      created_at: `${formattedDate} ${formattedTime}`,
      status: 'pending', // 전송 상태
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      await sendMessage(recipientId, messageText, token);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== newMessage.id)
      );
    }
  };

  // 모달 토글
  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  // 컴포넌트 마운트 시 메시지 불러오기
  useEffect(() => {
    if (recipientId && token) {
      fetchMessages();
    }
  }, [fetchMessages, recipientId, token]);

  return {
    messages,
    handleSend,
    isModalVisible,
    toggleModal,
    loading,
  };
}
