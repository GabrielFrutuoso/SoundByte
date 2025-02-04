import { apiClient } from '@/lib/apiClient';
import { useQuery } from '@tanstack/react-query';

export const useGetSongs = (query: string, genre: string, take: number) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['songs', query, genre, take],
        queryFn: () => fetchSongs(query, genre, take),
    });

    return { data, isLoading, error } 
};

const fetchSongs = async (query: string, genre: string, take: number) => {
    const data = apiClient.get(`/api/songs?genre=${genre || ''}&query=${query || ''}&take=${take || 6}`);
    return data;
};