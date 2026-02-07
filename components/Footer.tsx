import { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="bg-forest text-offwhite">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold tracking-tight">
              EcoLens
            </h3>
            <p className="mt-4 max-w-md text-sm text-offwhite/80 leading-relaxed">
              EcoLens is a wildlife-focused platform dedicated to exploring,
              documenting, and protecting nature through photography,
              conservation science, and technology.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-leaf mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-leaf transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-leaf transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-leaf transition">
                  Explore Wildlife
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-leaf transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-leaf mb-4">
              Contact
            </h4>
            <p className="text-sm text-offwhite/80">
              ecolens@gmail.com
            </p>
            <p className="mt-2 text-sm text-offwhite/80">
              Sri Lanka
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-offwhite/15 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-offwhite/70">
          <span>
            © {new Date().getFullYear()} EcoLens. All rights reserved.
          </span>

          <span className="italic text-offwhite/60">
            Protecting wildlife through technology 🌱
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
