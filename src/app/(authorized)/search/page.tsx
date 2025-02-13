"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/requests/search/useSearch";
import { SearchResultItem } from "@/components/SearchResultItem";
import { SearchResultType } from "@/app/types/SearchResult.type";

export default function Search() {
  const [type, setType] = useState("song");
  const [query] = useQueryState("query");

  useEffect(() => {
    setType("song");
  }, []);

  const { data: result } = useSearch(query || "", type || "");

  console.log(result?.data);

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-2 p-4 border-b border-zinc-800">
        <Button
          onClick={() => setType("song")}
          variant={type === "song" ? "default" : "ghost"}
          size="default"
        >
          Músicas
        </Button>

        <Button
          onClick={() => setType("playlist")}
          variant={type === "playlist" ? "default" : "ghost"}
          size="default"
        >
          Playlists
        </Button>
        {query && (
          <h1 className="text-xl font-bold">
            Resultados para: <span className="text-lime-500">{query}</span>
          </h1>
        )}
      </div>
      <ScrollArea className="h-full">
        <div className="flex flex-wrap flex-1 h-full gap-6 p-6">
          {result?.data?.map((item: SearchResultType) =>
            type === "song" ? (
              <SearchResultItem
                key={item?.id}
                result={item}
                type={"song"}
              />
            ) : (
              <SearchResultItem
                key={item?.id}
                result={item}
                type={"playlist"}
              />
            )
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
