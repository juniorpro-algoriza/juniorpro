"use client";

import { userAtom } from "@atoms";
import { useAtom } from "jotai";
import Image from "next/image";
import BellImage from "@public/images/bell.png";
import { Header } from "@components/client";

export const DashboardHeader = ({ description }: { description: string }) => {
  const [{ firstName, lastName }] = useAtom(userAtom);
  return (
    <Header
      title={`Welcome Back , ${firstName} ${lastName}!`}
      description={description}
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
