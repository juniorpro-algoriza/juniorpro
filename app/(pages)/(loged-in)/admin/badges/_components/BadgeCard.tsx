"use client";

import { MainCard } from "@components";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { cx } from "@lib";
import { useDeleteBadge } from "../../tanstack/badges";
import { Edit2, EllipsisVertical, Trash2, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { components } from "../../../../../../api-schema";
import { getBadgeCondition, getBadgeType } from "./data";

type Badge =
  components["schemas"]["Sawiha.Services.DTO.AdminBadgeModels.GetAll.AdminBadgeListModel"];

export const BadgeCard = ({ badge }: { badge: Badge }) => {
  const deleteBadgeMutation = useDeleteBadge();
  const badgeType = getBadgeType(badge.type);

  const deleteSelectedBadge = async () => {
    if (!badge.id) return;

    try {
      await deleteBadgeMutation.mutateAsync({ id: badge.id });
      toast.success("Badge deleted successfully.");
    } catch (error) {
      console.error("Failed to delete badge:", error);
      toast.error("Failed to delete badge. Please try again.");
    }
  };

  const handleDelete = () => {
    if (!badge.id) return;

    const toastId = toast(`Delete "${badge.titleEn || "this badge"}"?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => {
          toast.dismiss(toastId);
          void deleteSelectedBadge();
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(toastId),
      },
    });
  };

  return (
    <MainCard classname="relative flex min-h-[285px] flex-col items-center rounded-[28px] border border-gray-100 bg-white p-5">
      <Menu>
        <MenuButton className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:bg-gray-100 focus-visible:outline-0">
          <EllipsisVertical className="size-5 text-gray-500" />
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="z-50 mt-1 flex w-56 flex-col rounded-2xl border border-gray-200 bg-white px-1 py-2 shadow-[0px_10px_30px_rgba(18,24,40,0.12)] focus-visible:outline-0"
        >
          <MenuItem>
            <Link
              href={`/admin/badges/${badge.id}/edit`}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-gray-600 data-focus:bg-gray-50"
            >
              <Edit2 className="size-5 text-gray-500" strokeWidth={2} />
              Edit
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteBadgeMutation.isPending}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-red-600 data-focus:bg-red-50 disabled:opacity-60"
            >
              <Trash2 className="size-5 text-red-600" strokeWidth={2} />
              Delete
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      <div
        className={cx(
          "self-start rounded-full border px-3 py-1 text-[10px] font-black uppercase",
          badgeType.tone.bg,
          badgeType.tone.border,
          badgeType.tone.text
        )}
      >
        {badgeType.shortLabel}
      </div>

      <div className="mt-5 flex flex-1 flex-col items-center text-center">
        <div className="mb-4 flex h-36 w-36 items-center justify-center">
          {badge.imageUrl ? (
            <Image
              src={badge.imageUrl}
              alt={badge.titleEn || "Badge"}
              width={128}
              height={128}
              className="h-36 w-36 object-contain"
              unoptimized
            />
          ) : (
            <Image
              src="/images/1stBadge.png"
              alt="Badge"
              width={128}
              height={128}
              className="h-28 w-28 object-contain"
            />
          )}
        </div>

        <h3 className="text-lg font-bold text-midnight">
          {badge.titleEn || "Untitled Badge"}
        </h3>
        <p className="mt-2 text-sm font-medium text-semi-blue">
          {getBadgeCondition(badge.count || 0, badge.type)}
        </p>
      </div>

      <div className="mt-4 flex w-full items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 text-sm font-bold text-yankees-blue">
          <Users className="size-4 text-blue-main" />
          {badge.juniors ?? 0}
        </div>
        <span className="text-xs font-medium text-semi-blue">
          juniors earned
        </span>
      </div>
    </MainCard>
  );
};
