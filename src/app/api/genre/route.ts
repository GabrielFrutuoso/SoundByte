import { prisma } from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  const genre = await prisma.genre.findMany();
  return NextResponse.json(genre, { status: 200 });
}
