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
        <AddSongForm />
      </DialogContent>
    </Dialog>
  );
};
