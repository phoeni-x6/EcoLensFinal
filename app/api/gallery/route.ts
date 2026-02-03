import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET() {
  await connectDB();

  const images = await Image.find()
    .populate("uploadedBy", "username role")
    .sort({ createdAt: -1 });

  // ✅ ONLY photographer uploads appear in gallery
  const photographerImages = images.filter(
    (img: any) => img.uploadedBy?.role === "photographer"
  );

  return NextResponse.json(photographerImages);
}
