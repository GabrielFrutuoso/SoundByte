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
import { Music4 } from "lucide-react";

export const AddSongForm = () => {
  const [file, setFile] = React.useState<File | null>(null);

  console.log(file);

  return (
    <form className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-6 flex-1">
        <FormField>
          <Label htmlFor="title">Titulo</Label>
          <Input type="text" id="title" />
        </FormField>
        <FormField>
          <Label htmlFor="artist">Artista</Label>
          <Input type="text" id="artist" />
        </FormField>
        <FormField>
          <Select>
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
          <Label htmlFor="file">Arquivo</Label>
          <Input
            type="file"
            id="file"
            accept=".mp3"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </FormField>
      </div>
      {file ? (
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          width={200}
          height={200}
        />
      ) : (
        <FileInput id="file" accept=".png, .jpg, .jpeg" multiple>
          <Music4 />
        </FileInput>
      )}
    </form>
  );
}