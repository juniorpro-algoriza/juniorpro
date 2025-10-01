"use client";

import { useState } from "react";
import { Button, Badge } from "@components";
import { Check } from "lucide-react";
import { ProjectType } from "@types";
import { NormalizedProject } from "../types/Projects";
import { getData } from "@server";
import { toast } from "sonner";
import Image from "next/image";
interface ProjectCardProps {
  project: NormalizedProject;
  className?: string;
  buttonText?: string;
  showDescription?: boolean;
  showLastUpdated?: boolean;
  showAge?: boolean;
  showBadge?: boolean;
  showDueDate?: boolean;
  showJuniors?: boolean;
  showBadgeNextToDueDate?: boolean;
  showStatus?: boolean;
  showRating?: boolean;
  showProjectType?: boolean;
  onJoinSuccess?: (projectId: number) => void;
}

// Type-safe map for projectType -> Badge variant
const projectColorMap: Record<ProjectType, "blue" | "red" | "green"> = {
  Team: "blue",
  "Premium Solo": "red",
  "Free Solo": "green",
};

export const ProjectCard = ({
  project,
  className = "",
  buttonText = "View Project",
  showDescription = true,
  // showLastUpdated = true,
  showAge = true,
  showStatus = false,
  showProjectType = false,
  // showDueDate = false,
  // showJuniors = false,
  // showBadgeNextToDueDate = false,
  // showRating = false,
  onJoinSuccess,
}: ProjectCardProps) => {
  const { id, category, description, imageUrl, projectType, status, ageRange } =
    project as NormalizedProject & { status: string };

  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  const statusVariant = (status: string): "gray" | "green" | "orange" => {
    if (status === "Draft") return "gray";
    if (status === "Published") return "green";
    return "orange";
  };

  const handleJoinProject = async () => {
    if (joined) return;

    setIsJoining(true);
    try {
      await getData({
        url: "projectjunior/join",
        method: "POST",
        params: { projectId: id },
      });

      toast.success("Successfully joined the project!");
      setJoined(true);
      onJoinSuccess?.(Number(id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
          <Image
            src={
              String(imageUrl).startsWith("/")
                ? imageUrl
                : "/images/featued-Project-image.svg"
            }
            width={500}
            height={500}
            alt="project image"
            className="object-cover w-full h-full"
            style={{ objectFit: "cover" }}
            unoptimized={false}
            priority
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
          <h4 className="text-lg font-semibold text-yankees-blue mb-1">
            {project.title}
          </h4>
          {showDescription && description && (
            <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          )}
        </div>

        {/* Badges */}
        <div className="flex gap-2 pb-3 overflow-hidden whitespace-nowrap">
          {showStatus && (
            <Badge
              label={status}
              variant={statusVariant(status)}
              className="px-3 py-1 text-xs overflow-hidden text-ellipsis whitespace-nowrap"
            />
          )}
          {showProjectType && (
            <Badge
              label={projectType}
              variant={projectColorMap[projectType]}
              className="px-3 py-1 text-xs"
            />
          )}

          {showAge && (
            <Badge
              label={`Age: ${ageRange}`}
              variant="blue"
              className="px-3 py-1 text-xs overflow-hidden text-ellipsis whitespace-nowrap"
            />
          )}
        </div>

        {/* CTA */}
        <Button
          intent={joined ? "primary" : "tertiary"}
          className="w-full py-2 mt-auto text-sm font-medium flex items-center justify-center gap-2"
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
