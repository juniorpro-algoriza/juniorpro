"use client";

import { useEffect } from "react";
import logoImage from "@public/images/logo.svg";
import Image from "next/image";

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
          <div className="p-4">
            <Image
              unoptimized
              className="block transition-transform duration-200 hover:scale-105"
              src={logoImage}
              alt="Logo"
            />
          </div>
          <SidebarUserInfo />
          <SidebarNav />
        </div>
      </aside>
    </>
  );
};
