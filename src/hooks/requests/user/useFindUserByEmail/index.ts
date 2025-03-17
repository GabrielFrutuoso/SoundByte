import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export type User = {
  provider: string;
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt?: string;
  updatedAt?: string;
  likedPlaylists: Array<{
    playlist: {
      id: string;
    };
  }>;
  likedSongs: Array<{
    song: {
      id: string;
    };
  }>;
};


const fetchUserByEmail = async (email: string): Promise<User | null> => {
  if (!email) return null;

  const response = await fetch(`http://localhost:3000/api/user?email=${email}`);

  if (!response.ok && response.status !== 404) {
    toast({
      title: "Erro",
      description: "Erro ao buscar usuário",
      variant: "destructive",
    });
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
