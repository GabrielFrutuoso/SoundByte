import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { apiClient } from "@/lib/apiClient";
import { toast } from "@/hooks/use-toast";

interface LikePlaylistParams {
  playlistId: string;
  userId: string;
}

export const useUnlikePlaylist = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();

  return useMutation({
    mutationFn: async ({ playlistId, userId }: LikePlaylistParams) => {
      const response = await apiClient.delete("/api/unlike/unlikePlaylist", {
        data: {
          playlistId,
          userId,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (user) {
        setUser({
          ...user,
          likedPlaylists: data.likedPlaylists,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["likedPlaylists"] });
      toast({
        title: "Descurtido com sucesso",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Erro!",
        description: "Não foi possível descurtir a playlist",
        variant: "destructive",
      });
    },
  });
};
