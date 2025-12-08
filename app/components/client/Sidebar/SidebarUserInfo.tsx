"use client";
import { userAtom } from "@atoms";

import { UserCard } from "@components/client";
import { useAtom } from "jotai";

export const SidebarUserInfo = () => {
  const [{ firstName, lastName, image, userType }] = useAtom(userAtom);
  return (
    <div className="p-2">
      <UserCard
        image={image}
        firstName={firstName}
        lastName={lastName}
        level={5}
        xp={1250}
        userType={userType}
        userDetails={{
          levelProgress: 50,
          points: 1250,
          badges: 2,
          dayStreak: 7,
        }}
      />
    </div>
  );
};
