import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../PrismaClient";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username, avatar, provider = "credentials" } = body;

    // Validate required fields
    if (!email || !username) {
      return NextResponse.json(
        { error: "Email and username are required" },
        { status: 400 }
      );
    }

    // Validate password only for credentials provider
    if (provider === "credentials") {
      if (!password) {
        return NextResponse.json(
          { error: "Password is required for credentials provider" },
          { status: 400 }
        );
      }
      if (password.length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters long" },
          { status: 400 }
        );
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const userData = {
      email,
      username,
      provider,
      avatar: avatar || null,
      ...(provider === "credentials" && { password: await hash(password, 10) })
    };

    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        provider: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
