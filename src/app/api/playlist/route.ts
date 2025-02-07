import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const playlists = await prisma.playlist.findMany({
      select: {
        id: true,
        title: true,
        bannerSrc: true,
        user: {
          select: {
            username: true,
          }
        }
      },
      where: {
        isPrivate: false
      },

    });

    return NextResponse.json(playlists, { status: 200 });
  } catch (error) {
    console.error("Error fetching public playlists:", error);
    return NextResponse.json(
      { error: "Failed to fetch public playlists" },
      { status: 500 }
    );
  }
}
