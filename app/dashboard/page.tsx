"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <h1 className="text-2xl font-bold">
      Welcome {session?.user.name}
    </h1>
  );
}
