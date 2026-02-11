import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Image from "@/models/Image";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "photographer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const file = formData.get("image") as File | null;
    const speciesType = formData.get("speciesType") as string | null;
    const speciesName = formData.get("speciesName") as string | null;
    const location = formData.get("location") as string | null;

    if (!file || !speciesType || !speciesName || !location) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "ecolens/photographer" }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    await connectDB();

  const imageDoc = await Image.create({
  imageUrl: uploadResult.secure_url,
  cloudinaryId: uploadResult.public_id,
  speciesType,
  speciesName,
  location,
  uploadedBy: session.user.id,
  source: "photographer",
  isGalleryImage: true,
});


    return NextResponse.json(imageDoc, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
