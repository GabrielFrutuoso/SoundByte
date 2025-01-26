import React from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Search } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-2 px-12 border-b border-zinc-800">
      <h1 className="text-2xl font-bold">SoundByte</h1>
      <form className="w-2/4 relative">
        <Search
          size={20}
          className="absolute top-1/2 left-2 -translate-y-1/2"
        />
        <Input className="bg-zinc-900 pl-8" type="text" />
      </form>
      <Avatar>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};
