"use client";

import React, { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/requests/search/useSearch";
import { SearchResultItem } from "@/components/SearchResultItem";
import { SearchResultType } from "@/app/types/SearchResult.type";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "@/components/Pagination";
import { SearchResultSkeleton } from "@/components/SearchResultItem/Skeleton";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetGenre } from "@/hooks/requests/genre/useGetGenre";

export default function Search() {
  const [type, setType] = useState("song");
  const [query] = useQueryState("query");
  const [page, setPage] = useQueryState("page");
  const [genre] = useQueryState("genre");
  const { data: genreData } = useGetGenre();

  useEffect(() => {
    setType("song");
  }, []);

  const {
    data: result,
    isLoading,
    error,
  } = useSearch({
    query: query || "",
    genre: genre || "",
    type: type || "song",
    page: Number(page || 1),
    pageSize: 10,
  });

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch search results",
        variant: "destructive",
      });
    }
  }, [error]);

  console.log(genreData);
  

  return (
    <div className="h-full flex flex-col pb-4">
      <div className="w-full flex flex-col sm:flex-row justify-between gap-4 p-4 border-b border-zinc-800">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setType("song")}
            variant={type === "song" ? "default" : "ghost"}
            size="default"
            className="w-full sm:w-auto"
          >
            Músicas
          </Button>

          <Button
            onClick={() => setType("playlist")}
            variant={type === "playlist" ? "default" : "ghost"}
            size="default"
            className="w-full sm:w-auto"
          >
            Playlists
          </Button>
          <Separator orientation="vertical" className="hidden sm:block" />
          <Select>
            <SelectTrigger className="w-[180px]">Genero</SelectTrigger>
            <SelectContent>
              {genreData?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {query && (
            <>
              <Separator orientation="vertical" className="hidden sm:block" />
              <h1 className="text-xl font-bold w-full sm:w-auto">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-7 p-4 sm:p-12">
        {result?.data?.songs &&
          result?.data?.songs?.map((item: SearchResultType) => (
            <SearchResultItem key={item?.id} result={item} type={"song"} />
          ))}
        {result?.data?.playlists &&
          result?.data?.playlists?.map((item: SearchResultType) => (
            <SearchResultItem key={item?.id} result={item} type={"playlist"} />
          ))}
        {isLoading && (
          <>
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
          </>
        )}
      </div>
    </div>
  );
}
