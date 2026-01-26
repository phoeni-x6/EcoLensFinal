"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ Store user temporarily (we’ll improve later)
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ Redirect based on role
    if (data.user.role === "tourist") {
      router.push("/explore");
    } else if (data.user.role === "photographer") {
      router.push("/image-upload");
    } else if (data.user.role === "officer") {
      router.push("/explore");
    }
  };

  return (
    <section className="bg-[#F5F5DC] min-h-screen flex items-center justify-center py-20">
      <div className="bg-[#E0E0E0] w-full max-w-xl px-10 py-12 rounded-lg shadow-lg">

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#263238] mb-8">
          EcoLens Login
        </h1>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>

          {/* Email */}
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

          {/* Password */}
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded-full hover:bg-[#66BB6A] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-[#263238]">
          New User?{" "}
          <a
            href="/register"
            className="font-medium text-[#2E7D32] hover:underline"
          >
            SignUp to use EcoLens.
          </a>
        </p>

      </div>
    </section>
  );
}
