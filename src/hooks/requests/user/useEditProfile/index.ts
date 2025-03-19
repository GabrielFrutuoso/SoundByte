import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      userId,
      username,
    }: {
      userId: string;
      username: string;
    }) => {
      const response = await apiClient.patch(
        `/api/user/${userId}/profile/edit`,
        {
          username,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Perfil editado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      window.location.reload();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Erro",
        description: error.response?.data?.error || "Erro ao editar perfil",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
