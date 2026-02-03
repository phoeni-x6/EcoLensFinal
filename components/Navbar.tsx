"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FC } from "react";

const Navbar: FC = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navLinkClass = (path: string) =>
    `relative px-3 py-1 rounded-md font-medium transition-all duration-300 no-underline
     ${
       pathname === path
         ? "text-[#2E7D32] bg-[#66BB6A]/20"
         : "text-[#263238] hover:text-[#66BB6A]"
     }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F5DC] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/images/logo.jpeg"
                alt="EcoLens Logo"
                width={40}
                height={40}
              />
            </Link>
            <Link
              href="/"
              className="text-[#2E7D32] font-bold text-xl no-underline"
            >
              EcoLens
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/gallery" className={navLinkClass("/gallery")}>Gallery</Link>
            <Link href="/explore" className={navLinkClass("/explore")}>Explore Wildlife</Link>

           {session && (
  <Link
    href="/image-upload"
    className={navLinkClass("/image-upload")}
  >
    Image Upload
  </Link>
)}


            <Link href="/about" className={navLinkClass("/about")}>About Us</Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {status === "loading" ? null : session ? (
              <>
                {/* Role badge */}
                <span className="px-3 py-1 text-sm rounded-full bg-[#2E7D32] text-[#F5F5DC] capitalize">
                  {session.user.role}
                </span>

                {/* Username */}
                <span className="font-medium text-[#263238]">
                  {session.user.name}
                </span>

                {/* Logout */}
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 border border-[#2E7D32] text-[#2E7D32] font-semibold rounded hover:bg-[#2E7D32] hover:text-[#F5F5DC] transition no-underline"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-4 py-2 bg-[#2E7D32] text-[#F5F5DC] font-semibold rounded hover:bg-[#66BB6A] transition no-underline"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
