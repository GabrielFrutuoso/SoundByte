import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DislikeSongParams {
  songId: string;
  userId: string;
}

export const useDisikeSongs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ songId, userId }: DislikeSongParams) => {
      const { data } = await apiClient.post(
        `/api/songs/${songId}/dislike`,
        {
          userId,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedSongs"] });
    },
  });
};
