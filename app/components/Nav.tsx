"use client";
import { Menu, Rocket, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./Button";

export function Nav({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-full px-6 py-3 border-2 border-black shadow-thick-6 w-full max-w-5xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-main to-[#FF8CF1] rounded-full border-2 border-black flex items-center justify-center">
                <Rocket
                  className="text-white transform -rotate-45 w-4 h-4"
                  fill="white"
                />
              </div>
              <span className="font-black max-sm:hidden">SAWIHA</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/paths"
              className="hover:text-pink-main transition-colors text-sm"
            >
              Paths
            </Link>
            <Link
              href="/challenges"
              className="hover:text-pink-main transition-colors text-sm"
            >
              Challenges
            </Link>
            <Link
              href="/collaboration"
              className="hover:text-pink-main transition-colors text-sm"
            >
              Collaboration
            </Link>
            <Link
              href="/pricing"
              className="hover:text-pink-main transition-colors text-sm"
            >
              Pricing
            </Link>
          </div>

          {/* CTA Buttons */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button
                  intent="mainPink"
                  size="custom"
                  className="text-sm px-6 py-2"
                >
                  Dashboard
                </Button>
              </Link>
              <Menu
                className="w-6 h-6 md:hidden cursor-pointer"
                onClick={() => setIsMobileMenuOpen(true)}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="hidden md:flex hover:bg-transparent hover:text-pink-main px-2 font-medium text-sm"
              >
                Sign In
              </Link>
              <Button
                intent="mainPink"
                size="custom"
                className="text-sm px-6 py-2"
              >
                Book Demo
              </Button>
              <Menu
                className="w-6 h-6 md:hidden cursor-pointer"
                onClick={() => setIsMobileMenuOpen(true)}
              />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          <div className="p-6 pb-20 flex flex-col gap-10 justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-14">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-main to-[#FF8CF1] rounded-full border-2 border-black flex items-center justify-center">
                    <Rocket
                      className="text-white transform -rotate-45 w-4 h-4"
                      fill="white"
                    />
                  </div>
                  <span className="font-black">SAWIHA</span>
                </div>
                <X
                  className="size-5 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>

              <div className="flex flex-col gap-10">
                <Link
                  href="/paths"
                  className="text-lg font-bold hover:text-pink-main transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Paths
                </Link>
                <Link
                  href="/challenges"
                  className="text-lg font-bold hover:text-pink-main transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Challenges
                </Link>
                <Link
                  href="/collaboration"
                  className="text-lg font-bold hover:text-pink-main transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Collaboration
                </Link>
                <Link
                  href="/pricing"
                  className="text-lg font-bold hover:text-pink-main transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
              </div>
            </div>
            <div className="pt-6">
              {/* CTA Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link href="/auth/login" className="w-full">
                    <Button
                      intent="mainPink"
                      size="custom"
                      className="text-sm px-6 py-2 w-full"
                    >
                      Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col w-full items-center gap-3">
                  <Link
                    href="/auth/login"
                    className="hover:bg-transparent hover:text-pink-main px-2 font-medium text-sm"
                  >
                    Sign In
                  </Link>
                  <Button
                    intent="mainPink"
                    size="custom"
                    className="text-sm px-6 py-2 w-full"
                  >
                    Book Demo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
