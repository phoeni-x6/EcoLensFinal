"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return <h1>Welcome {session?.user.name}</h1>;
};


interface ToastProps {
  message: string;
  show: boolean;
}

export default function Toast({ message, show }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slideIn">
      <div className="bg-[#2E7D32] text-[#F5F5DC] px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
        <span className="text-xl">✓</span>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}
