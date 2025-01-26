import { PlaylistItem } from "@/components/PlaylistItem";
import { SongItem } from "@/components/SongItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function Home() {
  const fakeArray = Array.from({ length: 8 }, (_, i) => i);
  const fakeArray2 = Array.from({ length: 6 }, (_, i) => i);

  return (
    <main className="h-full">
      <ScrollArea className="h-full p-12">
        <div className="grid grid-cols-4 gap-4">
          {fakeArray.map((_, i) => (
            <PlaylistItem
              key={i + "teste"}
              isPrivate={false}
              hideText={true}
              variant="menu"
              creator="Briel"
              songName="POST HUMAN: NeX GEn"
              cover="https://imgs.search.brave.com/F90OQSQxVjf8lA6ErVlKAuCJYrK8RJptKdfEjsmFqpE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvcHQvdGh1bWIv/Mi8yYy9Qb3N0X0h1/bWFuLV9OZXhfR2Vu/LnBuZy81MTJweC1Q/b3N0X0h1bWFuLV9O/ZXhfR2VuLnBuZw"
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
      </ScrollArea>
    </main>
  );
}
