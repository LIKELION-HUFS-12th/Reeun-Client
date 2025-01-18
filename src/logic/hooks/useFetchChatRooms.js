import { useState, useEffect } from 'react';
import { fetchChatRooms } from '../api/chatListApi';

const useFetchChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchChatRooms();
        if (isMounted) {
          setChatRooms(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { chatRooms, loading, error };
};

export default useFetchChatRooms;
