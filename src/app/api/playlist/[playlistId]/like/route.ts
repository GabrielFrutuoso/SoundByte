import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { playlistId: string } }) {
  const body = await request.json();
  const { userId } = body;
  const playlistId = params.playlistId;
  const existingLike = await prisma.likedPlaylist.findFirst({
    where: {
      userId,
      playlistId,
    },
  });
  if (existingLike) {
    return NextResponse.json({ error: "Already liked" }, { status: 400 });
  }
  const like = await prisma.likedPlaylist.create({
    data: {
      userId,
      playlistId,
    },
  });
  return NextResponse.json(like, { status: 201 });
}
