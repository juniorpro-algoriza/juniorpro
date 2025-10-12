"use client";

import { useState, useEffect } from "react";
import { Button, Badge } from "@components";
import { Check } from "lucide-react";
import { ProjectType } from "@types";
import { NormalizedProject } from "../types/Projects";
import { joinProject } from "@server";
import Cookies from "js-cookie";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

const projectColorMap: Record<ProjectType, "blue" | "red" | "green"> = {
  Team: "blue",
  "Premium Solo": "red",
  "Free Solo": "green",
};

export const ProjectCard = ({
  project,
  className = "",
  onJoinSuccess,
  showDescription = true,
  showStatus = false,
  showProjectType = false,
  showAge = true,
}: ProjectCardProps) => {
  const router = useRouter();
  const { id, category, description, imageUrl, projectType, status, ageRange, isJoined } =
    project as NormalizedProject & { status: string; isJoined?: boolean };

  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(isJoined || false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const type = Cookies.get("user_type");
    setUserType(type || null);
  }, []);

  const statusVariant = (status: string): "gray" | "green" | "orange" => {
    if (status === "Draft") return "gray";
    if (status === "Published") return "green";
    return "orange";
  };

  const handleJoinProject = async () => {
    if (joined) return;
    setIsJoining(true);

    try {
      const result = await joinProject(Number(id));

      if (result.success) {
        toast.success("Successfully joined the project!");
        setJoined(true);
        onJoinSuccess?.(Number(id));
      } else {
        toast.error(result.error || "Unable to join project");
      }
    } catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Failed to join project");
  }
}
  };

  const handleButtonClick = async () => {
    const type = Cookies.get("user_type");

    // if not logged in → redirect to login with redirect param
    if (!type) {
      toast.info("Please log in or register to continue");
      router.push(`/auth/login?redirect=/projectDetails/${id}`);
      return;
    }

    // Junior → join project
    if (type === "2") {
      await handleJoinProject();
      return;
    }

    // Any other role → view project
    router.push(`/projectDetails/${id}`);
  };

  const renderButtonText = () => {
    if (!userType) return "Join Project";

    if (userType === "2") {
      if (isJoining) return "Joining...";
      if (joined)
        return (
          <>
            Joined <Check className="w-4 h-4" />
          </>
        );
      return "Join Project";
    }

    return "View Project";
  };

  return (
    <div
      data-id={id}
      className={`bg-white rounded-2xl shadow hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-border-primary overflow-hidden ${className}`}
    >
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

      <div className="p-4 flex flex-col justify-between">
        <div className="mb-3">
          <h4 className="text-lg font-semibold text-yankees-blue mb-1">
            {project.title}
          </h4>
          {showDescription && description && (
            <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          )}
        </div>

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

        <Button
          intent={joined ? "primary" : "tertiary"}
          className="w-full py-2 mt-auto text-sm font-medium flex items-center justify-center gap-2"
          onClick={handleButtonClick}
          disabled={userType === "2" && (isJoining || joined)}
        >
          {renderButtonText()}
        </Button>
      </div>
    </div>
  );
};
