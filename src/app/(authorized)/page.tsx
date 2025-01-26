import { PlaylistItem } from "@/components/PlaylistItem";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const fakeArray = Array.from({ length: 8 }, (_, i) => i);

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
              songName="Kool-Aid"
              cover="https://imgs.search.brave.com/F90OQSQxVjf8lA6ErVlKAuCJYrK8RJptKdfEjsmFqpE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvcHQvdGh1bWIv/Mi8yYy9Qb3N0X0h1/bWFuLV9OZXhfR2Vu/LnBuZy81MTJweC1Q/b3N0X0h1bWFuLV9O/ZXhfR2VuLnBuZw"
            />
          ))}
        </div>
      </ScrollArea>
    </main>
  );
}
