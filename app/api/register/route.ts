import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, role, dwcId } = body;

    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔐 Generate verification token
    const rawToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving (VERY IMPORTANT)
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      dwcId: role === "officer" ? dwcId : null,
      verificationToken: hashedToken,
      verificationTokenExpires: tokenExpiry,
      isVerified: false,
    });

    // 📧 Send verification email
    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${rawToken}`;

    await resend.emails.send({
      from: "EcoLens <onboarding@resend.dev>",
      to: email,
      subject: "Verify your EcoLens account",
      html: `
        <h2>Welcome to EcoLens</h2>
        <p>Click the button below to verify your email:</p>
        <a href="${verifyUrl}" 
           style="padding:10px 20px;background:#16a34a;color:white;border-radius:6px;text-decoration:none;">
           Verify Account
        </a>
        <p>This link expires in 24 hours.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Registration successful. Please verify your email.",
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
