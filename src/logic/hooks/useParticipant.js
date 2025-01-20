import { useState, useEffect } from 'react';
import { getMessages } from '../api/chatApi';

const useParticipant = (otherId) => {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchParticipant = async () => {
      if (!otherId) return;

      setLoading(true);
      try {
        const messages = await getMessages(otherId); // 메시지 API 호출
        const participantInfo = messages.find((msg) => msg.senderId === otherId);
        if (participantInfo) {
          setParticipant({
            nickname: participantInfo.senderNickname || '익명 사용자',
            profileImage: participantInfo.profileImage || null,
          });
        } else {
          setParticipant(null);
        }
      } catch (error) {
        console.error('Failed to fetch participant info:', error);
        setParticipant(null);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, [otherId]);

  return { participant, loading };
};

export default useParticipant;
