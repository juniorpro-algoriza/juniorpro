import Link from "next/link";
import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Trash2 } from "lucide-react";
import GraduationImage from "@public/images/graduation.png";
import LightningImage from "@public/images/lightning-icon.png";
import DiamondImage from "@public/images/diamond-icon-2.png";
import { cx } from "@lib";
import { toast } from "sonner";
import { useDeleteLearningPath } from "../../(pages)/(loged-in)/admin/tanstack";
import { useJoinLearningPath } from "../../(pages)/(loged-in)/junior/tanstack/paths/useJuniorsPaths";
import { ProjectCard } from "./ProjectCard";
import { PATH_STATUS } from "../../configs";

export const PathCard = ({
  path,
  userType,
  cardClassName,
  hasJoinButton,
  cardLink,
}: {
  path: {
    id: number;
    image: string;
    title: string;
    description: string;
    missions: number;
    xp: number;
    points: number;
    progress?: number;
    status?: number;
  };
  userType: "junior" | "admin" | "project/manager" | "contributor";
  cardClassName?: string;
  hasJoinButton?: boolean;
  cardLink?: string;
}) => {
  const router = useRouter();
  const deleteMutation = useDeleteLearningPath();
  const joinMutation = useJoinLearningPath();

  const isDeleting = deleteMutation.isPending;
  const isJoining = joinMutation.isPending;

  const handleJoin = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent navigation
      e.stopPropagation();

      if (!path.id) return;

      try {
        await joinMutation.mutateAsync({ id: path.id });
        toast.success("Successfully joined the learning path!");
      } catch (error) {
        console.error("Failed to join path:", error);
        toast.error("Failed to join learning path");
      }
    },
    [path.id, joinMutation]
  );

  const handleDelete = useCallback(async () => {
    if (!path.id) return;

    try {
      await deleteMutation.mutateAsync({ id: path.id });
      toast.success("Path deleted successfully");
    } catch (error: unknown) {
      console.error("Failed to delete path:", error);

      try {
        // Parse the serialized error
        const errorData = JSON.parse((error as Error).message);

        if (errorData.errorMessage === "JuniorsJoinedLearningPath") {
          toast.error(
            "Cannot delete path: juniors are currently enrolled in this path"
          );
        } else {
          toast.error(errorData.errorMessage || "Failed to delete path");
        }
      } catch {
        // If parsing fails, show generic error
        toast.error("Failed to delete path");
      }
    }
  }, [path.id, deleteMutation]);

  const buttonText = hasJoinButton
    ? isJoining
      ? "Joining..."
      : "Join Path"
    : userType === "admin"
      ? "View Path"
      : undefined;

  const handleViewPath = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (cardLink) router.push(cardLink);
    },
    [cardLink, router]
  );

  const titleBadge =
    userType === "admin" ? (
      <div className="ml-auto flex items-center gap-2">
        {path.status === PATH_STATUS.Draft ? (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
            Draft
          </span>
        ) : (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
            Completed
          </span>
        )}
        {/*
          Previous menu version kept for reference:

          <Menu>
            <MenuButton>
              <EllipsisVertical />
            </MenuButton>
            <MenuItems>
              <MenuItem>
                <button type="button" onClick={handleDelete}>
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        */}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleDelete();
          }}
          disabled={isDeleting}
          className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors hover:bg-red-100 disabled:cursor-wait disabled:opacity-80"
          aria-label="Delete path"
        >
          {isDeleting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </button>
      </div>
    ) : path.progress !== undefined ? (
      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
        Joined
      </span>
    ) : undefined;

  const cardContent = (
    <ProjectCard
      title={path.title}
      description={path.description}
      progress={path.progress}
      membersCurrent={path.missions}
      membersTotal={path.missions}
      dateEnd=""
      iconSrc={path.image}
      type="path"
      rewards={<XpAndPoints xp={path.xp} points={path.points} />}
      buttonText={buttonText}
      buttonIntent={hasJoinButton ? "main2" : "main"}
      buttonIcon={<ArrowRight className="size-4" />}
      buttonIconPosition="right"
      buttonOnClick={
        hasJoinButton
          ? handleJoin
          : userType === "admin"
            ? handleViewPath
            : undefined
      }
      buttonDisabled={hasJoinButton && (isJoining || path.missions === 0)}
      buttonLoading={hasJoinButton && isJoining}
      titleBadge={titleBadge}
      className={cardClassName}
    />
  );

  return (
    <div
      key={path.id}
      className={cx("relative h-full", !hasJoinButton && "my-current-path")}
    >
      {userType === "admin" ? (
        cardContent
      ) : (
        <Link href={cardLink || "#"} className="block h-full">
          {cardContent}
        </Link>
      )}
    </div>
  );
};
export const XpAndPoints = ({ xp, points }: { xp: number; points: number }) => {
  return (
    <>
      <div className="flex items-center gap-2 text-gray-500">
        <Image
          src={GraduationImage}
          alt="Certificate"
          width={24}
          height={24}
          className="size-6 object-contain"
        />
        <span>Certificate</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <Image
          src={LightningImage}
          alt="XP"
          width={24}
          height={24}
          className="size-6 object-contain"
        />
        <span>{xp} XP</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <Image
          src={DiamondImage}
          alt="Points"
          width={24}
          height={24}
          className="size-6 object-contain"
        />
        <span>{points} Points</span>
      </div>
    </>
  );
};
