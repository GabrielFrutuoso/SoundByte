import { NextResponse } from "next/server";
import { prisma } from "@/lib/PrismaClient";

export async function POST(request: Request, { params }: { params: { songId: string } }) {
  const { songId } = params;
  const body = await request.json();
  const { userId } = body;

  const existingSong = await prisma.likedSong.findFirst({
    where: {
      songId,
      userId
    }
  });

  if (!existingSong) {
    return NextResponse.json({ error: "Liked song not found" }, { status: 404 });
  }

  const dislikedSong = await prisma.likedSong.delete({
    where: {
      id: existingSong.id
    },
  });

  return NextResponse.json(dislikedSong, { status: 201 });
}