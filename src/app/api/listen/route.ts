import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json({ message: "UUID is required" }, { status: 400 });
  }

  try {
    // First try to find it as a single song
    const singleSong = await prisma.song.findUnique({
      where: { id: uuid },
    });

    if (singleSong) {
      return NextResponse.json({ songs: [singleSong] }, { status: 200 });
    }

    // If not found as single song, try to find it as a playlist
    const playlist = await prisma.playlist.findUnique({
      where: { id: uuid },
      include: {
        songs: {
          include: { song: true },
          orderBy: { id: "asc" },
        },
      },
    });

    if (playlist) {
      const songs = playlist.songs.map(item => item.song);
      return NextResponse.json({ songs }, { status: 200 });
    }

    return NextResponse.json({ message: "No songs found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
