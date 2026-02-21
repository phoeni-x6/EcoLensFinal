import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET() {
  try {
    await connectDB();

    const images = await Image.find({
      source: "community",
      isEndangered: { $ne: true }, // 🔴 EXCLUDE endangered
      "location.lat": { $exists: true },
      "location.lng": { $exists: true },
    });

    return NextResponse.json(images);

  } catch (error) {
    console.error("Map Data Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch map data" },
      { status: 500 }
    );
  }
}
