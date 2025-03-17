import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { Playlist } from "@prisma/client";

export const useGetPlaylistsByUser = (userId: string) => {
  return useQuery({
    queryKey: ["playlists", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<Playlist[]>(`/api/user/${userId}/playlists`);
      return data;
    },
  });
};
