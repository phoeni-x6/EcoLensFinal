"use client";

import { useState } from "react";

export default function UserRegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        role: "tourist", // 👈 IMPORTANT
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Tourist registration successful");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <section className="bg-[#F5F5DC] min-h-screen flex items-center justify-center py-20">
      <div className="bg-[#E0E0E0] w-full max-w-xl px-10 py-12 rounded-lg shadow-lg border border-[#90CAF9]">

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#263238] mb-8">
          EcoLens Register – Tourist
        </h1>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded bg-white text-[#263238] outline-none focus:ring-2 focus:ring-[#66BB6A]"
            />
          </div>

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
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded-full hover:bg-[#66BB6A] transition"
          >
            Register
          </button>

        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-[#263238]">
          Already registered?{" "}
          <a
            href="/login"
            className="font-medium text-[#2E7D32] hover:underline"
          >
            Login
          </a>
        </p>

      </div>
    </section>
  );
}
