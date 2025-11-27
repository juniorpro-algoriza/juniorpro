"use client";

import { userAtom } from "@atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import BellImage from "@public/images/bell.png";
import { Header } from "@components/client";

export const DashboardHeader = () => {
  const [{ firstName, lastName }] = useAtom(userAtom);
  return (
    <div>
      <div className="flex items-center justify-between w-full pb-6 border-b border-border-secondary">
        <Header
          title={`Welcome Back , ${firstName} ${lastName}!`}
          description="Ready to level up your coding skills today?"
        />
        <Image
          src={BellImage}
          alt={"Notification"}
          width={48}
          height={48}
          className="cursor-pointer hover:scale-110 transition-all max-md:w-9"
        />
      </div>
    </div>
  );
};
