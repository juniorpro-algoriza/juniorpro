"use client";

import { useEffect } from "react";
import { Rocket } from "lucide-react";

import { useSidebar } from "@atoms";
import { SidebarNav } from "./SidebarNav";
import { SidebarToggleButton } from "./SidebarToggleButton";
import { SidebarUserInfo } from "./SidebarUserInfo";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { isOpen, isMobile, toggleSidebar, setIsMobile } = useSidebar();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

  const closeSidebar = () => {
    if (isMobile) toggleSidebar();
  };

  return (
    <>
      <SidebarToggleButton />

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          w-85 bg-white border-r border-bright-gray fixed z-40 h-screen transition-all duration-300 ease-in-out
          ${
            isMobile
              ? isOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : isOpen
                ? "translate-x-0"
                : "-translate-x-full"
          }
          ${className}
        `}
      >
        <div className="flex flex-col h-full px-4 overflow-y-auto">
          <div className="px-4 pt-12 pb-8">
            <div className="text-xl tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-main to-[#FF8CF1] rounded-full border-2 border-black flex items-center justify-center">
                <Rocket
                  className="text-white transform -rotate-45 w-4 h-4"
                  fill="white"
                />
              </div>
              <span className="font-black">SAWIHA</span>
            </div>
          </div>
          <SidebarUserInfo />
          <SidebarNav />
        </div>
      </aside>
    </>
  );
};
