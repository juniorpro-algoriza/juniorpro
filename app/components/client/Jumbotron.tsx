"use client";
import React from "react";
import Image from "next/image";
import { cx } from "@lib";

interface JumbotronProps {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
  imageClassName?: string;
}

export const Jumbotron = ({
  title,
  description,
  imageSrc,
  className,
  imageClassName,
}: JumbotronProps) => {
  return (
    <div
      className={cx(
        "flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8",
        className
      )}
    >
      <div
        className={cx(
          "size-16 sm:size-20 bg-blue-main/5 rounded-4xl flex items-center justify-center flex-shrink-0 border border-blue-main/10 rotate-6 shadow-sm overflow-hidden",
          imageClassName
        )}
      >
        <Image
          src={imageSrc}
          width={64}
          height={64}
          alt={title}
          className="size-10 sm:size-14 object-contain -rotate-6"
          priority
        />
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-1 sm:mb-2">
          {title}
        </h1>
        <p className="text-[#64748B] text-base sm:text-lg font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
