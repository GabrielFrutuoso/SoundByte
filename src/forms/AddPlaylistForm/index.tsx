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

export const AddPlaylistForm = () => {
  const [fileBanner, setBannerFile] = React.useState<File | null>(null);

  return (
    <form className="flex items-center gap-6">
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
