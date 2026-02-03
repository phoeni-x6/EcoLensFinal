import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    // ✅ FIXED: correct App Router usage
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const file = formData.get("image") as File | null;
    const speciesName = formData.get("speciesName") as string | null;
    const speciesType = formData.get("speciesType") as string | null;
    const location = formData.get("location") as string | null;

    if (!file || !speciesName || !speciesType || !location) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "ecolens" }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    await connectDB();

    await Image.create({
      imageUrl: uploadResult.secure_url,
      speciesName,
      speciesType,
      location,
      uploadedBy: session.user.id,
    });

    // ✅ ALWAYS return JSON
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);

    // ✅ GUARANTEED JSON RESPONSE
    return NextResponse.json(
      { message: "Upload failed", error: error.message },
      { status: 500 }
    );
  }
}
