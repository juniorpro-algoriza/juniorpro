"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface UserProfile {
  userType: number;
}

export const Nav = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          "https://juniorpro-001-site1.ntempurl.com/api/User/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  console.log(profile, "profile");

  const getDashboardPath = () => {
    if (!profile) return "/";
    if (profile.userType === 1) return "/admin/dashboard";
    if (profile.userType === 2) return "/junior/dashboard";
    if (profile.userType === 3) return "/contributor/dashboard";
    if (profile.userType === 4) return "/project/manager/dashboard";
    return "/";
  };

  const navItems = [
    // { label: "Home", href: "/" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Projects", href: "#projects" },
    { label: "Why choose us", href: "#trusted-orgs" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-4 shadow-sm ">
      {/* Logo on the left */}
      <div>
        <Link href="/">
          <Logo />
        </Link>
      </div>

      {/* Center Nav Items */}
      <ul className="hidden md:flex gap-8">
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

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Link
            href={getDashboardPath()}
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
