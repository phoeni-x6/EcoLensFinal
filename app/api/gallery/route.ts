import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET() {
  await connectDB();

  const images = await Image.find({
    isGalleryImage: true, // 🔒 ONLY gallery uploads
  })
    .populate("uploadedBy", "username")
    .sort({ createdAt: -1 });

  return NextResponse.json(images);
}
