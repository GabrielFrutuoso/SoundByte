import { prisma } from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

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
          },
        },
      },
      where: {
        isPrivate: false,
      },
      orderBy: {
        likedBy: {
          _count: 'desc'
        }
      }
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, bannerSrc, isPrivate, userUUID } = body; // Add userUUID to destructuring
    console.log(body);

    if (!userUUID) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const playlist = await prisma.playlist.create({
      data: {
        title,
        bannerSrc,
        isPrivate,
        userId: userUUID,
      },
    });

    return NextResponse.json(playlist, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/playlist:", error);
    return NextResponse.json(
      { error: "Failed to create playlist" },
      { status: 500 }
    );
  }
}
