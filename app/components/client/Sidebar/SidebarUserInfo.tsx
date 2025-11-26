"use client";
import { userAtom } from "@atoms";
import ContributorAvatar from "@public/images/contributor-avatar.png";
import Fire from "@public/images/fire-icon.png";
import Diamond from "@public/images/diamond-icon.png";
import badge from "@public/images/badge-icon.png";

import { useAtom } from "jotai";
import Image from "next/image";
import { ArrowIncreaseIcon } from "@icons";
import {Progress} from "@components";
import { UserCard } from "@components/client";

export const SidebarUserInfo = () => {
  const [{ firstName, lastName, image, }] = useAtom(userAtom);
  return (
    <div className="p-2 space-y-4">
      <UserCard
        image={image || ContributorAvatar.src}
        firstName={firstName}
        lastName={lastName}
        level={5}
        xp={1250}
      />
      <div className="p-3 space-y-2.5 rounded-2xl [background:linear-gradient(135deg,#EEF2FF_0%,#FAF5FF_100%)]">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-[13px] font-medium">Level Progress</p>
          <p className="text-[13px] font-bold text-purple-main">84%</p>
        </div>
        <Progress width={84} />
        <div className="flex items-center space-x-2">
          <ArrowIncreaseIcon className="size-3 text-blue-main" />
          <p className="text-[13px] font-medium text-gray-600">250 XP to Level 6</p>
        </div>

      </div>
      <div className="grid grid-cols-3 gap-2 px-5 py-2">
        <div className="p-3 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-1">
          <Image src={Fire} alt="fire" width={30} height={30}/>
          <p className="font-bold">7</p>
          <p className="text-[10px] text-gray-600 font-medium text-center">Day Streak</p>
        </div>
        <div className="p-3 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-1">
          <Image src={Diamond} alt="diamond" width={30} height={30}/>
          <p className="font-bold">350</p>
          <p className="text-[10px] text-gray-600 font-medium text-center">Points</p>
        </div>
        <div className="p-3 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-1">
          <Image src={badge} alt="badge" width={30} height={30}/>
          <p className="font-bold">7</p>
          <p className="text-[10px] text-gray-600 font-medium text-center">Badges</p>
        </div>
      </div>
    </div>
  );
};
