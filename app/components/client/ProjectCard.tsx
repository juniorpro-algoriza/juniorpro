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
  type = "collaboration", // "collaboration" | "challenge" | "path"
  rewards,
  skills,
  prizes,
  buttonText = "View Submission",
  buttonIntent = "main", // "main" | "main2"
  buttonIcon,
  buttonIconPosition = "left",
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
  return (
    <MainCard
      classname={cx(
        "flex flex-col h-full border-blue-main/30 shadow-main rounded-3xl cursor-pointer hover:shadow-lg transition-shadow p-5 md:p-6",
        className
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
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight mb-1">
            {title}
          </h3>
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
              {progress}%
            </span>
          </div>
          <Progress width={progress} className="bg-gray-100" />
        </div>
      )}

      {/* Meta Data Row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-1.5 md:gap-2">
          <Calendar size={14} className="md:size-4" />
          <span className="font-medium whitespace-nowrap">
            Due: <span className="text-gray-900">{dateEnd}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <Users size={14} className="md:size-4" />
          <span className="font-medium whitespace-nowrap">
            {membersTotal - membersCurrent} / {membersTotal} open roles
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

          {/* Progress */}
          {progress && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Progress
                </span>
                <span className="bg-blue-main/10 border border-blue-main/20 text-blue-main text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-lg">
                  {progress}%
                </span>
              </div>
              <Progress width={progress} className="bg-gray-100" />
            </div>
          )}

          {/* Meta Data Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Calendar size={14} className="md:size-4" />
              <span className="font-medium whitespace-nowrap">
                Due: <span className="text-gray-900">{dateEnd}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Users size={14} className="md:size-4" />
              <span className="font-medium whitespace-nowrap">
                {membersTotal - membersCurrent} / {membersTotal} open roles
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

            {type === "path" && skills && (
              <div className="mb-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {type === "path" && rewards && (
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Rewards
                </h4>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
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
              Collaboration Locked
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
          disabled={isLocked}
          icon={buttonIcon}
          iconPosition={buttonIconPosition}
        >
          {buttonText}
        </Button>
      </div>
    </MainCard>
  );
};
