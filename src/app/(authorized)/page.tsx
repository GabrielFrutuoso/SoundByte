"use client";

import { PlaylistItem } from "@/components/PlaylistItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SongGroup } from "@/components/SongsGroup";
import { useSession } from "next-auth/react";
import { User, useUserStore } from "@/store/userStore";
import { useFindUserByEmail } from "@/hooks/requests/user/useFindUserByEmail";
import { useEffect } from "react";
import { useGetPlaylists } from "@/hooks/requests/playlist/useGetPlaylists";

export default function Home() {
  // const fakeArray = Array.from({ length: 8 }, (_, i) => i);
  const { data: session } = useSession();
  const { user, setUser } = useUserStore();
  const { data } = useFindUserByEmail(session?.user?.email || "");

  const { data: playlists } = useGetPlaylists();

  useEffect(() => {
    if (data) {
      const userWithRequiredFields: User = {
        id: data.id,
        email: data.email,
        username: data.username,
        avatar: data.avatar || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setUser(userWithRequiredFields);
    }
  }, [data, setUser]);

  return (
    <main className="h-full">
      <ScrollArea className="h-full px-12">
        <div className="flex flex-col">
          {user?.username && (
            <div className="grid grid-cols-4 gap-4 py-12">
              {playlists?.map((playlist) => (
                <PlaylistItem
                  key={playlist.id}
                  {...playlist}
                  isPrivate={false}
                  username={playlist.user.username}
                  hideText={true}
                  variant="menu"
                />
              ))}
            </div>
          )}
          <SongGroup
            title="Mais curtidas"
            description="Aqui estão as músicas mais curtidas pelos usuários."
            redirectTo={"/"}
          />
          <SongGroup
            title="Novos sons"
            description="Aqui está a lista de novos sons."
            redirectTo={"/"}
          />
        </div>
      </ScrollArea>
    </main>
  );
}
