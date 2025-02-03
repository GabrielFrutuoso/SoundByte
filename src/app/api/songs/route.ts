import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/PrismaClient";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const genre = searchParams.get("genre");

    const queries = [];

    if (query) {
      queries.push({
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            artist: {
              contains: query,
            },
          },
        ],
      });
    }

    if (genre) {
      queries.push({
        genre: {
          title: {
            contains: genre,
          },
        },
      });
    }

    const songs = await prisma.song.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        genre: {
          select: {
            title: true,
          },
        },
        _count: {
          select: {
            likedBy: true,
          },
        },
      },
      where: {
        AND: queries,
        isPrivate: {
          equals: false,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(songs);
  } catch (error) {
    console.error("Error in GET /api/songs:", error);
    return NextResponse.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}
