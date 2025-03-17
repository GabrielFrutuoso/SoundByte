import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface RemoveSongFromPlaylistParams {
  playlistId: string;
  songId: string;
}

interface ErrorResponse {
  error: string;
}

export const useRemoveSongFromPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ playlistId, songId }: RemoveSongFromPlaylistParams) => {
      const { data } = await apiClient.post(
        `/api/playlist/${playlistId}/removeSong`,
        {
          songId,
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist"],
      });
      toast({
        title: "Sucesso",
        description: "A música foi removida da playlist",
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast({
        title: "Erro",
        description: error.response?.data?.error || "Erro ao remover música da playlist",
        variant: "destructive",
      });
    },
  });
};
