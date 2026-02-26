import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await req.json();

  await connectDB();

  const officer = await User.findById(userId);

  if (!officer || officer.role !== "officer") {
    return NextResponse.json({ error: "Invalid officer" }, { status: 400 });
  }

  officer.officerApproved = true;
  await officer.save();

  return NextResponse.json({ success: true });
}