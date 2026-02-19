import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Image from "@/models/Image";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // 🔒 Ensure only photographers can upload
    if (!session || session.user.role !== "photographer") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const file = formData.get("image") as File | null;
    const speciesType = formData.get("speciesType") as string | null;
    const speciesName = formData.get("speciesName") as string | null;
    const locationRaw = formData.get("location") as string | null;

    if (!file || !speciesType || !speciesName || !locationRaw) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // ✅ Safe structured location handling
    let location;

    try {
      // If frontend sends JSON string
      location = JSON.parse(locationRaw);
    } catch {
      // If frontend sends plain string
      location = {
        name: locationRaw,
        lat: 0,
        lng: 0,
      };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ☁️ Upload to Cloudinary
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "ecolens/photographer" },
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    await connectDB();

    // ✅ Create Image (AUTO APPROVED)
    const imageDoc = await Image.create({
      imageUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
      speciesType,
      speciesName,
      location,
      uploadedBy: session.user.id,
      source: "photographer",

      approved: true,          // 🔥 Auto-approved
      isGalleryImage: true,    // 🔥 Show in gallery
    });

    return NextResponse.json(imageDoc, { status: 201 });

  } catch (error) {
    console.error("Photographer Upload Error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
