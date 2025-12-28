"use client";

import { useSidebar } from "@atoms";
import { Button } from "@components";
import { ChevronsLeft, Menu } from "lucide-react";

export const SidebarToggleButton = () => {
  const { isOpen, isMobile, toggleSidebar } = useSidebar();

  return (
    <Button
      intent="unset"
      onClick={toggleSidebar}
      className={`
        fixed top-4 z-50 bg-white border border-bright-gray ${isOpen ? "p-1 rounded-full" : "p-2 rounded-lg"} shadow-md cursor-pointer transition-all duration-300
        ${isOpen && !isMobile ? "left-[320px]" : "left-4"}
      `}
      aria-label="Toggle sidebar"
    >
      {isOpen ? <ChevronsLeft className="w-5 h-5" /> : <Menu />}
    </Button>
  );
};
