import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (query: string, type: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", query, type],
    queryFn: () => fetchSearch(query, type),
  });

  return { data, isLoading, error };
};

const fetchSearch = async (query: string, type: string) => {
  const data = apiClient.get(`/api/search?type=${type || ""}&q=${query || ""}`);
  return data;
};
