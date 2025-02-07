import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: params.playlistId,
        isPrivate: false,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        songs: {
          include: {
            song: true,
          },
        },
      },
    });

    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }

    return NextResponse.json(playlist, { status: 200 });
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch playlist" },
      { status: 500 }
    );
  }
}
