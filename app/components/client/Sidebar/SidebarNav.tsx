"use client";

import { useSidebar } from "@atoms";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "../../../(pages)/auth/server";
import { useTransition, ComponentType, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useQueryClient } from "@tanstack/react-query";
import HomeImage from "@public/images/home-icon.png";
import MyJourneyImage from "@public/images/map-icon.png";
import CollaborationImage from "@public/images/hand-shake-icon.png";
import ChallengesImage from "@public/images/trophy-icon.png";
// import AchievementsImage from "@public/images/medal-icon.png";
import JuniorsImage from "@public/images/juniors.png";
import SubscriptionImage from "@public/images/subscription-icon-3d.png";
import LogoutImage from "@public/images/logout-icon-3d.png";
import HelpImage from "@public/images/help.png";
import { Skeleton } from "../../Skeleton";
import { ModalLink } from "../../ModalLink";

interface MenuItem {
  href: string;
  icon?: ComponentType;
  label: string;
  image?: string;
}

const adminMenuItems: MenuItem[] = [
  // { href: "/admin/dashboard", image: HomeImage.src, label: "Dashboard" },
  {
    href: "/admin/paths",
    image: MyJourneyImage.src,
    label: "Learning Paths",
  },
  {
    href: "/admin/challenges",
    image: ChallengesImage.src,
    label: "Challenges",
  },
  {
    href: "/admin/collaborations",
    image: CollaborationImage.src,
    label: "Collaborations",
  },

  // {
  //   href: "/admin/challenges",
  //   image: Collaboration.src,
  //   label: "Challenges",
  // },
  // {
  //   href: "/admin/achievements",
  //   image: AchievementsImage.src,
  //   label: "Achievements",
  // },
  // {
  //   href: "/admin/points-shop",
  //   image: PointsShopImage.src,
  //   label: "Points Shop",
  // },
  {
    href: "/admin/project-managers",
    image: JuniorsImage.src,
    label: "Project Managers",
  },
  {
    href: "/admin/subscription",
    image: SubscriptionImage.src,
    label: "Subscription",
  },

  // { href: "/admin/profile", icon: SettingsIcon, label: "My Profile" },
];

const contributorMenuItems: MenuItem[] = [
  { href: "/contributor/dashboard", image: HomeImage.src, label: "Dashboard" },
  // {
  //   href: "/contributor/paths",
  //   image: MyJourneyImage.src,
  //   label: "Learning Paths",
  // },
  // {
  //   href: "/contributor/collaboration",
  //   image: CollaborationImage.src,
  //   label: "Collaboration",
  // },
  // {
  //   href: "/contributor/challenges",
  //   image: ChallengesImage.src,
  //   label: "Challenges",
  // },
  // {
  //   href: "/contributor/points-shop",
  //   image: PointsShopImage.src,
  //   label: "Points Shop",
  // },
  {
    href: "/contributor/juniors",
    image: JuniorsImage.src,
    label: "Juniors",
  },
  {
    href: "/contributor/subscription",
    image: SubscriptionImage.src,
    label: "Subscription",
  },

  // { href: "/contributor/profile", icon: SettingsIcon, label: "My Profile" },
];

const juniorMenuItems: MenuItem[] = [
  { href: "/junior/dashboard", image: HomeImage.src, label: "Dashboard" },
  {
    href: "/junior/paths",
    image: MyJourneyImage.src,
    label: "Learning Paths",
  },
  {
    href: "/junior/collaborations",
    image: CollaborationImage.src,
    label: "Collaborations",
  },
  // {
  //   href: "/junior/challenges",
  //   image: ChallengesImage.src,
  //   label: "Challenges",
  // },
  // {
  //   href: "/junior/achievements",
  //   image: AchievementsImage.src,
  //   label: "Achievements",
  // },
  // {
  //   href: "/junior/points-shop",
  //   image: PointsShopImage.src,
  //   label: "Points Shop",
  // },
  // { href: "/junior/projects", icon: DocumentIcon, label: "Projects" },
  // { href: "/junior/chat", icon: ChatIcon, label: "Chat" },
  // { href: "/junior/schedule", icon: CalendarIcon, label: "Schedule" },
  // { href: "/junior/profile", icon: SettingsIcon, label: "My Profile" },
];

const projectManagerMenuItems: MenuItem[] = [
  {
    href: "/project-manager/paths",
    image: MyJourneyImage.src,
    label: "Learning Paths",
  },
  {
    href: "/project-manager/challenges",
    image: ChallengesImage.src,
    label: "Challenges",
  },
  {
    href: "/project-manager/collaborations",
    image: CollaborationImage.src,
    label: "Collaborations",
  },
];

export const SidebarNav = () => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    // Clear all queries from cache
    queryClient.clear();

    startTransition(() => {
      signOut();
    });
  };

  const pathname = usePathname();
  const { isMobile, toggleSidebar } = useSidebar();
  const [userRole, setUserRole] = useState<string>("guest");

  useEffect(() => {
    // Priority 1: Check cookie for authenticated user type
    const userType = Cookies.get("user_type");

    if (userType) {
      switch (userType) {
        case "1":
          setUserRole("admin");
          return;
        case "2":
          setUserRole("junior");
          return;
        case "3":
          setUserRole("contributor");
          return;
        case "4":
          setUserRole("projectManager");
          return;
      }
    }

    // Priority 2: Fallback to pathname sniffing (useful for development/testing or if cookie is missing)
    if (pathname.startsWith("/admin")) {
      setUserRole("admin");
    } else if (pathname.startsWith("/contributor")) {
      setUserRole("contributor");
    } else if (pathname.startsWith("/junior")) {
      setUserRole("junior");
    } else if (pathname.startsWith("/project/manager")) {
      setUserRole("projectManager");
    } else {
      setUserRole("guest");
    }
  }, [pathname]);

  const menuItems =
    userRole === "admin"
      ? adminMenuItems
      : userRole === "contributor"
        ? contributorMenuItems
        : userRole === "junior"
          ? juniorMenuItems
          : userRole === "projectManager"
            ? projectManagerMenuItems
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
        {menuItems.length === 0 &&
          [...Array(7)].map((_, index) => (
            <li key={index}>
              <Skeleton className="h-12 rounded-xl" />
            </li>
          ))}
      </ul>
      {/* {userRole === "junior" && (
        <Tip
          title="Daily Tip"
          description="Practice daily, even if just for 10 minutes. Consistency wins!"
          image={StarSingleImage.src}
        />
      )} */}
      <div className="py-2 border-t border-border-secondary">
        {userRole === "junior" && (
          <ModalLink name="WelcomePopup">
            <div className="flex items-center space-x-3 px-2 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 w-full cursor-pointer">
              <Image
                src={HelpImage.src}
                alt="help"
                width={200}
                height={200}
                className="w-6 h-auto"
              />{" "}
              <span className="truncate">Help !</span>
            </div>
          </ModalLink>
        )}

        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex items-center space-x-3 px-2 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 w-full cursor-pointer"
        >
          <Image
            src={LogoutImage.src}
            alt="Logout"
            width={28}
            height={28}
            className="w-6 h-auto"
          />
          <span className="truncate">
            {isPending ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </nav>
  );
};
