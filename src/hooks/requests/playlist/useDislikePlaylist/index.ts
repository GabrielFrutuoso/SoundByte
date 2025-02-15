import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

interface LikePlaylistRequest {
  userId: string;
  playlistId: string;
}

const disLikePlaylist = async ({ userId, playlistId }: LikePlaylistRequest) => {
  const { data } = await apiClient.post(`/api/playlist/${playlistId}/dislike`, {
    userId,
  });
  return data;
};

export const useDisikePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: disLikePlaylist,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['likedPlaylists', variables.userId],
      });
    },
  });
};
