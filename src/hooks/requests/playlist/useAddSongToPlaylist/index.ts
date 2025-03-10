import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { toast } from "@/hooks/use-toast";

interface AddSongToPlaylistParams {
  playlistId: string;
  songId: string;
}

export const useAddSongToPlaylist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ playlistId, songId }: AddSongToPlaylistParams) => {
      const { data } = await apiClient.post(
        `/api/playlist/${playlistId}/addSong`,
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
        description: "A musica foi adicionada a playlist",
      });
    },
  });
};
