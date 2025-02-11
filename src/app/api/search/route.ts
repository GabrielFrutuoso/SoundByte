import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    const [songs, playlists] = await Promise.all([
      prisma.song.findMany({
        where: {
          isPrivate: false,
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
            {
              genre: {
                title: {
                  contains: query,
                },
              },
            },
          ],
        },
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
        },
      }),
      prisma.playlist.findMany({
        where: {
          isPrivate: false,
          OR: [
            {
              title: {
                contains: query,
              },
            },
          ],
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
          songs: {
            include: {
              song: {
                include: {
                  user: true,
                  genre: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      songs,
      playlists,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
