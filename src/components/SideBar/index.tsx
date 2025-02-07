"use client";

import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { HomeIcon, PanelLeft, Search, Settings } from "lucide-react";
import { PlaylistItem } from "../PlaylistItem";
import { useSession } from "next-auth/react";
import { Separator } from "../ui/separator";
import { ResizablePanel } from "../ui/resizable";
import { Button } from "../ui/button";
import { useGetPlaylists } from "@/hooks/requests/playlist/useGetPlaylists";

export const SideBar = () => {
  const { data: session } = useSession();
  const [layout, setLayout] = useState(15);
  const { data: playlist } = useGetPlaylists();

  const handleLayoutChange = (size: number) => {
    return layout === 4.5 ? setLayout(size) : setLayout(4.5);
  };

  return (
    <ResizablePanel defaultSize={layout} minSize={layout} maxSize={layout}>
      <div className="flex flex-col">
        <ul
          className={`flex flex-col ${
            layout === 4.5 ? "items-center justify-center" : ""
          }  gap-2 px-4 pt-4`}
        >
          <Button
            onClick={() => handleLayoutChange(15)}
            variant="ghost"
            className="text-zinc-400 cursor-pointer flex items-center"
          >
            <PanelLeft className="text-zinc-400 " size={25} />
            {layout !== 4.5 && <span>Mudar Layout</span>}
          </Button>

          <Link
            className="flex items-center gap-2 inset-0 hover:bg-zinc-800 py-1 rounded-md px-1"
            href="/"
          >
            <HomeIcon />
            {layout !== 4.5 && <span>Home</span>}
          </Link>
          <Link
            className="flex items-center gap-2 inset-0 hover:bg-zinc-800 py-1 rounded-md px-1"
            href="/search"
          >
            <Search />
            {layout !== 4.5 && <span>Search</span>}
          </Link>
          {session?.user && (
            <Link
              className="flex items-center gap-2 inset-0 hover:bg-zinc-800 py-1 rounded-md px-1"
              href="/settings"
            >
              <Settings />
              {layout !== 4.5 && <span>Settings</span>}
            </Link>
          )}
        </ul>
        <Separator className="my-2" orientation="horizontal" />
        {session?.user && (
          <ScrollArea className="h-[640px] w-full flex flex-col justify-center items-center gap-4 px-4">
            {playlist?.map((playlist) => (
              <PlaylistItem
                key={playlist.id}
                username={playlist.user.username}
                isPrivate={false}
                layout={layout}
                {...playlist}
              />
            ))}
          </ScrollArea>
        )}
      </div>
    </ResizablePanel>
  );
};
