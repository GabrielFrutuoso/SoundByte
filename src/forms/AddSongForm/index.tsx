"use client";

import React from "react";
import { FormField } from "../FormField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { FileInput } from "@/components/FileInput";
import { ImageDownIcon } from "lucide-react";
import { usePostSong } from "@/hooks/requests/song/usePostSong";
import { useUserStore } from "@/store/userStore";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export const AddSongForm = () => {
  const [fileMusic, setMusicFile] = React.useState<File | null>(null);
  const [fileBanner, setBannerFile] = React.useState<File | null>(null);
  console.log(fileMusic?.name);

  const { mutate } = usePostSong();
  const { user } = useUserStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (fileMusic) {
        mutate({
          userUUID: user?.id as string,
          title: e.currentTarget.title.value as string,
          artist: e.currentTarget.artist.value,
          isPrivate: e.currentTarget.privacy.value === "private" ? true : false,
          songURL: "test",
          bannerSrc:
            "https://i.scdn.co/image/ab67616d0000b273df51a3d66223e5b01813e0c4",
          genreId: 1,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao publicar a musica",
        variant: "destructive",
      });
    }
  };

  return (
    <form className="flex items-center gap-6" onSubmit={onSubmit}>
      <div className="flex flex-col items-center gap-6 flex-1">
        <FormField>
          <Label htmlFor="title">Titulo</Label>
          <Input name="title" type="text" id="title" />
        </FormField>
        <FormField>
          <Label htmlFor="artist">Artista</Label>
          <Input name="artist" type="text" id="artist" />
        </FormField>
        <FormField>
          <Label htmlFor="privacy">Privacidade</Label>
          <Select defaultValue="public" name="privacy">
            <SelectTrigger>
              <SelectValue placeholder="Privacidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Publico</SelectItem>
              <SelectItem value="private">Privado</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField>
          <Label htmlFor="file-music">Arquivo</Label>
          <Input
            type="file"
            id="file-music"
            accept=".mp3"
            onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
          />
        </FormField>
        <Button className="w-full" type="submit">
          Publicar
        </Button>
      </div>
      {fileBanner ? (
        <Image
          src={URL.createObjectURL(fileBanner)}
          alt={fileBanner.name}
          width={200}
          height={200}
        />
      ) : (
        <FileInput
          onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
          id="file-banner"
          accept=".png, .jpeg, .jpg"
          multiple
        >
          <ImageDownIcon size={100} />
        </FileInput>
      )}
    </form>
  );
};
