import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const PlaylistItemSkeleton = ({ isInMenu }: { isInMenu?: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className={`${isInMenu === false ? "w-11" : "w-[68px]"} aspect-square rounded-lg`} />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-64 rounded-lg" />
      </div>
    </div>
  );
};
