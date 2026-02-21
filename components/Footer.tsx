import { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="bg-[#1B3A2B] text-[#F5F5DC]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">

          {/* Brand + Mission */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-4xl font-bold tracking-tight">
              EcoLens
            </h3>

            <p className="max-w-md text-sm text-[#F5F5DC]/80 leading-relaxed">
              A digital sanctuary for wildlife photography and conservation.
              We bridge technology and environmental science to document,
              explore, and protect biodiversity across Sri Lanka and beyond.
            </p>

            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2E7D32]/30 border border-[#2E7D32]/40 text-sm">
              🌿 Powered by Nature & Innovation
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-[#4CAF50] mb-6">
              Explore
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-[#4CAF50] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#4CAF50] transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-[#4CAF50] transition">
                  Explore Wildlife
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#4CAF50] transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm uppercase tracking-widest text-[#4CAF50] mb-4">
                Contact
              </h4>
              <p className="text-sm text-[#F5F5DC]/80">
                ecolens@gmail.com
              </p>
              <p className="mt-2 text-sm text-[#F5F5DC]/80">
                Sri Lanka
              </p>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm uppercase tracking-widest text-[#4CAF50] mb-4">
                Stay Updated
              </h4>

              <div className="flex items-center bg-[#F5F5DC]/10 rounded-full overflow-hidden border border-[#F5F5DC]/20">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-transparent px-4 py-2 text-sm w-full outline-none placeholder:text-[#F5F5DC]/50"
                />
                <button className="bg-[#4CAF50] px-5 py-2 text-sm font-semibold text-white hover:bg-[#43A047] transition">
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-20 pt-8 border-t border-[#F5F5DC]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#F5F5DC]/70">

          <span>
            © {new Date().getFullYear()} EcoLens. All rights reserved.
          </span>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-[#4CAF50] transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[#4CAF50] transition">
              Terms
            </Link>
          </div>

          <span className="italic text-[#F5F5DC]/50">
            Protecting wildlife through technology 🌱
          </span>

        </div>

      </div>
    </footer>
  );
};

export default Footer;