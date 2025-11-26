"use client";

import { useSidebar } from "@atoms";
import { userAtom } from "@atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import BellImage from "@public/images/bell.png"
import { cx } from "@lib";

export const DashboardHeader = () => {
  const [{ firstName, lastName }] = useAtom(userAtom);
  const { isOpen } = useSidebar();
  return (
    <div>
      <div className="flex items-center justify-between w-full pb-6 border-b border-border-secondary">
        <div>
          <h1
            className={cx("lg:text-[32px] text-[24px] font-bold text-yankees-blue mt-2", !isOpen && "pl-12")}
          >
            Welcome Back , {firstName} {lastName}!
          </h1>
          <p className={cx("text-gray-600 font-medium text-base lg:text-lg", !isOpen && "pl-12")}>
            Ready to level up your coding skills today?
          </p>
        </div>
        <Image src={BellImage} alt={"Notification"} width={48} height={48} className="cursor-pointer hover:scale-110 transition-all max-md:w-9" />
      </div>
    </div>
  );
};
