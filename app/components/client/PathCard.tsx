import Link from "next/link";
import React, { useCallback } from "react";
import { MainCard } from "../MainCard";
import Image from "next/image";
import { ArrowRight, EllipsisVertical, Target } from "lucide-react";
import LightningImage from "@public/images/lightning-icon-2.png";
import DiamondImage from "@public/images/diamond-icon-2.png";
import { Progress } from "../Progress";
import { cx } from "@lib";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { toast } from "sonner";
import { useDeleteLearningPath } from "../../(pages)/(loged-in)/admin/tanstack";
import { useJoinLearningPath } from "../../(pages)/(loged-in)/junior/tanstack/paths/useJuniorsPaths";
import { Button } from "../Button";
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
  return (
    <div
      key={path.id}
      className={cx("relative", !hasJoinButton && "my-current-path")}
    >
      {hasJoinButton && path.missions > 0 && (
        <Button
          intent="main2"
          size="mainDefault"
          onClick={handleJoin}
          disabled={isJoining}
          className="cursor-pointer absolute top-5 right-5 z-20"
        >
          {isJoining ? "Joining..." : "Join Path"}{" "}
          <ArrowRight className="size-4" />
        </Button>
      )}
      {userType === "admin" && (
        <Menu>
          <MenuButton className="cursor-pointer focus-visible:outline-0 absolute top-5 right-5 z-20">
            <EllipsisVertical className="text-gray-600 size-4" />
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="w-40 bg-white border border-gray-200 rounded-xl focus-visible:outline-0"
          >
            <MenuItem disabled={isDeleting}>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full text-sm text-left block text-red-600 data-focus:bg-red-100 py-2 px-4 disabled:opacity-60 cursor-pointer"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      )}
      <Link href={cardLink || "#"}>
        <MainCard
          classname={cx(
            "relative space-y-2 overflow-hidden cursor-pointer",
            cardClassName
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="p-1.5 bg-[#EEF2FF80] rounded-xl">
              <Image
                src={path.image}
                alt="Current path Image"
                width={60}
                height={60}
              />
            </div>
          </div>
          <h3 className="font-bold text-lg">
            {path.title}
            {userType === "admin" && (
              <>
                {path?.status == PATH_STATUS.Draft ? (
                  <span className="text-gray-600 text-xs ml-2 font-medium bg-gray-100 px-2 py-1 rounded-full">
                    Draft
                  </span>
                ) : (
                  <span className="text-green-600 text-xs ml-2 font-medium bg-green-100 px-2 py-1 rounded-full">
                    Completed
                  </span>
                )}
              </>
            )}
          </h3>
          <p className="text-gray-600">{path.description}</p>
          <hr className="border-gray-100" />
          {path.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-3">
                <p className="text-13 font-medium text-gray-600">Progress</p>
                <p className="text-dark-blue-main font-bold text-13">
                  {path.progress}%
                </p>
              </div>
              <Progress
                width={path.progress || 0}
                height="12px"
                className="[background:_linear-gradient(90deg,_#615FFF_0%,_#5DA1E8_100%)]"
              />
            </div>
          )}
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-full flex items-center gap-2 text-gray-600">
              <Target className="size-4" />
              <p className="text-13">
                <span className="font-bold">{path.missions}</span>{" "}
                <span className=" capitalize">missions</span>
              </p>
            </div>
            <XpAndPoints xp={path.xp} points={path.points} />
          </div>
        </MainCard>
      </Link>
    </div>
  );
};
export const XpAndPoints = ({ xp, points }: { xp: number; points: number }) => {
  return (
    <>
      <div className="px-3 py-1 bg-[#E17100]/8 border border-[#E17100]/20 rounded-full flex items-center gap-2 text-[#E17100]">
        <Image
          src={LightningImage}
          alt="Lightning Image"
          width={20}
          height={20}
        />
        <p className="text-13">
          +<span className="font-bold">{xp}</span>{" "}
          <span className=" capitalize">XP</span>
        </p>
      </div>
      <div className="px-3 py-1 bg-dark-blue-main/8 border border-dark-blue-main/20 rounded-full flex items-center gap-2 text-dark-blue-main">
        <Image src={DiamondImage} alt="Diamond Image" width={20} height={20} />
        <p className="text-13">
          +<span className="font-bold">{points}</span>{" "}
          <span className=" capitalize">Points</span>
        </p>
      </div>
    </>
  );
};
