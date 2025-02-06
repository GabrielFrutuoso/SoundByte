import { toast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface ISongPost {
  userUUID: string;
  title: string;
  artist: string;
  bannerSrc: string;
  songURL: string;
  genreId: number;
  isPrivate: boolean;
}

const postSong = async (songData: ISongPost) => {
  const response = await axios.post('http://localhost:3000/api/songs', songData);
  return response.data;
};

export const usePostSong = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, ISongPost>({
    mutationFn: postSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      toast({
        title: "Sucesso",
        description: "A musica foi publicada",
      })
    },
  });
};