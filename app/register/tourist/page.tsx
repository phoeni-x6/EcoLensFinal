"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function TouristRegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        role: "tourist",
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
        message="Account created! Please verify your email."
      />

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-6">
        
        {/* Glass Card */}
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 text-white">
          
          <h1 className="text-3xl font-bold text-center mb-2">
            Explore with EcoLens
          </h1>

          <p className="text-center text-sm text-white/80 mb-8">
            Discover wildlife locations and contribute responsibly 🌿
          </p>

          <form className="space-y-6" onSubmit={handleRegister}>
            
            <div>
              <label className="block text-sm mb-2">Username</label>
              <input
                placeholder="Your display name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                placeholder="example@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 py-3 rounded-lg font-semibold shadow-lg hover:shadow-emerald-500/40"
            >
              Create Tourist Account
            </button>
          </form>

          <p className="text-xs text-center mt-6 text-white/70">
            Respect wildlife. Protect nature. Explore responsibly.
          </p>
        </div>
      </section>
    </>
  );
}
