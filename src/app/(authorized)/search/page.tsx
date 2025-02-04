"use client";

// import { SongItem } from "@/components/SongItem";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Search() {
  // const fakeArray = Array.from({ length: 36 }, (_, i) => i);
  const searchParams = useSearchParams();

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 p-4 border-b border-zinc-800">
        <Button
          variant={
            searchParams.get("type") === "tracks" ? "default" : "outline"
          }
        >
          Músicas
        </Button>
        <Button
          variant={
            searchParams.get("type") === "playlists" ? "default" : "outline"
          }
        >
          Playlists
        </Button>
        <Separator orientation="vertical" />

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gênero" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rock">Rock</SelectItem>
            <SelectItem value="pop">Pop</SelectItem>
            <SelectItem value="rap">Rap</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea>
        <div className="flex flex-wrap gap-6 items-center justify-center p-6">
          {/* {fakeArray.map((_, i) => (
            <SongItem
              key={i + "teste"}
              id={""}
              title={""}
              artist={""}
              bannerSrc={""}
              songURL={""}
              isPrivate={false}
              createdAt={undefined}
              updatedAt={undefined}
              userUUID={""}
              genreId={0}
            />
          ))} */}
        </div>
      </ScrollArea>
    </div>
  );
}
