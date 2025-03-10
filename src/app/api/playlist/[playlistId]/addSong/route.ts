import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { playlistId: string } }) {
  const { playlistId } = params;
  const body = await request.json();
  const { songId } = body;
  const existingSong = await prisma.playlistSong.findFirst({
    where: {
      playlistId,
      songId,
    },
  });
  if (existingSong) {
    return NextResponse.json({ error: "Song already in playlist" }, { status: 400 });
  }
  const addedSong = await prisma.playlistSong.create({
    data: {
      playlistId,
      songId,
    },
  });
  return NextResponse.json(addedSong, { status: 201 });
}
