import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "";

    switch (type) {
      case "song":
        const songs = await prisma.song.findMany({
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
          select: {
            id: true,
            title: true,
            bannerSrc: true,
            artist: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        return NextResponse.json(songs, { status: 200 });
      case "playlist":
        const playlists = await prisma.playlist.findMany({
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
        });
        return NextResponse.json(playlists, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
