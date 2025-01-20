import { useState } from 'react';
import { Alert } from 'react-native';
import { exitChat } from '../api/chatApi'; // 분리된 API 호출

const useExitChat = () => {
  const [loading, setLoading] = useState(false);

  const handleExitChat = async (otherId, onSuccess) => {
    setLoading(true);
    try {
      const success = await exitChat(otherId);
      if (success) {
        Alert.alert('성공', '쪽지를 나갔습니다.');
        if (onSuccess) onSuccess(); // 성공 시 추가 작업 수행
      }
    } catch (error) {
      Alert.alert('오류', error.message || '쪽지 나가기 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return { handleExitChat, loading };
};

export default useExitChat;
