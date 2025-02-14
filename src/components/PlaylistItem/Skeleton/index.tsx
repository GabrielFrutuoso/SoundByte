import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const PlaylistItemSkeleton = ({
  isInMenu,
  isCollapsed,
}: {
  isInMenu?: boolean;
  isCollapsed?: boolean;
}) => {
  return (
    <div className="flex items-center gap-2 w-full py-1">
      <Skeleton
        className={`${
          isInMenu === false ? "w-[52px]" : "w-[68px]"
        } ${!isCollapsed ? "w-[48px]" : 'w-[52px]' } aspect-square rounded-lg`}
      />
      {!isCollapsed && (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-56 rounded-lg" />
        </div>
      )}
    </div>
  );
};
