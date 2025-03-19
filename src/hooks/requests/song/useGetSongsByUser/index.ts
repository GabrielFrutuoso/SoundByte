import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { SongItemProps } from "@/app/types/SongProps.type";

export const useGetSongsByUser = (userId: string) => {
  return useQuery({
    queryKey: ["songs", "user", userId],
    queryFn: async () => {
      if (!userId) {
        return [];
      }
      const { data } = await apiClient.get<SongItemProps[]>(`/api/user/${userId}/songs`);
      return data;
    },
    enabled: !!userId,
  });
};