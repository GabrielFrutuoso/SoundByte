"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AddSongForm } from "@/forms/AddSongForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AddPlaylistForm } from "@/forms/AddPlaylistForm";

export const AddSongDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Plus />
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar</DialogTitle>
        </DialogHeader>
        <Tabs>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="music">Música</TabsTrigger>
            <TabsTrigger value="playlist">Playlist</TabsTrigger>
          </TabsList>
          <TabsContent value="music">
            <AddSongForm />
          </TabsContent>
          <TabsContent value="playlist">
            <AddPlaylistForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
