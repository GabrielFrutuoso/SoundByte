import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";
import { ApiResponse, LikedPlaylist, LikedSong } from "@/types";

export async function DELETE(
  request: Request,
  { params }: { params: { unlikeTo: string } }
): Promise<NextResponse<ApiResponse<LikedPlaylist | LikedSong>>> {
  const unlikeTo = await params.unlikeTo;

  if (unlikeTo === "unlikePlaylist") {
    const { userId, playlistId } = await request.json();
    const likedPlaylist = await prisma.likedPlaylist.findFirst({
      select: {
        id: true,
      },
      where: {
        userId,
        playlistId,
      },
    });

    if (likedPlaylist) {
      const unlike = await prisma.likedPlaylist.delete({
        where: { id: likedPlaylist.id },
      });
      return NextResponse.json({ data: unlike, status: 200 });
    }
  }

  if (unlikeTo === "unlikeSong") {
    const { userId, songId } = await request.json();
    const likedSong = await prisma.likedSong.findFirst({
      where: {
        userId,
        songId,
      },
    });

    if (likedSong) {
      const unlike = await prisma.likedSong.delete({
        where: { id: likedSong.id },
      });
      return NextResponse.json({ data: unlike, status: 200 });
    }
  }

  return NextResponse.json({ error: "Invalid unlike operation", status: 400 });
}
