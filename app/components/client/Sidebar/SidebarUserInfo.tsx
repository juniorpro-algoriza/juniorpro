"use client";
import { userAtom } from "@atoms";

import { UserCard } from "@components/client";
import { useAtom } from "jotai";
import { USER_TYPE } from "../../../configs/constants";

export const SidebarUserInfo = () => {
  const [user] = useAtom(userAtom);
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const image = user?.image || null;
  const userType = user?.userType || 0;
  return (
    <div className="p-2">
      <UserCard
        image={image}
        firstName={firstName}
        lastName={lastName}
        level={5}
        xp={1250}
        userType={userType}
        {...(userType === USER_TYPE.Junior && {
          levelId: "level-progress-section",
          dayStreakId: "day-streak",
          pointsId: "points",
          badgesId: "badges",
          xpTextId: "xp-text",
          userDetails: {
            levelProgress: 50,
            points: 1250,
            dayStreak: 7,
            badges: 12,
          },
        })}
      />
    </div>
  );
};
