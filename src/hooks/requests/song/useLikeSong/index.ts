import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

interface LikeSongRequest {
  userId: string;
  songId: string;
}

const likeSong = async ({ userId, songId }: LikeSongRequest) => {
  const { data } = await apiClient.post(`/api/songs/${songId}/like`, {
    userId,
  });
  return data;
};

export const useLikeSongs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeSong,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["likedSongs"],
      });
    },
  });
};
