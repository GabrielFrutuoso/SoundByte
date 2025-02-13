"use client";

import React from "react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Search } from "lucide-react";
import { AddSongDialog } from "../AddSongDialog";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();
  const { user } = useUserStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query");
    router.push(`/search?query=${query}`);
  };
  return (
    <header className="flex items-center justify-between py-2 px-12 border-b border-zinc-800">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">
          Sound<span className="text-lime-500">Byte</span>
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <form onSubmit={handleSubmit} className="w-96 relative">
          <Search
            size={20}
            className="absolute top-1/2 left-2 -translate-y-1/2"
          />
          <Input
            className="bg-zinc-900/50 pl-8"
            type="text"
            placeholder="Pesquisar"
            name="query"
            autoComplete="off"
          />
        </form>
        {user?.username && <AddSongDialog />}
      </div>
      {user?.username ? (
        <Menubar className="focus:outline-none rounded-full appearance-none border-none px-0">
          <MenubarMenu>
            <MenubarTrigger className="focus:outline-none rounded-full appearance-none border-none px-0 cursor-pointer">
              <Avatar>
                <Image
                  width={40}
                  height={40}
                  src={user?.avatar || ""}
                  alt="Avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="cursor-pointer">
                <Link href={"/settings"}>Configurações</Link>
              </MenubarItem>
              <MenubarItem
                className="cursor-pointer text-red-500"
                onClick={() => signOut()}
              >
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
        <Button
          className="text-bold text-lg"
          variant="ghost"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      )}
    </header>
  );
};
