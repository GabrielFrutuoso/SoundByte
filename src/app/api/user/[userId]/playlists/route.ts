import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

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

    const playlists = await prisma.playlist.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(playlists, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/[userId]/playlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}
