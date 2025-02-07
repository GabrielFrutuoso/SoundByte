'use client'

import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useGetPlaylistById } from "@/hooks/requests/playlist/useGetPlaylistById";
import { Ellipsis, Heart, Play } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function Playlist() {
  const params = useParams();
  const id = params.id;
  const { data: playlist } = useGetPlaylistById(id as string);
  console.log("playlist: ", playlist);

  return (
    <div className="h-full flex flex-col px-12 pt-12 space-y-4">
      <div className="flex items-center gap-4">
        <Image
          className="rounded-lg aspect-square object-cover"
          draggable={false}
          src={playlist?.bannerSrc as string}
          width={200}
          height={200}
          alt="Album cover"
        />
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-4xl font-bold">{playlist?.title}</h1>
            <h2 className="text-muted-foreground">{playlist?.user?.username}</h2>
          </div>
          <div className="flex gap-3">
            <Play size={40} />
            <Heart className="text-lime-500" size={40} />
            <Ellipsis size={40} />
          </div>
        </div>
      </div>

      <Separator orientation="horizontal" />

      <Table>
        <TableHeader className="sticky top-0 bg-zinc-950">
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Nome da musica</TableHead>
            <TableHead>Artista/Banda</TableHead>
            <TableHead>Adicionado por</TableHead>
            <TableHead>Adicionado em</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playlist?.songs.map((song, index) => (
            <TableRow key={song?.song?.id} className="hover:bg-zinc-800 text-lg font-semibold cursor-pointer">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{song?.song?.title}</TableCell>
              <TableCell>{song?.song?.artist}</TableCell>
              <TableCell>{song?.song?.user?.username}</TableCell>
              <TableCell>{new Date(song?.song?.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
          {/* <TableRow className="hover:bg-zinc-800 text-lg font-semibold cursor-pointer">
            <TableCell>1</TableCell>
            <TableCell>(OST) Dreamseeker</TableCell>
            <TableCell>Bring Me The Horizon</TableCell>
            <TableCell>{playlist?.user?.username}</TableCell>
            <TableCell>{new Date().toLocaleDateString()}</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}
