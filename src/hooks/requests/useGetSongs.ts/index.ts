import { apiClient } from '@/lib/apiClient';
import { useQuery } from '@tanstack/react-query';

export const useGetSongs = (query: string, genre: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['songs', query, genre],
        queryFn: () => fetchSongs(query, genre),
    });

    return { data, isLoading, error } 
};

const fetchSongs = async (query: string, genre: string) => {
    const data = apiClient.get(`/api/songs?genre=${genre || ''}&query=${query || ''}`);
    return data;
};