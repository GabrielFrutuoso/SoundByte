"use client";

import React from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Search } from "lucide-react";
import { AddSongDialog } from "../AddSongDialog";
import { useSession } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between py-2 px-12 border-b border-zinc-800">
      <h1 className="text-2xl font-bold">
        Sound<span className="text-lime-500">Byte</span>
      </h1>
      <div className="flex items-center gap-4">
        <form className="w-96 relative">
          <Search
            size={20}
            className="absolute top-1/2 left-2 -translate-y-1/2"
          />
          <Input className="bg-zinc-900/50 pl-8" type="text" />
        </form>
        <AddSongDialog />
      </div>

      <Avatar>
        <AvatarImage src={session?.user?.image as string} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};
