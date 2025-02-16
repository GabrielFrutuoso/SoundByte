import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { songId: string } }) {
  const body = await request.json();
  const { userId } = body;
  const songId = params.songId;
  const existingLike = await prisma.likedSong.findFirst({
    where: {
      userId,
      songId,
    },
  });
  if (existingLike) {
    return NextResponse.json({ error: "Already liked" }, { status: 400 });
  }
  const like = await prisma.likedSong.create({
    data: {
      userId,
      songId,
    },
  });
  return NextResponse.json(like, { status: 201 });
}