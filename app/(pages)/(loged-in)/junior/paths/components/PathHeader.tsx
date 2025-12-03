import { MainCard } from "@components";
import Image from "next/image";
import React from "react";

export const PathHeader = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <MainCard classname=" sm:p-6 flex items-center sm:gap-7 gap-3 flex-wrap">
      <div className="p-3 rounded-2xl bg-[#F5F6F8B0] sm:size-16 size-14">
        <Image src={image} alt={title} width={40} height={40} />
      </div>
      <div className="sm:space-y-2 space-y-1">
        <h2 className="sm:text-2xl text-xl font-bold">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </MainCard>
  );
};
