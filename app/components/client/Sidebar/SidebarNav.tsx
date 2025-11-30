"use client";

import { useSidebar } from "@atoms";
import {
  // ChatIcon,
  DiamondIcon,
  DocumentIcon,
  FolderDetailsIcon,
  HomeIcon,
  LogoutIcon,
  UserIcon,
  UserManagerIcon,
  UsersIcon,
} from "@icons";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "../../../(pages)/auth/server";
import { useTransition, ComponentType } from "react";
import HomeImage from "@public/images/home-icon.png";
import MyJourneyImage from "@public/images/map-icon.png";
import CollaborationImage from "@public/images/hand-shake-icon.png";
import ChallengesImage from "@public/images/trophy-icon.png";
import AchievementsImage from "@public/images/medal-icon.png";
import PointsShopImage from "@public/images/shopping-bag-icon.png";
import StarSingleImage from "@public/images/star-single.png";
import { Tip } from "../Tip";

interface MenuItem {
  href: string;
  icon?: ComponentType;
  label: string;
  image?: string;
}

const adminMenuItems: MenuItem[] = [
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
  // { href: "/admin/schedule", icon: CalendarIcon, label: "Schedule" },
  // { href: "/admin/profile", icon: SettingsIcon, label: "My Profile" },
];

const contributorMenuItems: MenuItem[] = [
  { href: "/contributor/dashboard", icon: HomeIcon, label: "Dashboard" },
  { href: "/contributor/juniors", icon: UserIcon, label: "Juniors" },
  {
    href: "/contributor/projects",
    icon: DocumentIcon,

    label: "Projects",
  },
  { href: "/contributor/points", icon: DiamondIcon, label: "Points" },
  // { href: "/contributor/profile", icon: SettingsIcon, label: "My Profile" },
];

const juniorMenuItems: MenuItem[] = [
  { href: "/junior/dashboard", image: HomeImage.src, label: "Dashboard" },
  {
    href: "/junior/my-journey",
    image: MyJourneyImage.src,
    label: "My Learning Journey",
  },
  {
    href: "/junior/collaboration",
    image: CollaborationImage.src,
    label: "Collaboration",
  },
  {
    href: "/junior/challenges",
    image: ChallengesImage.src,
    label: "Challenges",
  },
  {
    href: "/junior/achievements",
    image: AchievementsImage.src,
    label: "Achievements",
  },
  {
    href: "/junior/points-shop",
    image: PointsShopImage.src,
    label: "Points Shop",
  },
  // { href: "/junior/projects", icon: DocumentIcon, label: "Projects" },
  // { href: "/junior/chat", icon: ChatIcon, label: "Chat" },
  // { href: "/junior/schedule", icon: CalendarIcon, label: "Schedule" },
  // { href: "/junior/profile", icon: SettingsIcon, label: "My Profile" },
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
    <nav className="flex-1 p-4  space-y-2">
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
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={28}
                    height={28}
                    className="w-6 h-auto"
                  />
                )}
                {Icon && <Icon />}
                <p className="truncate">{item.label}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <Tip
        title="Daily Tip"
        description="Practice daily, even if just for 10 minutes. Consistency wins!"
        image={StarSingleImage.src}
      />
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
