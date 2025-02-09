import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

interface Song {
  id: string;
  title: string;
  artist: string;
  bannerSrc: string | undefined;
  songURL: string;
}

const fetchSongToListen = async (
  singleSongId?: string | null,
  playlistId?: string | null,
  index?: number
): Promise<Song> => {
  if (singleSongId) {
    const { data } = await apiClient.get<Song>(
      `/api/listen?singleSongId=${singleSongId}`
    );
    return data;
  } else if (playlistId && index !== undefined) {
    const { data } = await apiClient.get<Song>(
      `/api/listen?playlistId=${playlistId}&index=${index}`
    );
    return data;
  } else {
    throw new Error("Either singleSongId or playlistId must be provided.");
  }
};

export const useGetToListen = (
  singleSongId?: string | null,
  playlistId?: string | null,
  index?: number
) => {
  return useQuery({
    queryKey: ["listen", singleSongId, playlistId, index],
    queryFn: () => fetchSongToListen(singleSongId, playlistId, index),
    enabled: !!(singleSongId || (playlistId && index !== undefined)),
  });
};
