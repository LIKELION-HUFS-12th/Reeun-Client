import { useState, useEffect } from 'react';
import { fetchChatRooms } from '../api/chatListApi';

const useFetchChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]); // 채팅방 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching chat rooms...'); // 디버깅 로그
        const response = await fetchChatRooms();
        console.log('Fetched chat rooms:', response); // 응답 데이터 확인

        if (isMounted) {
          // 데이터 매핑 및 name 기본값 설정
          const formattedRooms = response.map(chat => ({
            id: chat.id,
            name: chat.name || '채팅방', // 기본값 처리
          }));
          setChatRooms(formattedRooms);
        }
      } catch (err) {
        console.error('Error fetching chat rooms:', err.message); // 에러 로그 출력
        if (isMounted) {
          setError(err.message || '데이터를 불러오는 중 문제가 발생했습니다.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // 컴포넌트 언마운트 시 플래그 업데이트
    };
  }, []);

  return { chatRooms, loading, error };
};

export default useFetchChatRooms;
