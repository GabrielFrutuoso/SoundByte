import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: { songId: string } }
) {
  try {
    const { songId } = params;

    // First, find the song to check if it exists
    const song = await prisma.song.findUnique({
      where: { id: songId },
    });

    if (!song) {
      return NextResponse.json({ error: "Song not found" }, { status: 404 });
    }

    // Delete all playlist-song relationships
    await prisma.playlistSong.deleteMany({
      where: { songId },
    });

    // Delete all likes for this song
    await prisma.likedSong.deleteMany({
      where: { songId },
    });

    // Finally, delete the song itself
    const deletedSong = await prisma.song.delete({
      where: { id: songId },
    });

    return NextResponse.json({ deletedSong }, { status: 200 });
  } catch (error) {
    console.error("Error deleting song:", { error });

    // More specific error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Song not found" }, { status: 404 });
      }
      if (error.code === "P2003") {
        return NextResponse.json(
          {
            error:
              "Cannot delete song referenced by other records. Please try again later.",
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to delete song" },
      { status: 500 }
    );
  }
}
