import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (userId === "undefined") {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const songs = await prisma.song.findMany({
      where: {
        userUUID: userId || '',
      },
      include: {
        genre: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(songs, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/songs/[userId]:", error);
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}
