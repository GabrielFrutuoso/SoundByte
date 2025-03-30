import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

interface PlaylistResponse {
  playlist: {
    id: string;
    title: string;
    bannerSrc: string;
    user: {
      id: string | undefined;
      username: string;
    };
  };
}

const fetchLikedPlaylists = async (userId: string): Promise<PlaylistResponse[]> => {
  const { data } = await apiClient.get<PlaylistResponse[]>(`/api/user/${userId}/likedPlaylists`);
  return data;
};

export const useGetLikedPlaylists = (userId: string) => {
  return useQuery({
    queryKey: ['likedPlaylists', userId],
    queryFn: () => fetchLikedPlaylists(userId),
  });
};
