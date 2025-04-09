"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Music, ListMusic, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/userStore";
import React from "react";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetPlaylistsByUser } from "@/hooks/requests/playlist/useGetPlaylistsByUser";
import { useGetSongsByUser } from "@/hooks/requests/song/useGetSongsByUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaylistItem } from "@/components/PlaylistItem";
import { SongItem } from "@/components/SongItem";
import { PlaylistItemSkeleton } from "@/components/PlaylistItem/Skeleton";
import { EditProfileDialog } from "@/components/EditProfileDialog";
import Image from "next/image";

export default function Settings() {
  const { user } = useUserStore();
  const { data: playlists, isLoading: isLoadingPlaylists } =
    useGetPlaylistsByUser(user?.id || "");
  const { data: songs, isLoading: isLoadingSongs } = useGetSongsByUser(
    user?.id || ""
  );

  if (!user) {
    return redirect("/");
  }

  return (
    <ScrollArea className="h-full w-full p-6">
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Separator className="my-6" orientation="horizontal" />

        <div className="flex items-center justify-start gap-4 mb-8">
          {user?.avatar && (
            <Avatar className="w-40 h-40">
              <Image
                width={160}
                height={160}
                alt="Avatar"
                src={user?.avatar || ""}
              />
              <AvatarFallback>
                {user?.username?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex flex-col items-start justify-start gap-2">
            <h3 className="text-4xl font-bold">{user?.username}</h3>
            <p className="text-lg">{user?.email}</p>
            <div className="flex items-center justify-start gap-2">
              <EditProfileDialog />
              {user.provider === "credentials" && (
                <Button variant="destructive">Change password</Button>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="playlists" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="playlists" className="flex items-center">
              <ListMusic className="mr-2 h-4 w-4" />
              My Playlists ({playlists?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="songs" className="flex items-center">
              <Music className="mr-2 h-4 w-4" />
              My Songs ({songs?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="playlists">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">My Playlists</h2>
              </div>

              {isLoadingPlaylists ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <PlaylistItemSkeleton key={index} />
                  ))}
                </div>
              ) : playlists && playlists.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {playlists.map((playlist, index) => (
                    <PlaylistItem
                      key={playlist.id}
                      id={playlist.id}
                      title={playlist.title}
                      user={{
                        id: playlist.userId,
                      }}
                      bannerSrc={playlist.bannerSrc}
                      isPrivate={playlist.isPrivate}
                      songIndex={index}
                      variant="menu"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border-zinc-700 rounded-lg">
                  <ListMusic size={48} className="text-zinc-500 mb-4" />
                  <p className="text-zinc-400">
                    You haven&apos;t created any playlists yet
                  </p>
                  <Button className="mt-4" variant="outline">
                    Create a Playlist
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="songs">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">My Songs</h2>
              </div>

              {isLoadingSongs ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 p-4 rounded-md bg-zinc-900/50"
                    >
                      <div className="w-full aspect-square bg-zinc-800 rounded-md animate-pulse" />
                      <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
                      <div className="h-3 w-1/2 bg-zinc-800 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : songs && songs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {songs.map((song) => (
                    <SongItem key={song.id} {...song} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 border-zinc-700 rounded-lg">
                  <Music size={48} className="text-zinc-500 mb-4" />
                  <p className="text-zinc-400">
                    You haven&apos;t uploaded any songs yet
                  </p>
                  <Button className="mt-4" variant="outline">
                    <Upload className="mr-2 h-4 w-4" /> Upload Songs
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
