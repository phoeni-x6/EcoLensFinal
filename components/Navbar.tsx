"use client";

import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar: FC = () => {
  const pathname = usePathname();

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
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/images/logo.jpeg"
                alt="EcoLens Logo"
                width={40}
                height={40}
                className="mr-2"
              />
            </Link>
            <Link
              href="/"
              className="text-[#2E7D32] font-bold text-xl no-underline"
            >
              EcoLens
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/" className={navLinkClass("/")}>
              Home
              {pathname === "/" && (
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#2E7D32] rounded-full" />
              )}
            </Link>

            <Link href="/gallery" className={navLinkClass("/gallery")}>
              Gallery
              {pathname === "/gallery" && (
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#2E7D32] rounded-full" />
              )}
            </Link>

            <Link href="/explore" className={navLinkClass("/explore")}>
              Explore Wildlife
              {pathname === "/explore" && (
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#2E7D32] rounded-full" />
              )}
            </Link>

            <Link href="/image-upload" className={navLinkClass("/image-upload")}>
              Image Upload
              {pathname === "/image-upload" && (
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#2E7D32] rounded-full" />
              )}
            </Link>

            <Link href="/about" className={navLinkClass("/about")}>
              About Us
              {pathname === "/about" && (
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#2E7D32] rounded-full" />
              )}
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
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
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
