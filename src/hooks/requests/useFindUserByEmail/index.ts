import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFindUserByEmail = (email: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['user', email],
        queryFn: () => fetchUserByEmail(email),
    });

    return { data, isLoading, error };
};

const fetchUserByEmail = async (email: string)=> {
    if (!email) return null;

    const { data } = await axios.get(`http://localhost:3000/api/user?email=${email}`, {
        validateStatus: (status) => status === 200 || status === 404
    });

    return data;
  }
