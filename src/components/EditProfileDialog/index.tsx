"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { EditProfileForm } from "@/forms/EditProfileForm";

export const EditProfileDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="mr-2" /> Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[250px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <EditProfileForm />
      </DialogContent>
    </Dialog>
  );
};
