import { prisma } from "@/lib/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const body = await request.json();
    const { username } = body;

    if (!userId || !username) {
      return NextResponse.json(
        { error: "User ID and username are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const res = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update user profile: ${error}` },
      { status: 500 }
    );
  }
}
