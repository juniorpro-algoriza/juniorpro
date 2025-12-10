"use client";
import React from "react";
import Link from "next/link";
import { ChevronRightIcon, House } from "lucide-react";
import { useSidebar } from "@atoms";
import { cx } from "@lib";
export const Breadcrumb = ({
  breadcrumbs,
}: {
  breadcrumbs: { title: string; href: string }[];
}) => {
  const { isOpen } = useSidebar();
  return (
    <div
      className={cx(
        "flex items-center gap-2 flex-wrap text-sm text-gray-600",
        !isOpen && "pl-12"
      )}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center gap-2">
          <Link
            href={breadcrumb.href}
            className="hover:underline underline-offset-2 transition-colors"
          >
            {breadcrumb.title === "Home" ? (
              <House className="size-4" />
            ) : (
              breadcrumb.title
            )}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <ChevronRightIcon className="size-4" />
          )}
        </div>
      ))}
    </div>
  );
};
