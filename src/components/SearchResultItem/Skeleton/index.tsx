import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const SearchResultSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-60">
        <Skeleton className="w-full h-[255px] aspect-square rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-3/4 h-[20px] aspect-square rounded-lg" />
          <Skeleton className="w-1/4 h-[20px] aspect-square rounded-lg" />
        </div>
    </div>
  )
}
