"use client";

import { useSidebar } from "@atoms";
import SkyImage from "@public/images/achievements/Sky.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

export const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const { isOpen, isMobile } = useSidebar();
  const pathname = usePathname();
  const isAchievementsPage = pathname === "/junior/achievements";

  return (
    <div className="flex min-h-screen w-full max-w-full">
      <Sidebar />
      <div
        className={`
          flex-1 min-w-0 transition-all duration-300 ease-in-out
          ${isOpen && !isMobile ? "pl-85" : "pl-0"}
        `}
      >
        <div className="w-full min-w-0 max-w-none">
          <div
            className={`relative w-full min-w-0 min-h-screen p-6 space-y-6 overflow-x-hidden ${
              isAchievementsPage ? "bg-[#F7F7FE]" : "bg-[#FAFBFC]"
            }`}
          >
            {isAchievementsPage && (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[700px] overflow-hidden">
                <Image
                  src={SkyImage}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-bottom"
                />
              </div>
            )}
            <div className="relative z-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
