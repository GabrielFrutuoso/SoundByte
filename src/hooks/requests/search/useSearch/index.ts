import { apiClient } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

type SearchParams = {
  query?: string;
  type: string;
  page: number;
  pageSize: number;
  genre?: string;
};

export const useSearch = ({
  query,
  type,
  page,
  pageSize,
  genre,
}: SearchParams) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", query, type, page, pageSize, genre],
    queryFn: () => fetchSearch({ query, type, page, pageSize, genre }),
  });

  return { data, isLoading, error };
};

const fetchSearch = async ({
  query,
  type,
  page,
  pageSize,
  genre,
}: SearchParams) => {
  const data = apiClient.get(
    `/api/search?type=${type || ""}&q=${query || ""}&page=${
      page || 1
    }&pageSize=${pageSize || 10}&genre=${genre || ""}`
  );
  return data;
};
