import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { playlistId: string } }) {
  try {
    const { playlistId } = params;
    const body = await request.json();
    const { songId } = body;

    const playlist = await prisma.playlist.findUnique({
      where: {
        id: playlistId,
      },
      include: {
        user: true,
      },
    });

    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }

    const playlistSong = await prisma.playlistSong.findFirst({
      where: {
        playlistId,
        songId,
      },
    });

    if (!playlistSong) {
      return NextResponse.json({ error: "Song not in playlist" }, { status: 404 });
    }

    const removedSong = await prisma.playlistSong.delete({
      where: {
        id: playlistSong.id,
      },
    });

    return NextResponse.json(removedSong, { status: 200 });
  } catch (error) {
    console.error("Error removing song from playlist:", error);
    return NextResponse.json({ error: "Failed to remove song from playlist" }, { status: 500 });
  }
}
