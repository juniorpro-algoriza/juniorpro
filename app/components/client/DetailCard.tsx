import { Button, Progress } from "@components";
import { cx } from "@lib";
import Image from "next/image";
import React from "react";
import { MainCard } from "../MainCard";

interface DetailCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
  progress?: number;
  children?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  backgroundOverlay?: string;
  extraActions?: React.ReactNode;
}

export const DetailCard = ({
  title,
  description,
  icon,
  buttonText,
  buttonIcon,
  onButtonClick,
  progress,
  children,
  className,
  iconClassName,
  backgroundOverlay,
  extraActions,
}: DetailCardProps) => {
  return (
    <MainCard
      classname={cx(
        "!rounded-3xl p-5 md:p-8 border-gray-100 shadow-sm relative overflow-hidden space-y-5",
        className
      )}
    >
      {backgroundOverlay && (
        <Image
          src={backgroundOverlay}
          width={350}
          height={350}
          alt="Background Pattern"
          className="absolute -right-16 -top-16 opacity-[0.1] pointer-events-none select-none"
        />
      )}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6 ">
        <div className="flex items-start gap-4">
          <div
            className={cx(
              "size-12 md:size-16 rounded-2xl flex items-center justify-center flex-shrink-0 rotate-12",
              iconClassName ||
                "bg-gradient-to-br from-blue-main to-dark-blue-main text-white shadow-lg shadow-blue-main/20"
            )}
          >
            <div className="-rotate-12">{icon}</div>
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-black leading-tight">
              {title}
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-lg">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            intent="main"
            size="mainDefault"
            onClick={onButtonClick}
            className="shadow-sm flex-1 md:flex-none"
          >
            {buttonIcon}
            {buttonText}
          </Button>
          {extraActions}
        </div>
      </div>
      <div className="relative z-10 border-t-2 border-dashed border-gray-200"></div>
      {/* Progress Section */}
      {progress !== undefined && progress !== null && (
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Progress
            </span>
            <span className="bg-blue-main/10 border border-blue-main/20 text-blue-main text-xs font-bold px-2 py-1 rounded-xl">
              {progress}%
            </span>
          </div>
          <Progress width={progress} height="12px" />
        </div>
      )}

      {/* Children will contain the compound footer */}
      <div className="relative z-10">{children}</div>
    </MainCard>
  );
};

// Compound Components (Only for Footer)
function Footer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 md:gap-12 w-full",
        className
      )}
    >
      {children}
    </div>
  );
}
Footer.displayName = "DetailCard.Footer";
DetailCard.Footer = Footer;

function FooterItem({
  icon,
  children,
  className,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex items-center gap-2 text-gray-500 text-sm md:text-base",
        className
      )}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <span>{children}</span>
    </div>
  );
}
FooterItem.displayName = "DetailCard.FooterItem";
DetailCard.FooterItem = FooterItem;
