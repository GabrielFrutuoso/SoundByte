import { Button } from '@/components/ui/button'
import React from 'react'

export default function Search() {
  return (
    <div className="h-full">
    <div className="flex gap-2 p-4 border-b border-zinc-800">
        <Button variant="outline">Músicas</Button>
        <Button variant="outline">Playlists</Button>
        </div>    
    </div>
  )
}
