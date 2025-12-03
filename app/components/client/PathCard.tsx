import Link from "next/link";
import React from "react";
import { MainCard } from "../MainCard";
import Image from "next/image";
import { Target } from "lucide-react";

export const PathCard = ({
  path,
  userType,
}: {
  path: {
    id: number;
    image: string;
    title: string;
    description: string;
    includes: Record<string, number>;
  };
  userType: "junior" | "admin" | "project/manager" | "contributor";
}) => {
  return (
    <div key={path.id}>
      <Link href={`/${userType}/paths/${path.id}`}>
        <MainCard classname="  lg:space-y-4 space-y-2">
          <Image
            src={path.image}
            alt="Current path Image"
            width={40}
            height={40}
          />
          <h3 className=" font-bold">{path.title}</h3>
          <p className="text-gray-600 text-sm">{path.description}</p>
          <div className="flex items-center gap-3 flex-wrap">
            {Object.entries(path.includes).map(([key, value], index) => (
              <div
                key={index}
                className="px-3 py-1 bg-gray-50 rounded-full flex items-center gap-2 text-gray-600"
              >
                <Target className="size-4" />
                <p className="text-13">
                  {value} <span className=" capitalize">{key}</span>
                </p>
              </div>
            ))}
          </div>
        </MainCard>
      </Link>
    </div>
  );
};
