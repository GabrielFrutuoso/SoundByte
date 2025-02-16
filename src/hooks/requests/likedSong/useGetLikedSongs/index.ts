import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
const fetchLikedSongs = async (
  userId: string
): Promise<any> => {
  const { data } = await apiClient.get<any[]>(
    `/api/user/${userId}/likedSongs`
  );
  return data;
};

export const useGetLikedSongs = (userId: string) => {
  return useQuery({
    queryKey: ["likedSongs"],
    queryFn: () => fetchLikedSongs(userId),
  });
};
