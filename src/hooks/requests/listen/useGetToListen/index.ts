import { useQuery } from "@tanstack/react-query";

interface Song {
  id: string;
  title: string;
  artist: string;
  bannerSrc: string;
  songURL: string;
}

interface ListenResponse {
  songs: Song[];
  message?: string;
}

export function useGetToListen(uuid: string | undefined) {
  return useQuery<ListenResponse, Error>({
    queryKey: ["listen", uuid],
    queryFn: async (): Promise<ListenResponse> => {
      if (!uuid) return { songs: [] };

      const response = await fetch(`/api/listen?uuid=${uuid}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch songs");
      }

      return data;
    },
    enabled: !!uuid,
  });
}
