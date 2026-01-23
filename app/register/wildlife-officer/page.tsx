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
        role: "officer",      // ✅ FIXED
        dwcId,                // ✅ Officer-only field
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    // ✅ Show success toast
    setShowToast(true);

    // Redirect after toast
    setTimeout(() => {
      router.push("/login");
    }, 2500);
  };

  return (
    <>
      <Toast
        show={showToast}
        message="Wildlife Officer account created successfully"
      />

      <section className="bg-[#F5F5DC] min-h-screen flex items-center justify-center py-20">
        <div className="bg-[#E0E0E0] w-full max-w-xl px-10 py-12 rounded-lg shadow-lg">

          <h1 className="text-2xl font-bold text-center mb-8">
            EcoLens Register for Wildlife Officers
          </h1>

          <form className="space-y-5" onSubmit={handleRegister}>

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded"
              required
            />

            <input
              placeholder="DWC ID"
              value={dwcId}
              onChange={(e) => setDwcId(e.target.value)}
              className="w-full px-4 py-3 rounded"
              required
            />

            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded"
              required
            />

            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded"
              required
            />

            <button className="w-full bg-[#2E7D32] text-white py-3 rounded-full">
              Register
            </button>
          </form>

        </div>
      </section>
    </>
  );
}
