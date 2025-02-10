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
import { useUserStore } from "@/store/userStore";
import { toast } from "@/hooks/use-toast";
import { usePostPlaylist } from "@/hooks/requests/playlist/usePostPlaylist";
import { Button } from "@/components/ui/button";

export const AddPlaylistForm = () => {
  const [fileBanner, setBannerFile] = React.useState<File | null>(null);

  const { mutate } = usePostPlaylist();
  const { user } = useUserStore();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (fileBanner) {
        mutate({
          userUUID: user?.id as string,
          title: e.currentTarget.title.value as string,
          isPrivate: e.currentTarget.privacy.value === "private" ? true : false,
          bannerSrc:
            "https://preview.redd.it/meteora-20-tracklist-released-on-genius-the-photo-below-was-v0-3mz7u1olpkea1.jpg?width=774&format=pjpg&auto=webp&s=8581bad06e7368b4556404ac496a543935daa873",
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
    <form onSubmit={onSubmit} className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-6 flex-1">
        <FormField>
          <Label htmlFor="title">Titulo</Label>
          <Input name="title" type="text" id="title" />
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
        <Button type="submit">Publicar</Button>
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
