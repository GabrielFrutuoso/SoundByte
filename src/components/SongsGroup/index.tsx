import Link from "next/link";
import React from "react";
import { SongItem } from "../SongItem";
import { SongItemProps } from "@/app/types/SongProps.type";
import { useGetSongs } from "@/hooks/requests/song/useGetSongs.ts";
import { SearchResultSkeleton } from "../SearchResultItem/Skeleton";

interface SongGroupProps {
  title: string;
  description: string;
  redirectTo: string;
}

export const SongGroup = ({
  title,
  description,
  redirectTo,
}: SongGroupProps) => {
  const { data, isLoading } = useGetSongs("", "", 6);

  return (
    <div className="flex flex-col gap-2 mt-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm font-thin opacity-75">{description}</p>
        </div>

        <Link className="underline" href={redirectTo}>
          Ver todas
        </Link>
      </div>
      <ul className="grid grid-cols-6 gap-1">
        {data?.data?.map((song: SongItemProps) => (
          <SongItem key={song?.id} {...song} />
        ))}
        {isLoading && (
          <>
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
            <SearchResultSkeleton />
          </>
        )}
      </ul>
    </div>
  );
};
