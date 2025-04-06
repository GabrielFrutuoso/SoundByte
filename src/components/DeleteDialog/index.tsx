import React, { MouseEventHandler } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface DeleteDialogProps {
  isOpen?: boolean;
  onOpenChange?: () => void;
  title: string;
  description: string;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

export const DeleteDialog = ({
  isOpen,
  onOpenChange,
  title,
  description,
  onDelete,
}: DeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      <DialogFooter>
        <Button variant="destructive" onClick={onDelete}>
          deletar
        </Button>
        <DialogClose>cancelar</DialogClose>
      </DialogFooter>        
      </DialogContent>
    </Dialog>
  );
};
