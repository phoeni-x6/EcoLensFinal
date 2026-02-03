"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return <h1>Welcome {session?.user.name}</h1>;
};


import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      alert(res.error);
      return;
    }

    /**
     * Role-based redirect
     * (Role is injected into session by NextAuth callbacks)
     */
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    const role = session?.user?.role;

    if (role === "tourist") {
      router.push("/explore");
    } else if (role === "photographer") {
      router.push("/image-upload");
    } else if (role === "officer") {
      router.push("/explore");
    } else {
      router.push("/");
    }
  };

  return (
    <section className="bg-[#F5F5DC] min-h-screen flex items-center justify-center py-20">
      <div className="bg-[#E0E0E0] w-full max-w-xl px-10 py-12 rounded-lg shadow-lg">

        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#263238] mb-8">
          EcoLens Login
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>

          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-[#263238] outline-none focus:ring-2 focus:ring-[#66BB6A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-[#263238] outline-none focus:ring-2 focus:ring-[#66BB6A]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded-full hover:bg-[#66BB6A] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-[#263238]">
          New User?{" "}
          <a
            href="/register"
            className="font-medium text-[#2E7D32] hover:underline"
          >
            Sign up to use EcoLens
          </a>
        </p>

      </div>
    </section>
  );
}
