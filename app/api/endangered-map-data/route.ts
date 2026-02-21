import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // 🔒 Role Protection
    if (!session || session.user.role !== "officer") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const endangeredImages = await Image.find({
      source: "community",
      isEndangered: true, // 🔴 ONLY endangered
      "location.lat": { $exists: true },
      "location.lng": { $exists: true },
    });

    return NextResponse.json(endangeredImages);

  } catch (error) {
    console.error("Endangered Map Data Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch endangered map data" },
      { status: 500 }
    );
  }
}