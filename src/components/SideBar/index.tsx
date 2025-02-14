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
import { Button } from "../ui/button";

export const SideBar = () => {
  const { data: session } = useSession();
  const [layout, setLayout] = useState(15);
  const { user } = useUserStore();
  const { data: playlist, isLoading } = useGetLikedPlaylists(user?.id || "");

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
      <div className="flex flex-col h-full">
        <ul
          className={`flex flex-col ${
            isCollapsed ? "items-center justify-center" : ""
          } gap-2 px-4 pt-4`}
        >
          <Button
            asChild
            variant={"ghost"}
            size={"default"}
            className="[&_svg]:size-6 text-lg justify-start"
          >
            <Link className="flex gap-2 inset-1" href={"/"}>
              <HomeIcon />
              {!isCollapsed && <span>Home</span>}
            </Link>
          </Button>

          <Button
            asChild
            variant={"ghost"}
            size={"default"}
            className="[&_svg]:size-6 text-lg justify-start"
          >
            <Link className="flex gap-2 inset-1" href={"/search"}>
              <Search />
              {!isCollapsed && <span>Search</span>}
            </Link>
          </Button>
          {session?.user && (
            <Button
              asChild
              variant={"ghost"}
              size={"default"}
              className="[&_svg]:size-6 text-lg justify-start"
            >
              <Link className="flex gap-2 inset-1" href={"/settings"}>
                <Settings />
                {!isCollapsed && <span>Settings</span>}
              </Link>
            </Button>
          )}
        </ul>
        <Separator className="my-2" orientation="horizontal" />

        {session?.user && (
          <ScrollArea className="flex-1 px-4">
            <div
              className={`flex flex-col ${
                isCollapsed ? "items-center" : ""
              } gap-4`}
            >
              {isLoading
                ? Array.from({ length: 12 }).map((_, i) => (
                    <PlaylistItemSkeleton
                      key={i}
                      isCollapsed={isCollapsed}
                      isInMenu={false}
                    />
                  ))
                : playlist?.map(({ playlist }, index) => (
                    <PlaylistItem
                      key={playlist.id}
                      {...playlist}
                      isPrivate={false}
                      isInMenu={false}
                      isCollapsed={isCollapsed}
                      songIndex={index}
                    />
                  ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </ResizablePanel>
  );
};
