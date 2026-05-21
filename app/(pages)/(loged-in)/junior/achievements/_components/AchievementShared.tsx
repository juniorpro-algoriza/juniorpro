import { MainCard, Skeleton } from "@components";
import { cx } from "@lib";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

// Premium custom level shield SVGs
export const BlueShieldIcon = ({ num }: { num: number }) => (
  <svg className="h-full w-full drop-shadow-md" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    <path
      d="M32 4L10 12C10 28 18 46 32 56C46 46 54 28 54 12L32 4Z"
      fill="url(#shieldGrad)"
      stroke="#FFFFFF"
      strokeWidth="2.5"
    />
    <path
      d="M32 8L14 14.5C14 26.5 20.5 41.5 32 49"
      stroke="#93C5FD"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    <text
      x="50%"
      y="58%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="20"
      fontWeight="900"
      fontFamily="sans-serif"
    >
      {num}
    </text>
  </svg>
);

export const GreyShieldIcon = ({ num }: { num: number }) => (
  <svg
    className="h-full w-full opacity-90 drop-shadow-sm"
    viewBox="0 0 64 64"
    fill="none"
  >
    <defs>
      <linearGradient id="lockedShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C7CBD3" />
        <stop offset="100%" stopColor="#69717D" />
      </linearGradient>
    </defs>
    <path
      d="M32 4L10 12C10 28 18 46 32 56C46 46 54 28 54 12L32 4Z"
      fill="url(#lockedShieldGrad)"
      stroke="#D1D5DB"
      strokeWidth="2.5"
    />
    <path
      d="M32 8L14 14.5C14 26.5 20.5 41.5 32 49"
      stroke="#F8FAFC"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.45"
    />
    <text
      x="50%"
      y="58%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize="20"
      fontWeight="900"
      fontFamily="sans-serif"
      stroke="#5F6670"
      strokeWidth="1"
      paintOrder="stroke"
    >
      {num}
    </text>
  </svg>
);

export const Section = ({
  title,
  end,
  children,
  className,
}: {
  title: string;
  end?: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <MainCard
    classname={cx("sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)]", className)}
  >
    <div className="mb-5 flex items-center justify-between gap-3">
      <h2 className="text-base font-bold text-yankees-blue sm:text-lg">
        {title}
      </h2>
      {end}
    </div>
    {children}
  </MainCard>
);

export const EmptyState = ({
  image,
  title,
  description,
  action,
}: {
  image: StaticImageData;
  title: string;
  description: string;
  action?: ReactNode;
}) => (
  <div className="flex min-h-[220px] flex-col items-center justify-center px-4  text-center bg-white rounded-2xl">
    <Image
      src={image}
      alt=""
      width={160}
      height={130}
      className="mb-4 h-38 w-auto object-contain"
    />
    <p className="text-lg font-bold text-yankees-blue">{title}</p>
    <p className="mt-2 max-w-md text-sm font-medium text-semi-blue leading-relaxed">
      {description}
    </p>
    {action}
  </div>
);

export const LoadingRows = ({ rows = 3 }: { rows?: number }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: rows }).map((_, index) => (
      <Skeleton key={index} className="h-28 rounded-2xl" />
    ))}
  </div>
);

export const ProgressPill = ({ progress }: { progress: number }) => (
  <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
    <div
      className="h-full rounded-full bg-violet-normal transition-all duration-500"
      style={{ width: `${progress}%` }}
    />
  </div>
);
