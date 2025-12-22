import React from "react";
import Link from "next/link";
import { Button } from "./Button";

export function Footer() {
  return (
    <footer className="relative text-white overflow-hidden pt-20 pb-8">
      {/* Starry Background Effect */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Section: Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          {/* Column 1: Product */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-lg mb-6">Product</h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-main transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-main transition-colors"
                >
                  Missions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-main transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-main transition-colors"
                >
                  For Schools
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-lg mb-6">Solutions</h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-main transition-colors"
                >
                  For Kids
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-main transition-colors"
                >
                  For Parents
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-main transition-colors"
                >
                  For Teachers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-main transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-main transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-pink-main transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter (Wider) */}
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <h4 className="font-bold text-lg mb-4">Subscribe</h4>
            <p className="text-white/70 mb-6">
              Join our newsletter to stay up to date on new missions and
              features.
            </p>
            <form className="flex gap-2 flex-wrap">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none "
              />
              <Button
                type="button"
                className="px-6 py-3 bg-mint-green-main text-black font-bold rounded-lg transition-colors"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-mint-green-main/10 rounded-full border border-mint-green-main/20 text-mint-green-main">
              <div className="w-2 h-2 rounded-full bg-mint-green-main animate-pulse" />
              <span className="font-medium text-xs">
                All systems operational
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <p>© 2025 Sawiha Pty Ltd.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Site Map
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>

          <div className="flex gap-4">{/* Social Icons could go here */}</div>
        </div>
      </div>
    </footer>
  );
}
