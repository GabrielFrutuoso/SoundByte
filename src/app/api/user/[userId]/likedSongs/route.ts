import { NextResponse } from "next/server";
import { prisma } from "@/lib/PrismaClient";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = await params.userId;
    if (userId === "undefined") {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const likedSongs = await prisma.likedSong.findMany({
      where: {
        userId: userId,
      },
      select: {
        song: {
          select: {
            id: true,
            title: true,
            bannerSrc: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(likedSongs, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/[userId]/likedSongs:", error);
    return NextResponse.json(
      { error: "Failed to fetch liked songs" },
      { status: 500 }
    );
  }
}
