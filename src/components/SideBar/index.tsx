"use client";

import React, { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { HomeIcon, Search, Settings } from "lucide-react";
import { PlaylistItem } from "../PlaylistItem";
import { useSession } from "next-auth/react";
import { Separator } from "../ui/separator";
import { ResizablePanel } from "../ui/resizable";
import { useGetLikedPlaylists } from "@/hooks/requests/likedPlaylist/useGetLikedPlaylists";
import { useUserStore } from "@/store/userStore";
import { PlaylistItemSkeleton } from "../PlaylistItem/Skeleton";

export const SideBar = () => {
  const { data: session } = useSession();
  const [layout, setLayout] = useState(15);
  const { user } = useUserStore();
  const { data: playlist } = useGetLikedPlaylists(user?.id || "");

  const handleResizePanel = (size: number) => {
    setLayout(size);
  };

  const isCollapsed = layout <= 7;

  return (
    <ResizablePanel
      defaultSize={layout}
      minSize={4.5}
      maxSize={30}
      onResize={handleResizePanel}
    >
      <div className="flex flex-col">
        <ul
          className={`flex flex-col ${
            isCollapsed ? "items-center justify-center" : ""
          } gap-2 px-4 pt-4`}
        >
          <Link
            className="flex items-center gap-2 inset-0 hover:bg-zinc-800 py-1 rounded-md px-1"
            href="/"
          >
            <HomeIcon />
            {!isCollapsed && <span>Home</span>}
          </Link>
          <Link
            className="flex items-center gap-2 inset-0 hover:bg-zinc-800 py-1 rounded-md px-1"
            href="/search"
          >
            <Search />
            {!isCollapsed && <span>Search</span>}
          </Link>
          {session?.user && (
            <Link
              className="flex items-center gap-2 inset-0 hover:bg-zinc-800 py-1 rounded-md px-1"
              href="/settings"
            >
              <Settings />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          )}
        </ul>
        <Separator className="my-2" orientation="horizontal" />
        {session?.user && (
          <ScrollArea className="h-[640px] w-full flex flex-col justify-center items-center gap-4 px-4">
            {playlist?.map(({ playlist }, index) => (
              <PlaylistItem
                key={playlist.id}
                {...playlist}
                isPrivate={false}
                isInMenu={false}
                isCollapsed={isCollapsed}
                songIndex={index}
              />
            ))}
            <PlaylistItemSkeleton isInMenu={false} />
          </ScrollArea>
        )}
      </div>
    </ResizablePanel>
  );
};
