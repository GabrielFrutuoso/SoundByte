import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

type Genre = {
  id: string;
  title: string;
};

const getGenre = async (): Promise<Genre[]> => {
  const { data } = await apiClient.get<Genre[]>(`/api/genre`);
  return data;
};

export const useGetGenre = () => {
  return useQuery({
    queryKey: ["genre"],
    queryFn: getGenre,
  });
};
