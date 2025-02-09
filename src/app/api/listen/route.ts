import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const singleSongId = searchParams.get("singleSongId");
  const playlistId = searchParams.get("playlistId");
  const index = searchParams.get("index");

  try {
    let song;

    if (singleSongId) {
      song = await prisma.song.findUnique({
        where: { id: singleSongId },
      });
    } else if (playlistId && index) {
      const playlist = await prisma.playlist.findUnique({
        where: { id: playlistId },
        include: {
          songs: {
            include: { song: true },
            orderBy: { id: "asc" },
          },
        },
      });

      if (playlist && playlist.songs[Number(index)]?.song) {
        song = playlist.songs[Number(index)].song;
      }
    }

    if (!song) {
      return NextResponse.json({ message: "Song not found" }, { status: 200 });
    }

    return NextResponse.json(song, { status: 200 });
  } catch (error) {
    console.error("Error fetching song:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
