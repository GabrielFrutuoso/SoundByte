import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Music4 } from "lucide-react";

export const FileInput = (props: React.ComponentProps<typeof Input>) => {
  return (
    <>
      <Label
        className="aspect-square w-56 cursor-pointer rounded-md flex items-center justify-center border border-dashed border-zinc-800/50 hover:bg-zinc-800/50"
        htmlFor={props.id}
      >
        <Music4 size={40} />
      </Label>
      <Input id={props.id} type="file" className="hidden" {...props} />
    </>
  );
};
