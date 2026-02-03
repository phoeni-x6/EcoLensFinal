import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ✅ ADD THIS
      role: "tourist" | "photographer" | "officer";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // ✅ ADD THIS
    role: "tourist" | "photographer" | "officer";
  }
}
