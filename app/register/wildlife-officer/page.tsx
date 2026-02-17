"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function WildlifeOfficerRegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dwcId, setDwcId] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        role: "officer",
        dwcId,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message || data.error || "Registration failed");
      return;
    }

    setShowToast(true);

    setTimeout(() => {
      router.push("/login");
    }, 2500);
  };

  return (
    <>
      <Toast
        show={showToast}
        message="Officer account created. Please verify your email."
      />

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#111827] px-6">
        
        {/* Glass Card */}
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 text-white">
          
          <h1 className="text-3xl font-bold text-center mb-2">
            Wildlife Officer Registration
          </h1>

          <p className="text-center text-sm text-white/70 mb-8">
            Authorized personnel access for ecological protection 🌿
          </p>

          <form className="space-y-6" onSubmit={handleRegister}>
            
            <div>
              <label className="block text-sm mb-2">Full Name / Username</label>
              <input
                placeholder="Officer Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">DWC ID</label>
              <input
                placeholder="Official Department ID"
                value={dwcId}
                onChange={(e) => setDwcId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                placeholder="official@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                placeholder="Create a secure password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 py-3 rounded-lg font-semibold shadow-lg hover:shadow-emerald-600/40"
            >
              Create Officer Account
            </button>
          </form>

          <p className="text-xs text-center mt-6 text-white/60">
            Officer accounts may be subject to administrative verification.
          </p>
        </div>
      </section>
    </>
  );
}
