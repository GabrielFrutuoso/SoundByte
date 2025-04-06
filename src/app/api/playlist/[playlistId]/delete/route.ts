import { prisma } from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  Request: NextRequest,
  { params }: { params: { playlistId: string } }
) {
  try {
    const playlistId = params.playlistId;

    if (!playlistId) {
      return NextResponse.json(
        { error: "Playlist ID is required" },
        { status: 400 }
      );
    }

    const playlist = await prisma.playlist.findUnique({
      where: {
        id: playlistId,
      },
    });

    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist not found" },
        { status: 404 }
      );
    }

    const deletedPlaylist = await prisma.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    return NextResponse.json(deletedPlaylist, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete playlist: ${error}` },
      { status: 500 }
    );
  }
}
