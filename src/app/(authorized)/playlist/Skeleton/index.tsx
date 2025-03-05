import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import React from "react";

export const PlaylistSkeleton = () => {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="w-[200px] h-[200px] aspect-square rounded-lg" />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <Skeleton className="w-[500px] h-[50px]" />
          <Skeleton className="w-[200px] h-[20px]" />
        </div>
        <div className="flex gap-3">
          <Loader2 className="animate-spin" size={40} />
        </div>
      </div>
    </div>
  );
};

export const PlaylistItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Loader2 className="animate-spin" size={20} />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6" />
      </TableCell>
    </TableRow>
  );
};
