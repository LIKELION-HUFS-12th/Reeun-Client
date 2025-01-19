import { useState, useEffect, useCallback } from 'react';
import { getMessages, sendMessage } from '../api/chatApi';

export default function useChatState(recipientId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (!recipientId) {
      console.error('Recipient ID is missing');
      return;
    }

    setLoading(true);
    try {
      const data = await getMessages(recipientId);
      setMessages(data); // 서버로부터 받은 데이터를 설정
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [recipientId]);

  const handleSend = async (messageText) => {
    if (!messageText.trim()) {
      console.error('Cannot send an empty message.');
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-CA');
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const newMessage = {
      id: `temp-${Date.now()}`,
      sender: '나',
      content: messageText, // 수정: content 키 사용
      created_at: `${formattedDate} ${formattedTime}`,
      status: 'pending',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      await sendMessage(recipientId, messageText);
      await fetchMessages(); // 서버와 동기화
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== newMessage.id)
      );
    }
  };

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    handleSend,
    isModalVisible,
    toggleModal,
    loading,
  };
}
