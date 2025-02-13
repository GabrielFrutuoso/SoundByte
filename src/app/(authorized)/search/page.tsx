"use client";

import React, { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/requests/search/useSearch";
import { SearchResultItem } from "@/components/SearchResultItem";
import { SearchResultType } from "@/app/types/SearchResult.type";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/Pagination";

export default function Search() {
  const [type, setType] = useState("song");
  const [query] = useQueryState("query");
  const [page, setPage] = useQueryState("page");

  useEffect(() => {
    setType("song");
  }, []);

  const { data: result } = useSearch(
    query || "",
    type || "song",
    Number(page || 1),
    12
  );

  console.log(result?.data);

  // Wrap setPage to convert its type
  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
  };

  return (
    <div className="h-full flex flex-col pb-4">
      <div className="w-full flex justify-between gap-2 p-4 border-b border-zinc-800">
        <div className="flex gap-2">
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
            <>
              <Separator orientation="vertical" />
              <h1 className="text-xl font-bold">
                Resultados para: <span className="text-lime-500">{query}</span>
              </h1>
            </>
          )}
        </div>
        <Pagination
          currentPage={Number(page || 1)}
          totalPages={result?.data?.totalPages || 1}
          setPage={handlePageChange}
        />
      </div>
      <div className="grid grid-cols-6 gap-7 mx-auto py-12">
        {result?.data?.songs &&
          result?.data?.songs?.map((item: SearchResultType) => (
            <SearchResultItem key={item?.id} result={item} type={"song"} />
          ))}
        {result?.data?.playlists &&
          result?.data?.playlists?.map((item: SearchResultType) => (
            <SearchResultItem key={item?.id} result={item} type={"playlist"} />
          ))}
      </div>
    </div>
  );
}
