import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { HomeIcon, Search, Settings } from "lucide-react";
import { SongItem } from "../SongItem";

export const SideBar = () => {
  const fakeArray = Array.from({ length: 20 }, (_, i) => i);
  return (
    <div className="flex flex-col p-4 gap-4">
      <ul className="flex flex-col gap-4 py-2">
        <li className="flex items-center gap-2">
          <HomeIcon />
          <Link href="/">Home</Link>
        </li>
        <li className="flex items-center gap-2">
          <Search />
          <Link href="/">Pesquisar</Link>
        </li>
        <li className="flex items-center gap-2">
          <Settings />
          <Link href="/">Configurações</Link>
        </li>
      </ul>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Minhas Playlists</h1>
        <ScrollArea className="h-[720px] w-full flex flex-col gap-4">
          {fakeArray.map((_, i) => (
            <SongItem
              key={i + "teste"}
              isPrivate={false}
              creator="Briel"
              songName="Kool-Aid"
              cover="https://imgs.search.brave.com/F90OQSQxVjf8lA6ErVlKAuCJYrK8RJptKdfEjsmFqpE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvcHQvdGh1bWIv/Mi8yYy9Qb3N0X0h1/bWFuLV9OZXhfR2Vu/LnBuZy81MTJweC1Q/b3N0X0h1bWFuLV9O/ZXhfR2VuLnBuZw"
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
