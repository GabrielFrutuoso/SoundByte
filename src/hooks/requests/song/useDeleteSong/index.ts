import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export const useDeleteSongs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ songId }: { songId: string }) => {
      const { data } = await apiClient.post(`/api/songs/${songId}/delete`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
      toast({
        title: "Sucesso",
        description: "A música foi excluida",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao excluir a música",
        variant: "destructive",
      });
    },
  });
};
