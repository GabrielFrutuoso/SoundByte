import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (playlistId: string) => {
           await apiClient.delete(`/api/playlist/${playlistId}/delete`);
            
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlists"] });
            queryClient.invalidateQueries({ queryKey: ["likedPlaylists"] });
        },
        onError: (error) => {
            console.error("Error deleting playlist:", error);
            toast({
                title: "Error",
                description: "Failed to delete playlist",
                variant: "destructive",
            })
        }
    });

}
