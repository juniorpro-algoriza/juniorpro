"use client";

import { userAtom } from "@atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import BellImage from "@public/images/bell.png";
import { Header } from "@components/client";

export const DashboardHeader = ({ description }: { description: string }) => {
  const [user] = useAtom(userAtom);
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  return (
    <Header
      title={`Welcome Back , ${firstName} ${lastName}`}
      description={description}
      startIndent
      loading={!firstName}
      end={
        <Image
          src={BellImage}
          alt={"Notification"}
          width={48}
          height={48}
          className="cursor-pointer hover:scale-110 transition-all max-md:w-9"
        />
      }
    />
  );
};
