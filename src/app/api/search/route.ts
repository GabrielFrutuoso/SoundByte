import { prisma } from "@/lib/PrismaClient";
import {  } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const skip = (page - 1) * pageSize;

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
          skip,
          take: pageSize,
        });
        const totalItems = await prisma.song.count({
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
        });
        const totalPages = Math.ceil(totalItems / pageSize);
        return NextResponse.json({ songs, totalItems, totalPages }, { status: 200 });
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
          skip,
          take: pageSize,
        });
        const totalPlaylistItems = await prisma.playlist.count({
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
        const totalPlaylistPages = Math.ceil(totalPlaylistItems / pageSize);
        return NextResponse.json({ playlists, totalPlaylistItems, totalPlaylistPages }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
