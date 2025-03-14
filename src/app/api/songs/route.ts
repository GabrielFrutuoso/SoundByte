import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/PrismaClient";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const genre = searchParams.get("genre");
    const take = searchParams.get("take");

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
      orderBy: [
        {
          likedBy: {
            _count: "desc",
          },
        },
        {
          updatedAt: "desc",
        },
      ],
      take: take ? parseInt(take) : undefined,
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, artist, bannerSrc, songURL, genreId, isPrivate, userUUID } =
      body;

    if (!userUUID) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.song.create({
      data: {
        title,
        artist,
        bannerSrc,
        songURL,
        genreId,
        isPrivate,
        userUUID,
      },
    });
    return NextResponse.json(
      { message: "Song created successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in POST /api/songs:", error);
    return NextResponse.json(
      { error: "Failed to create song" },
      { status: 500 }
    );
  }
}