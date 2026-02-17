"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your account...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/verify?token=${token}`);
        const data = await res.json();

        if (res.ok) {
          setMessage("Email verified successfully! Redirecting to login...");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          setMessage(data.message || "Verification failed.");
        }
      } catch (error) {
        setMessage("Something went wrong during verification.");
      }
    };

    verify();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-xl">{message}</h1>
    </div>
  );
}
