import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (query: string, type: string, page: number, pageSize: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", query, type, page, pageSize],
    queryFn: () => fetchSearch(query, type, page, pageSize),
  });

  return { data, isLoading, error };
};

const fetchSearch = async (query: string, type: string, page: number, pageSize: number) => {
  const data = apiClient.get(`/api/search?type=${type || ""}&q=${query || ""}&page=${page || 1}&pageSize=${pageSize || 10}`);
  return data;
};
