import { useQuery } from "@tanstack/react-query";

type UserData = {
  username: string;
  id: string;
  email: string;
  name: string;
  avatar?: string;

};

const fetchUserByEmail = async (email: string): Promise<UserData | null> => {
  if (!email) return null;

  const response = await fetch(`http://localhost:3000/api/user?email=${email}`);

  if (!response.ok && response.status !== 404) {
    throw new Error('Failed to fetch user');
  }

  if (response.status === 404) {
    return null;
  }

  const data = await response.json();
  return data;
};

export const useFindUserByEmail = (email: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
    enabled: !!email.trim(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, error };
};
