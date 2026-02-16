import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import Like from "@/models/Like";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const images = await Image.find({ isGalleryImage: true })
      .populate({
        path: "uploadedBy",
        select: "username",
      })
      .lean();

    const likes = userId
      ? await Like.find({ userId }).select("imageId").lean()
      : [];

    const likedSet = new Set(likes.map(l => l.imageId.toString()));
const safeImages = images.map((img: any) => ({
  ...img,
  uploadedBy: img.uploadedBy ? { username: img.uploadedBy.username } : { username: "Unknown" },
  likeCount: Number(img.likeCount ?? 0),
  likedByMe: userId ? likedSet.has(img._id.toString()) : false,
}));


    return NextResponse.json(safeImages);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
