import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

const useFindUserByEmail = (email: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      if (!email) return null;
      const response = await apiClient.get(`/user?email=${email}`);
      return response.data.exists;
    },
    enabled: !!email,
  });

  return {
    userExists: data || false,
    loading: isLoading,
    isError,
  };
};

export default useFindUserByEmail;