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
  showLevel?: boolean;
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
  showAge = false,
  showLevel = true,
  showRating = false,
}: ProjectCardProps) => {
  const router = useRouter();
  const {
    id,
    category,
    description,
    imageUrl,
    projectType,
    status,
    ageRange,
    level,
    rating,
  } = project as NormalizedProject & { status: string };

  const statusVariant = (status: string): "gray" | "green" | "orange" => {
    if (status === "Draft") return "gray";
    if (status === "Published") return "green";
    return "orange";
  };

  /** Variant color for project level */
  const levelVariant = (level: string): "blue" | "orange" | "red" | "gray" => {
    const lower = level?.toLowerCase();
    if (lower?.includes("junior")) return "blue";
    if (lower?.includes("mid") || lower?.includes("intermediate"))
      return "orange";
    if (lower?.includes("senior")) return "red";
    return "gray";
  };

  const handleClick = () => {
    router.push(`/projectDetails/${id}`);
  };

  return (
    <div
      data-id={id}
      className={`cursor-pointer bg-white rounded-2xl shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-border-primary overflow-hidden flex flex-col ${className}`}
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
        <Image
          className="object-cover w-full h-full"
          src={
            imageUrl?.startsWith("http")
              ? imageUrl
              : imageUrl
                ? `/${imageUrl.replace(/^\/+/, "")}`
                : "/images/featured-Project-image.svg"
          }
          width={500}
          height={500}
          alt="project image"
        />

        {category && (
          <span className="absolute top-2 left-2 px-3 py-1 text-xs font-medium rounded-full bg-violet-50 text-violet-normal">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating Section - Fixed Height Container */}
        <div className="mb-3 flex items-center">
          {showRating && (
            <div
              className="flex items-center gap-1"
              role="img"
              aria-label={`Rating: ${rating || 0} out of 5 stars`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={star <= (rating || 0) ? "#FBBF24" : "#E5E7EB"}
                  className="w-5 h-5"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.176 3.624a1 1 0 00.95.69h3.805c.969 0 1.371 1.24.588 1.81l-3.077 2.236a1 1 0 00-.364 1.118l1.176 3.624c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.665 2.7c-.785.57-1.84-.197-1.54-1.118l1.176-3.624a1 1 0 00-.364-1.118L2.53 9.05c-.783-.57-.38-1.81.588-1.81h3.805a1 1 0 00.95-.69l1.176-3.624z" />
                </svg>
              ))}
              <span className="text-sm text-gray-600 ml-1">
                ({rating?.toFixed(1) || "0.0"})
              </span>
            </div>
          )}
        </div>

        {/* Title and Description */}
        <div className="mb-3">
          <h4 className="text-lg font-semibold text-yankees-blue mb-2 line-clamp-1">
            {project.title}
          </h4>
          {showDescription && description && (
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Badges */}
        <div className=" mb-4 flex items-start">
          <div className="flex flex-wrap gap-2">
            {showStatus && (
              <Badge
                label={status}
                variant={statusVariant(status)}
                className="px-3 py-1 text-xs"
              />
            )}
            {showLevel && level && (
              <Badge
                label={level}
                variant={levelVariant(level)}
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
                className="px-3 py-1 text-xs"
              />
            )}
          </div>
        </div>

        {/* View Button - Always at Bottom */}
        <Button
          onClick={handleClick}
          intent="tertiary"
          className="w-full py-2 mt-auto text-sm font-medium flex items-center justify-center gap-2"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
