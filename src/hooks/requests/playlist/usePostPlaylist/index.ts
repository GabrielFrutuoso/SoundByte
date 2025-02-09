import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PlaylistData = {
    title: string;
    bannerSrc: string;
    isPrivate: boolean;
  };
  
  export const usePostPlaylist = () => {
    const queryClient = useQueryClient();
  
    return useMutation<any, Error, PlaylistData>({
      mutationFn: async (data) => {
        const response = await apiClient.post("/api/playlist", data);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
      },
    });
  };