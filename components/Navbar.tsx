"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FC, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: FC = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinkClass = (path: string) =>
    `
    relative px-4 py-2 text-base font-semibold tracking-wide
    text-white transition-colors duration-200
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
    after:bg-white after:origin-left after:scale-x-0
    after:transition-transform after:duration-200
    ${isActive(path) ? "after:scale-x-100" : "hover:after:scale-x-100"}
  `;

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#2E7D32] shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.jpeg"
              alt="EcoLens Logo"
              width={40}
              height={40}
              className="rounded-full border border-white/40"
            />
            <span className="text-2xl font-bold text-white">
              EcoLens
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/gallery" className={navLinkClass("/gallery")}>Gallery</Link>
            <Link href="/explore" className={navLinkClass("/explore")}>Explore Wildlife</Link>

            {session && (
              <Link href="/image-upload" className={navLinkClass("/image-upload")}>
                Image Upload
              </Link>
            )}

            <Link href="/about" className={navLinkClass("/about")}>About</Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {status === "loading" ? null : session ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/20">
                  <div className="w-8 h-8 rounded-full bg-white text-[#2E7D32] flex items-center justify-center font-semibold">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white text-base font-medium">
                    {session.user.name}
                  </span>
                </div>

                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="px-5 py-2 text-base font-semibold rounded-full border border-white text-white hover:bg-white hover:text-[#2E7D32] transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 text-base font-semibold rounded-full border border-white text-white hover:bg-white hover:text-[#2E7D32] transition duration-200"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 text-base font-semibold rounded-full bg-white text-[#2E7D32] hover:bg-gray-100 transition duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#2E7D32] border-t border-white/20 px-6 py-6 space-y-4">

          <Link href="/" onClick={closeMobile} className="block text-white font-semibold">
            Home
          </Link>

          <Link href="/gallery" onClick={closeMobile} className="block text-white font-semibold">
            Gallery
          </Link>

          <Link href="/explore" onClick={closeMobile} className="block text-white font-semibold">
            Explore Wildlife
          </Link>

          {session && (
            <Link
              href="/image-upload"
              onClick={closeMobile}
              className="block text-white font-semibold"
            >
              Image Upload
            </Link>
          )}

          <Link href="/about" onClick={closeMobile} className="block text-white font-semibold">
            About
          </Link>

          <div className="pt-4 border-t border-white/20">
            {status === "loading" ? null : session ? (
              <>
                <div className="mb-4 text-white font-medium">
                  Signed in as {session.user.name}
                </div>

                <button
                  onClick={() => {
                    closeMobile();
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="w-full px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#2E7D32] transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="block w-full text-center px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#2E7D32] transition duration-200"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMobile}
                  className="block w-full text-center px-5 py-2 rounded-full bg-white text-[#2E7D32] hover:bg-gray-100 transition duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;