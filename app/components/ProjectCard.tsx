"use client";

import { Button, Badge } from "@components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProjectType } from "@types";
import { NormalizedProject } from "../types/Projects";

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
}

const projectColorMap: Record<ProjectType, "blue" | "red" | "green"> = {
  Team: "blue",
  "Premium Solo": "red",
  "Free Solo": "green",
};

export const ProjectCard = ({
  project,
  className = "",
  showDescription = true,
  showStatus = false,
  showProjectType = false,
  showAge = true,
}: ProjectCardProps) => {
  const router = useRouter();
  const { id, category, description, imageUrl, projectType, status, ageRange } = project as NormalizedProject & { status: string };

  const statusVariant = (status: string): "gray" | "green" | "orange" => {
    if (status === "Draft") return "gray";
    if (status === "Published") return "green";
    return "orange";
  };

  const handleClick = () => {
    router.push(`/projectDetails/${id}`);
  };

  return (
    <div
      data-id={id}
      onClick={handleClick}
      className={`cursor-pointer bg-white rounded-2xl shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-border-primary overflow-hidden ${className}`}
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
              className="px-3 py-1 text-xs"
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

        {/* View Button */}
        <Button
          intent="tertiary"
          className="w-full py-2 mt-auto text-sm font-medium flex items-center justify-center gap-2"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
