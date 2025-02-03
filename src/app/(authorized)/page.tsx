"use client";

import { PlaylistItem } from "@/components/PlaylistItem";
import { SongItem } from "@/components/SongItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetSongs } from "@/hooks/requests/useGetSongs.ts";
import Link from "next/link";
import { useQueryState } from "nuqs";
export default function Home() {
  const fakeArray = Array.from({ length: 8 }, (_, i) => i);
  const fakeArray2 = Array.from({ length: 6 }, (_, i) => i);

  const [query] = useQueryState("query");
  const [genre] = useQueryState("genre");

  const { data, isLoading, error } = useGetSongs(query as string, genre as string);

  console.log(data, isLoading, error);
   
  return (
    <main className="h-full">
      <ScrollArea className="h-full px-12">
        <div className="flex flex-col py-12">
          <div className="grid grid-cols-4 gap-4">
            {fakeArray.map((_, i) => (
              <PlaylistItem
                id={i}
                key={i + "teste"}
                isPrivate={false}
                hideText={true}
                variant="menu"
                creator="Briel"
                songName="POST HUMAN: NeX GEn"
                cover="data:image/jpeg;base64,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"
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Músicas Curtidas</h2>
              <Link className="underline" href="/library">
                Ver todas
              </Link>
            </div>
            <ul className="grid grid-cols-6 gap-1">
              {fakeArray2.map((_, i) => (
                <SongItem key={i + "teste"} />
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2 mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Músicas nova na área!</h2>
              <Link className="underline" href="/library">
                Ver todas
              </Link>
            </div>
            <ul className="grid grid-cols-6 gap-1">
              {fakeArray2.map((_, i) => (
                <SongItem key={i + "teste"} />
              ))}
            </ul>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}
