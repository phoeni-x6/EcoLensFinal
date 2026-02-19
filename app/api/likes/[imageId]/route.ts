import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Like from "@/models/Like";
import Image from "@/models/Image";

export async function POST(
  req: Request,
  { params }: { params: { imageId: string } }
) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const imageId = params.imageId;

    const image = await Image.findById(imageId);
    if (!image) {
      return NextResponse.json(
        { message: "Image not found" },
        { status: 404 }
      );
    }

    const existingLike = await Like.findOne({ userId, imageId });

    let liked;

    if (existingLike) {
      await Like.deleteOne({ userId, imageId });
      await Image.findByIdAndUpdate(imageId, {
        $inc: { likeCount: -1 },
      });
      liked = false;
    } else {
      await Like.create({ userId, imageId });
      await Image.findByIdAndUpdate(imageId, {
        $inc: { likeCount: 1 },
      });
      liked = true;
    }

    const updatedImage = await Image.findById(imageId).select("likeCount");

    return NextResponse.json({
      liked,
      likeCount: updatedImage?.likeCount ?? 0,
    });

  } catch (error) {
    console.error("Like API Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
