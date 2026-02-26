import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-zinc-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-zinc-900 to-black text-white flex flex-col justify-between shadow-xl">
        {/* Top Section */}
        <div className="p-6 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">
              EcoLens
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Admin Panel
            </p>
          </div>

          <nav className="flex flex-col space-y-2 text-sm">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition"
            >
              📊 Dashboard
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition"
            >
              👥 Users
            </Link>

            <Link
              href="/admin/photos"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition"
            >
              📸 Photos
            </Link>

            <Link
              href="/admin/officers"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition"
            >
              🛡 Officers
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-6 border-t border-zinc-800">
          <div className="bg-zinc-800 p-4 rounded-xl">
            <p className="text-sm font-semibold">
              Logged in as
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              {session.user.email}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}