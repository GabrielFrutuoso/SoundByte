import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

interface LikePlaylistRequest {
  userId: string;
  playlistId: string;
}

const likePlaylist = async ({ userId, playlistId }: LikePlaylistRequest) => {
  const { data } = await apiClient.post(`/api/playlist/${playlistId}/like`, {
    userId,
  });
  return data;
};

export const useLikePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePlaylist,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['likedPlaylists', variables.userId],
      });
    },
  });
};
