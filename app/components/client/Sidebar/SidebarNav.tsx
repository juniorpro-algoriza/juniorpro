"use client";

import { useSidebar } from "@atoms";
import {
  CalendarIcon,
  ChatIcon,
  DiamondIcon,
  DocumentIcon,
  FolderDetailsIcon,
  HomeIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
  UserManagerIcon,
  UsersIcon,
} from "@icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "../../../(pages)/auth/server";
import { useTransition } from "react";

const adminMenuItems = [
  { href: "/admin/dashboard", icon: HomeIcon, label: "Dashboard" },
  { href: "/admin/junior", icon: UserIcon, label: "Juniors" },
  {
    href: "/admin/contributor",
    icon: UsersIcon,
    label: "Contributors",
  },
  {
    href: "/admin/project-manager",
    icon: UserManagerIcon,
    label: "Project Managers",
  },
  { href: "/admin/projects", icon: FolderDetailsIcon, label: "Projects" },
  { href: "/admin/schedule", icon: CalendarIcon, label: "Schedule" },
  { href: "/admin/profile", icon: SettingsIcon, label: "My Profile" },
];

const contributorMenuItems = [
  { href: "/contributor/dashboard", icon: HomeIcon, label: "Dashboard" },
  { href: "/contributor/juniors", icon: UserIcon, label: "Juniors" },
  {
    href: "/contributor/projects/?junior=anas",
    icon: DocumentIcon,

    label: "Projects",
  },
  { href: "/contributor/points", icon: DiamondIcon, label: "Points" },
  { href: "/contributor/profile", icon: SettingsIcon, label: "My Profile" },
];

const juniorMenuItems = [
  { href: "/junior/dashboard", icon: HomeIcon, label: "Dashboard" },
  { href: "/junior/chat", icon: ChatIcon, label: "Chat" },
  { href: "/junior/schedule", icon: CalendarIcon, label: "Schedule" },
  { href: "/junior/profile", icon: SettingsIcon, label: "My Profile" },
];

export const SidebarNav = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      signOut();
    });
  };

  const pathname = usePathname();
  const { isMobile, toggleSidebar } = useSidebar();

  let userRole: string;

  switch (true) {
    case pathname.startsWith("/admin"):
      userRole = "admin";
      break;
    case pathname.startsWith("/contributor"):
      userRole = "contributor";
      break;
    case pathname.startsWith("/junior"):
      userRole = "junior";
      break;
    case pathname.startsWith("/project-manager"):
      userRole = "projectManager";
      break;
    default:
      userRole = "guest";
  }

  const menuItems =
    userRole === "admin"
      ? adminMenuItems
      : userRole === "contributor"
        ? contributorMenuItems
        : userRole === "junior"
          ? juniorMenuItems
          : [];

  const isActive = (href: string) => pathname === href;

  const closeSidebar = () => {
    if (isMobile) toggleSidebar();
  };

  return (
    <nav className="flex-1 p-4 overflow-y-auto space-y-2">
      <ul className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <li key={item.href} style={{ transitionDelay: `${index * 50}ms` }}>
              <Link
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex items-center space-x-3 px-2 py-3 rounded-xl text-sm transition-all duration-200 
                  ${active ? "bg-violet-light text-violet-normal" : "text-yankees-blue hover:bg-gray-100"}
                `}
              >
                <Icon />
                <p className="truncate">{item.label}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="py-4 border-t border-border-secondary">
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center space-x-3 px-2 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 w-full cursor-pointer"
        >
          <LogoutIcon />
          <span className="truncate">
            {isPending ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </nav>
  );
};
