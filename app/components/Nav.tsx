import { Menu, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";

export function Nav({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-full px-6 py-3 border-2 border-black shadow-thick-6 w-full max-w-5xl flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-main to-[#FF8CF1] rounded-full border-2 border-black flex items-center justify-center">
              <Rocket
                size={16}
                className="text-white transform -rotate-45"
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
          <Link href="/auth/login">
            <Button
              intent="mainPink"
              size="custom"
              className="text-sm px-6 py-2"
            >
              Dashboard
            </Button>
          </Link>
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
            <Menu size={24} className="md:hidden" />
          </div>
        )}
      </div>
    </nav>
  );
}
