import { useState, useEffect, useCallback } from 'react';
import { getMessages, sendMessage } from '../api/chatApi';

export default function useChatState(recipientId, token) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchMessages = useCallback(async () => {
    if (!recipientId || !token) {
      console.error('Recipient ID or token is missing');
      return;
    }

    setLoading(true);
    try {
      const data = await getMessages(recipientId); // 서버에서 메시지 가져오기
      setMessages(data); // 서버로부터 받은 메시지 설정
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }, [recipientId, token]);

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
      content: messageText,
      created_at: `${formattedDate} ${formattedTime}`,
      status: 'pending',
    };

    // UI에 임시 메시지 추가
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      await sendMessage(recipientId, messageText); // 메시지 전송
      await fetchMessages(); // 서버와 동기화
    } catch (error) {
      console.error('Failed to send message:', error);
      // 전송 실패 시 임시 메시지 제거
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
