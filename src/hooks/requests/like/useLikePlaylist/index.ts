import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { apiClient } from "@/lib/apiClient";
import { toast } from "@/hooks/use-toast";

interface LikePlaylistParams {
  playlistId: string;
  userId: string;
}

export const useLikePlaylist = () => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();

  return useMutation({
    mutationFn: async ({ playlistId, userId }: LikePlaylistParams) => {
      const response = await apiClient.post("/api/like/likePlaylist", {
        playlistId,
        userId,
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
        title: "Curtido com sucesso",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        title: "Erro!",
        description: "Não foi possível curtir a playlist",
        variant: "destructive",
      });
    },
  });
};
