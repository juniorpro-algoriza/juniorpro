import { cx } from "@lib";
import Image from "next/image";
import React from "react";

export const Tip = ({
  title,
  description,
  image,
  className,
  isOneLiner = false,
  imageClassname
}: {
  title: string;
  description: string;
  image: string;
  className?: string;
  isOneLiner?: boolean;
  imageClassname?:string
}) => {
  return !isOneLiner ? (
    <div
      className={cx(
        "border border-[#C6D2FF] bg-[#EEF2FF] rounded-2xl p-3 my-7 flex items-start gap-3",
        className
      )}
    >
      <Image
        src={image}
        alt="Tip Icon"
        width={100}
        height={100}
        className={cx("w-10 h-auto",imageClassname)}
      />
      <div className="space-y-1">
        <p className="font-bold text-sm">{title}</p>
        <p className="font-medium text-sm text-gray-600">{description}</p>
      </div>
    </div>
  ) : (
    <div
      className={cx(
        "border border-[#C6D2FF] bg-[#EEF2FF] rounded-2xl p-3 my-7 flex items-center gap-2 flex-wrap",
        className
      )}
    >
      <Image
        src={image}
        alt="Tip Icon"
        width={100}
        height={100}
        className={cx("w-6 h-auto",imageClassname)}
      />
      <p className="font-bold text-sm">{title}</p>
      <p className="font-medium text-sm text-gray-600">{description}</p>
    </div>
  );
};
