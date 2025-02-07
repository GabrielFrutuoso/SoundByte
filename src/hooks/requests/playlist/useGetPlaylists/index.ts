import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

interface Playlist {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  id: string;
  title: string;
  bannerSrc: string;
}

const fetchPlaylists = async (): Promise<Playlist[]> => {
  const { data } = await apiClient.get('/api/playlist');
  return data;
};

export const useGetPlaylists = () => {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: fetchPlaylists,
  });
};
