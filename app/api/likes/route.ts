import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/mongodb";
import Like from "@/models/Like";
import Image from "@/models/Image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



// 👍 LIKE IMAGE
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { imageId } = await req.json();
    if (!imageId) {
      return NextResponse.json(
        { message: "imageId is required" },
        { status: 400 }
      );
    }

    await Like.create({
      userId,
      imageId,
    });

    await Image.findByIdAndUpdate(imageId, {
      $inc: { likeCount: 1 },
    });

    return NextResponse.json({ liked: true });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Already liked" },
        { status: 409 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


// 👎 UNLIKE IMAGE
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { imageId } = await req.json();
    if (!imageId) {
      return NextResponse.json(
        { message: "imageId is required" },
        { status: 400 }
      );
    }

    const deleted = await Like.findOneAndDelete({
      userId,
      imageId,
    });

    if (deleted) {
      await Image.findOneAndUpdate(
        { _id: imageId, likeCount: { $gt: 0 } },
        { $inc: { likeCount: -1 } }
      );
    }

    return NextResponse.json({ liked: false });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
