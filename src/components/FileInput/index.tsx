import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props extends React.ComponentProps<typeof Input> {
  children?: React.ReactNode;
}

export const FileInput = ({ children, ...props }: Props) => {
  return (
    <>
      <Label
        className="aspect-square w-56 cursor-pointer rounded-lg flex items-center justify-center border border-zinc-800/50 hover:bg-zinc-800/50"
        htmlFor={props.id}
      >
        {children}
      </Label>
      <Input id={props.id} type="file" className="hidden" {...props} />
    </>
  );
};
