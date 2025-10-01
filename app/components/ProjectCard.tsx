/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Button, Badge } from "@components";
import { CalendarDaysIcon, Check } from "lucide-react";
import { NormalizedProject } from "../types/Projects";
import { getData } from "@server";
import { toast } from "sonner";

interface ProjectCardProps {
  project: NormalizedProject;
  className?: string;
  buttonText?: string;
  showDescription?: boolean;
  showLastUpdated?: boolean;
  showBadge?: boolean;
  showJuniors?: boolean;
  showDueDate?: boolean;
  showBadgeNextToDueDate?: boolean;
  showRating?: boolean;
  onJoinSuccess?: (projectId: number) => void;
}

export const ProjectCard = ({
  project,
  className = "",
  buttonText = "",
  showDescription = true,
  showLastUpdated = true,
  onJoinSuccess,
}: ProjectCardProps) => {
  const { id, category, description, imageUrl, projectType, status, modificationDate, ageRange, isJoined } =
    project;

  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(isJoined || false);

  const statusVariant =
    status === "Draft" ? "gray" : status === "Published" ? "green" : "orange";

  const handleJoinProject = async () => {
    if (joined) return; // Prevent joining if already joined

    setIsJoining(true);
    try {
      await getData({
        url: "projectjunior/join",
        method: "POST",
        params: { projectId: id },
      });

      toast.success("Successfully joined the project!");
      setJoined(true);
      onJoinSuccess?.(id);
    } catch (error: any) {
      console.error("Error joining project:", error);
      toast.error(error.message || "Failed to join project");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div
      data-id={id}
      className={`bg-white rounded-2xl shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-border-primary overflow-hidden ${className}`}
    >
      {/* Image */}
      <div className="relative w-full h-48">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="project image"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400">
            No Image Added
          </div>
        )}

        {category && (
          <span className="absolute top-2 left-2 px-3 py-1 text-xs font-medium rounded-full bg-violet-50 text-violet-normal">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between">
        {/* Title & Description */}
        <div className="mb-3">
          <h4 className="text-lg font-semibold text-yankees-blue mb-1">{project.title}</h4>
          {showDescription && description && (
            <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          )}
        </div>

        {/* BADGES */}
        <div className="flex gap-2 pb-3 overflow-hidden whitespace-nowrap">
          <Badge
            label={status}
            variant={statusVariant}
            className="px-3 py-1 text-xs overflow-hidden text-ellipsis whitespace-nowrap"
          />
          {/* till it returns from backend */}
          {/* <Badge
            label={projectType}
            variant="purple"
            className="px-3 py-1 text-xs overflow-hidden text-ellipsis whitespace-nowrap"
          /> */}
          <Badge
            label={`Age: ${ageRange}`}
            variant="blue"
            className="px-3 py-1 text-xs overflow-hidden text-ellipsis whitespace-nowrap"
          />
        </div>

        {/* Metadata */}
        {/* {showLastUpdated && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>
              Last Updated: {modificationDate ? new Date(modificationDate).toLocaleDateString() : "N/A"}
            </span>
          </div>
        )} */}

        {/* CTA */}
        <Button
          intent={joined ? "primary" : "tertiary"}
          className="w-full py-2 mt-4 text-sm font-medium flex items-center justify-center gap-2"
          onClick={handleJoinProject}
          disabled={isJoining || joined}
        >
          {isJoining ? (
            "Joining..."
          ) : joined ? (
            <>
              Joined
              <Check className="w-4 h-4" />
            </>
          ) : (
            buttonText
          )}
        </Button>
      </div>
    </div>
  );
};