import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { likeTo: string } }) {
    const body = await request.json();
    const { userId, playlistId, songId } = body;
    const likeTo = params.likeTo;

    if (likeTo === 'likePlaylist') {
        const like = await prisma.likedPlaylist.create({
            data: {
                userId,
                playlistId
            }
        });
        return NextResponse.json(like, { status: 201 });
    } else if (likeTo === 'likeSong') {
        const like = await prisma.likedSong.create({
            data: {
                userId,
                songId
            }
        });
        return NextResponse.json(like, { status: 201 });
    }
}
