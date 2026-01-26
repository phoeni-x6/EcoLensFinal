import { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="bg-[#2E7D32] text-[#F5F5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold">EcoLens</h3>
            <p className="mt-3 text-sm text-[#F5F5DC]/80 leading-relaxed">
              EcoLens is a wildlife-focused platform dedicated to exploring,
              documenting, and protecting nature through photography and
              technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#66BB6A] no-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#66BB6A] no-underline">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#66BB6A] no-underline">
                  Explore Wildlife
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#66BB6A] no-underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-sm text-[#F5F5DC]/80">
              Email: ecolens@gmail.com
            </p>
            <p className="mt-2 text-sm text-[#F5F5DC]/80">
              Location: Sri Lanka
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-[#66BB6A]/40 mt-10 pt-6 text-center text-sm text-[#F5F5DC]/70">
          © {new Date().getFullYear()} EcoLens. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
