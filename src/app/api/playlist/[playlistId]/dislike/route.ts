import { NextResponse } from "next/server";
import { prisma } from "@/lib/PrismaClient";

export async function POST(request: Request, { params }: { params: { playlistId: string } }) {
  const { playlistId } = params;
  const body = await request.json();
  const { userId } = body;

  const existingLikedPlaylist = await prisma.likedPlaylist.findFirst({
    where: {
      playlistId,
      userId
    }
  });

  if (!existingLikedPlaylist) {
    return NextResponse.json({ error: "Liked playlist not found" }, { status: 404 });
  }

  const dislikedPlaylist = await prisma.likedPlaylist.delete({
    where: {
      id: existingLikedPlaylist.id
    },
  });

  return NextResponse.json(dislikedPlaylist, { status: 201 });
}
