"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { BurgerIcon } from "@icons";

export const Nav = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const mediaQuery = useMediaQuery("(max-width: 860px)");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isMobile = isClient && mediaQuery;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Projects", href: "/#projects" },
    { label: "Why choose us", href: "/#trusted-orgs" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between bg-white px-6 py-4 shadow-sm ">
      {/* Logo on the left */}
      <div className="flex items-center gap-8">
        <Link href="/">
          <Logo />
        </Link>
        {isMobile && (
          <div className="relative">
            <div
              onClick={() => setOpenMenu(!openMenu)}
              className="cursor-pointer"
            >
              <BurgerIcon width="35" height="35" />
            </div>
            <ul
              className={`absolute top-12 -left-full bg-white z-20 rounded-lg overflow-hidden flex flex-col w-48 transition-all duration-300 ease-in-out ${openMenu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}`}
            >
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  className="transition text-lg whitespace-nowrap"
                  key={item.href}
                  onClick={() => setOpenMenu(false)}
                >
                  <li className="hover:bg-gray-100 text-[#656C86] hover:text-violet-normal p-3 w-48 cursor-pointer">
                    {item.label}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Center Nav Items */}
      {!isMobile && (
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[#656C86] hover:text-violet-normal transition text-lg whitespace-nowrap"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Link
            href="/auth/login"
            className="flex items-center gap-2 bg-violet-normal text-white px-5 py-2 rounded-md hover:bg-violet-hover focus:ring-2 focus:ring-primary-200 transition"
          >
            My Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="text-[#656C86] hover:text-violet-normal transition text-lg"
            >
              Login
            </Link>
            <Link
              href="/auth/sign-up"
              className="flex items-center gap-2 bg-violet-normal text-white px-5 py-2 rounded-md hover:bg-violet-hover focus:ring-2 focus:ring-primary-200 transition"
            >
              Register <ArrowRight size={16} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
