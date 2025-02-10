import { NextResponse } from "next/server";
import { prisma } from "@/lib/PrismaClient";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (userId === "undefined") {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const likedPlaylists = await prisma.likedPlaylist.findMany({
      where: {
        userId: userId,
      },
      select: {
        playlist: {
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

    return NextResponse.json(likedPlaylists, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/likedPlaylists/[userId]:", error);
    return NextResponse.json(
      { error: "Failed to fetch liked playlists" },
      { status: 500 }
    );
  }
}
