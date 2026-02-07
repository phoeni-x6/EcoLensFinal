"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FC } from "react";

const Navbar: FC = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isActive = (path: string) => pathname === path;

  const navLinkClass = (path: string) =>
    `
    relative px-3 py-2 text-sm font-medium transition
    ${
      isActive(path)
        ? "text-forest"
        : "text-charcoal hover:text-leaf"
    }
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
    after:scale-x-0 after:bg-forest after:transition-transform
    hover:after:scale-x-100
    ${isActive(path) ? "after:scale-x-100" : ""}
  `;

  return (
    <nav className="sticky top-0 z-50 bg-softbeige/95 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT — Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.jpeg"
                alt="EcoLens Logo"
                width={38}
                height={38}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-forest tracking-tight">
                EcoLens
              </span>
            </Link>
          </div>

          {/* CENTER — Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/gallery" className={navLinkClass("/gallery")}>Gallery</Link>
            <Link href="/explore" className={navLinkClass("/explore")}>
              Explore Wildlife
            </Link>

            {session && (
              <Link
                href="/image-upload"
                className={navLinkClass("/image-upload")}
              >
                Image Upload
              </Link>
            )}

            <Link href="/about" className={navLinkClass("/about")}>
              About
            </Link>
          </div>

          {/* RIGHT — User */}
          <div className="hidden md:flex items-center gap-4">
            {status === "loading" ? null : session ? (
              <>
                {/* Username Badge */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10">
                  <div className="w-7 h-7 rounded-full bg-forest text-offwhite flex items-center justify-center text-sm font-semibold">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-charcoal">
                    {session.user.name}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="
                    px-4 py-2 text-sm font-medium
                    rounded-full
                    text-earth
                    hover:bg-earth/10
                    transition
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="
                    px-4 py-2 text-sm font-semibold
                    rounded-full
                    border border-forest
                    text-forest
                    hover:bg-forest hover:text-offwhite
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="
                    px-4 py-2 text-sm font-semibold
                    rounded-full
                    bg-forest text-offwhite
                    hover:bg-leaf transition
                  "
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
