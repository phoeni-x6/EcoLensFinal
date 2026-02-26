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

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user._id.toString() === session.user.id) {
    return NextResponse.json(
      { error: "You cannot block yourself" },
      { status: 400 }
    );
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  return NextResponse.json({
    success: true,
    isBlocked: user.isBlocked,
  });
}