import React, { useCallback, useState } from "react";
import {
  Button,
  MainCard,
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  ModalLink,
} from "@components";
import { cx } from "@lib";
import {
  ArrowRight,
  CircleCheck,
  Clock,
  EllipsisVertical,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { XpAndPoints } from "@components/client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteMission } from "../../(pages)/(loged-in)/admin/server";
export const PathTimeline = ({
  module,
  missions,
  onMissionDeleted,
}: {
  module: "admin" | "junior";
  missions?: {
    id: number | undefined;
    status: string;
    title: string | null | undefined;
    level: string | null | undefined;
    description: string | null | undefined;
    duration: string | null | undefined;
    xp: number | undefined;
    diamonds: number | undefined;
    requires?: string | null;
    href?: string;
  }[];
  onMissionDeleted?: () => void;
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(
    async (item: { id: number | undefined }) => {
      if (!item.id) return;

      try {
        setIsDeleting(true);
        await deleteMission({ id: item.id });
        toast.success("Mission deleted successfully");
        onMissionDeleted?.();
      } catch (error) {
        console.error("Failed to delete mission:", error);
        toast.error("Failed to delete mission");
      } finally {
        setIsDeleting(false);
      }
    },
    [router, onMissionDeleted],
  );
  return (
    <Timeline>
      {missions?.map((item, index) => (
        <TimelineItem
          className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
          key={item.id}
          step={index + 1}
        >
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5 bg-gray-200" />

            <TimelineIndicator
              className={cx(
                "group-data-[orientation=vertical]/timeline:-left-7 flex size-10 items-center justify-center border-none group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground shadow-main p-1",
                item.status === "Pending"
                  ? "bg-gray-100 opacity-50"
                  : "bg-white",
              )}
            >
              {item.status === "Completed" && (
                <div className="w-full h-full rounded-full bg-[#00BC7D] flex items-center justify-center text-white">
                  <CircleCheck />
                </div>
              )}

              {(item.status === "InProgress" || !item.status) && (
                <div className="w-full h-full rounded-full bg-[#4F39F6] flex items-center justify-center text-white">
                  {index + 1}
                </div>
              )}

              {item.status === "Pending" && (
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <Lock className="size-4" />
                </div>
              )}
            </TimelineIndicator>
          </TimelineHeader>

          <TimelineContent
            className={item.status === "Pending" ? "opacity-50" : ""}
          >
            {module === "admin" && (
              <Menu>
                <MenuButton className="cursor-pointer focus-visible:outline-0 absolute top-5 right-5 z-20">
                  <EllipsisVertical className="text-gray-600 size-4" />
                </MenuButton>
                <MenuItems
                  anchor="bottom end"
                  className="w-40 bg-white border border-gray-200 rounded-xl focus-visible:outline-0"
                >
                  <MenuItem>
                    <div className="data-focus:bg-blue-100">
                      <ModalLink
                        name="CreateEditMission"
                        query={
                          item.id != null
                            ? { missionId: item.id.toString() }
                            : undefined
                        }
                      >
                        <div className="w-full text-left block py-2 px-4 cursor-pointer text-sm">
                          Edit
                        </div>
                      </ModalLink>
                    </div>
                  </MenuItem>
                  <MenuItem disabled={isDeleting}>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      className="w-full text-sm text-left block text-red-600 data-focus:bg-red-100 py-2 px-4 disabled:opacity-60 cursor-pointer"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
            <MainCard classname="flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-3">
                <div className="flex items-center md:gap-4 gap-2 flex-wrap">
                  <h3 className="capitalize text-lg font-bold">{item.title}</h3>
                  <div className="capitalize text-sm font-bold bg-green-50 p-1 rounded-md text-green-700">
                    {item.level}
                  </div>
                </div>

                <p className="text-sm text-gray-600">{item.description}</p>

                <div className="flex items-center justify-between flex-wrap gap-2 text-13">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-full flex items-center gap-2 text-gray-600">
                      <Clock className="size-4" /> {item.duration}
                    </div>
                    <XpAndPoints
                      xp={item.xp || 0}
                      points={item.diamonds || 0}
                    />
                  </div>
                </div>

                {item.requires && item.status == "Pending" && (
                  <div className="text-gray-600 flex-wrap bg-gray-100 flex gap-2 items-center text-13 px-4 py-1.5 rounded-2xl">
                    <Lock className="size-4" />
                    Requires:
                    <span className="font-medium capitalize">{item.requires}</span>
                  </div>
                )}
              </div>
              {module === "junior" && (
                <>
                  {item.status === "Completed" ? (
                    <Link href={item.href || ""}>
                      <Button intent="main" size="mainDefault">
                        Review Mission <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  ) : item.status === "InProgress" ? (
                    <Link href={item.href || ""}>
                      <Button intent="main2" size="mainDefault">
                        CONTINUE <ArrowRight className="size-4" />
                      </Button>
                    </Link>
                  ) : null}
                </>
              )}
            </MainCard>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
