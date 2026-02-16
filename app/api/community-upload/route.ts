import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Image from "@/models/Image";

export async function POST(req: Request) {
  try {
    // 🔐 Check session
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 📦 Get form data
    const formData = await req.formData();

    const file = formData.get("image") as File | null;
    const speciesType = formData.get("speciesType") as string | null;
    const speciesName = formData.get("speciesName") as string | null;
    const location = formData.get("location") as string | null;

    if (!file || !speciesType || !speciesName || !location) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 🌍 Convert location name → coordinates using OpenStreetMap
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}`
    );

    if (!geoResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch location coordinates" },
        { status: 500 }
      );
    }

    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      return NextResponse.json(
        { error: "Invalid location name" },
        { status: 400 }
      );
    }

    const lat = parseFloat(geoData[0].lat);
    const lng = parseFloat(geoData[0].lon);

    // 📸 Upload image to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "ecolens/community" }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    // 🗄 Connect DB
    await connectDB();

    // 💾 Save to MongoDB
    const imageDoc = await Image.create({
      imageUrl: uploadResult.secure_url,
      cloudinaryId: uploadResult.public_id,
      speciesType,
      speciesName,
      location: {
        name: location,
        lat,
        lng,
      },
      uploadedBy: session.user.id,
      source: "community",
      approved: false, // keep false until reviewed
      isGalleryImage: false,
    });

    return NextResponse.json(imageDoc, { status: 201 });

  } catch (error) {
    console.error("Community Upload Error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
