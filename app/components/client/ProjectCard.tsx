"use client";
import React from "react";
import Image from "next/image";
import { Calendar, Users, Lock } from "lucide-react";
import { Button, MainCard, Progress } from "@components";
import { cx } from "@lib";

interface ProjectCardProps {
  title: string;
  description: string;
  progress?: number;
  membersCurrent: number;
  membersTotal: number;
  dateEnd: string;
  iconSrc?: string;
  className?: string;
  levelRequired?: number;
  isLocked?: boolean;
  lockLabel?: string;
  buttonOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
  titleBadge?: React.ReactNode;
}

export const ProjectCard = ({
  title,
  description,
  progress,
  membersCurrent,
  membersTotal,
  dateEnd,
  iconSrc,
  className,
  levelRequired,
  isLocked = false,
  lockLabel,
  type = "collaboration", // "collaboration" | "challenge" | "path"
  rewards,
  skills,
  prizes,
  buttonText,
  buttonIntent = "main", // "main" | "main2"
  buttonIcon,
  buttonIconPosition = "left",
  buttonOnClick,
  buttonDisabled = false,
  buttonLoading = false,
  titleBadge,
}: ProjectCardProps & {
  type?: "collaboration" | "challenge" | "path";
  rewards?: string | React.ReactNode;
  skills?: string[];
  prizes?: { place: string; amount: string }[];
  buttonText?: string;
  buttonIntent?: "main" | "main2";
  buttonIcon?: React.ReactNode;
  buttonIconPosition?: "left" | "right";
}) => {
  if (type === "path") {
    return (
      <MainCard
        classname={cx(
          "flex h-full flex-col rounded-3xl border-blue-main/20 bg-white p-5 shadow-main transition-shadow hover:shadow-lg",
          className
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="size-12 shrink-0 rounded-2xl bg-blue-main/5 flex items-center justify-center text-blue-main">
            {iconSrc && (
              <Image
                src={iconSrc}
                width={42}
                height={42}
                alt="icon"
                className="size-9 object-contain"
              />
            )}
          </div>
          {titleBadge}
        </div>

        <div className="mb-5 min-h-[105px]">
          <h3 className="mb-2 line-clamp-2 text-xl font-extrabold leading-tight text-gray-950">
            {title}
          </h3>
          <p className="line-clamp-3 text-sm font-medium leading-6 text-gray-500">
            {description}
          </p>
        </div>

        {progress !== undefined && (
          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Progress
              </span>
              <span className="rounded-full border border-blue-main/10 bg-blue-main/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-main">
                {progress.toFixed(0)}%
              </span>
            </div>
            <Progress width={progress} />
          </div>
        )}

        {skills && skills.length > 0 && (
          <div className="border-t border-dashed border-gray-100 py-5">
            <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {rewards && (
          <div className="mt-auto border-t border-dashed border-gray-100 pt-5">
            <h4 className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
              Rewards
            </h4>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-gray-600">
              {rewards}
            </div>
          </div>
        )}

        {buttonText && (
          <Button
            intent={buttonIntent}
            size="mainDefault"
            className="mt-5 w-full justify-center"
            disabled={isLocked || buttonDisabled}
            icon={buttonIcon}
            iconPosition={buttonIconPosition}
            onClick={buttonOnClick}
            isLoading={buttonLoading}
          >
            {buttonText}
          </Button>
        )}
      </MainCard>
    );
  }

  const ctaText = buttonText ?? "View Submission";

  return (
    <MainCard
      classname={cx(
        "flex flex-col h-full border-blue-main/30 shadow-main rounded-3xl cursor-pointer hover:shadow-lg transition-shadow p-5 md:p-6",
        className
      )}
    >
      <div className="relative flex-1">
        <div
          className={cx(
            "flex flex-col h-full transition-all duration-300",
            isLocked &&
              "opacity-20 blur-[2px] select-none pointer-events-none grayscale-[0.5]"
          )}
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 relative">
              <div className="size-12 md:size-14 bg-blue-main/5 rounded-xl flex items-center justify-center text-blue-main">
                {iconSrc && (
                  <Image
                    src={iconSrc}
                    width={42}
                    height={42}
                    alt="icon"
                    className="size-8 md:size-10"
                  />
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                  {title}
                </h3>
                {titleBadge}
              </div>
              <p className="text-gray-500 text-xs md:text-sm font-medium line-clamp-2">
                {description}
              </p>
            </div>
          </div>

          {/* Progress */}
          {progress !== undefined && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Progress
                </span>
                <span className="bg-blue-main/10 border border-blue-main/20 text-blue-main text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-lg">
                  {progress?.toFixed(0)}%
                </span>
              </div>
              <Progress width={progress} />
            </div>
          )}

          {/* Meta Data Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-500 mb-6">
            {dateEnd && (
              <div className="flex items-center gap-1.5 md:gap-2">
                <Calendar size={14} className="md:size-4" />
                <span className="font-medium whitespace-nowrap">
                  Due: <span className="text-gray-900">{dateEnd}</span>
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5 md:gap-2">
              <Users size={14} className="md:size-4" />
              <span className="font-medium whitespace-nowrap">
                {type === "challenge" ? (
                  <>
                    <span className="text-gray-900">{membersCurrent}</span>{" "}
                    Participants
                  </>
                ) : (
                  <>
                    {membersTotal - membersCurrent} / {membersTotal} open roles
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200 mb-6"></div>

          {/* Dynamic Content Section */}
          <div className="flex-1 mb-6">
            {type === "collaboration" && rewards && (
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Rewards
                </h4>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900 flex-wrap">
                  {/* Placeholder for medal icon if needed, using generic dot for now or emoji */}
                  <Image
                    src="/images/1stBadge.png"
                    width={20}
                    height={20}
                    alt="Reward Badge"
                  />
                  {rewards}
                </div>
              </div>
            )}

            {type === "challenge" && prizes && (
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Top Prizes
                </h4>
                <div className="space-y-2">
                  {prizes.map((prize, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="flex items-center gap-2 text-gray-600 font-medium">
                        {/* Using generic emoji for place */}
                        {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}{" "}
                        {prize.place}
                      </span>
                      <span className="font-bold text-gray-900">
                        {prize.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Locked Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pb-6">
            <div className="size-14 bg-white rounded-[20px] shadow-lg flex items-center justify-center mb-3">
              <Lock className="size-6 text-gray-400" strokeWidth={2} />
            </div>
            <h4 className="text-gray-900 font-bold text-base mb-3">
              {lockLabel || "Collaboration Locked"}
            </h4>
            {levelRequired && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full">
                <Lock className="size-3 text-orange-500" />
                <span className="text-orange-600 text-xs font-bold">
                  Level {levelRequired} Required
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Button */}
      <div className="mt-auto">
        <Button
          intent={buttonIntent}
          size="mainDefault"
          className="w-full justify-center"
          disabled={isLocked || buttonDisabled}
          icon={buttonIcon}
          iconPosition={buttonIconPosition}
          onClick={buttonOnClick}
          isLoading={buttonLoading}
        >
          {ctaText}
        </Button>
      </div>
    </MainCard>
  );
};
