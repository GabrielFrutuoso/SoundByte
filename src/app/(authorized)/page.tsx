"use client";

import { PlaylistItem } from "@/components/PlaylistItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SongGroup } from "@/components/SongsGroup";
import { useSession } from "next-auth/react";
import { User, useUserStore } from "@/store/userStore";
import { useFindUserByEmail } from "@/hooks/requests/user/useFindUserByEmail";
import { useEffect } from "react";
import { useGetLikedPlaylists } from "@/hooks/requests/likedPlaylist/useGetLikedPlaylists";

export default function Home() {
  const { data: session } = useSession();
  const { user, setUser } = useUserStore();
  const { data } = useFindUserByEmail(session?.user?.email || "");

  const { data: likedPlaylists } = useGetLikedPlaylists(user?.id || "");

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
  console.log(likedPlaylists);

  return (
    <main className="h-full">
      <ScrollArea className="h-full px-12">
        <div className="flex flex-col">
          {user?.username && (
            <div className="grid grid-cols-4 gap-4 py-12">
              {likedPlaylists?.map(({playlist}, index) => (
                <PlaylistItem
                  key={playlist.id}
                  {...playlist}
                  isPrivate={false}
                  isInMenu={true}
                  variant="menu"
                  songIndex={index}
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
