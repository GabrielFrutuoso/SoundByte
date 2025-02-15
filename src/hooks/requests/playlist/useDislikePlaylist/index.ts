import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DislikePlaylistParams {
  playlistId: string;
  userId: string;
}

export const useDisikePlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ playlistId, userId }: DislikePlaylistParams) => {
      const { data } = await apiClient.post(`/api/playlist/${playlistId}/dislike`, {
        userId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedPlaylists"] });
    },
  });
};
