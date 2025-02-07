import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

type Playlist = {
  id: string;
  title: string;
  bannerSrc: string;
  isPrivate: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
  };
  songs: any[];
}

const fetchPlaylistById = async (id: string): Promise<Playlist> => {
  const { data } = await apiClient.get(`/api/playlist/${id}`);
  return data;
};

export const useGetPlaylistById = (id: string) => {
  return useQuery({
    queryKey: ['playlist', id],
    queryFn: () => fetchPlaylistById(id),
  });
};
