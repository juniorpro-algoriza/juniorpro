import { useSidebar } from "@atoms";
import { cx } from "@lib";
import React from "react";

export const Header = ({
  title,
  description,
  end,
}: {
  title: string;
  description: string;
  end?: React.ReactNode;
}) => {
  const { isOpen } = useSidebar();
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1
          className={cx(
            "lg:text-[32px] text-[24px] font-bold text-yankees-blue mt-2",
            !isOpen && "pl-12"
          )}
        >
          {title}
        </h1>
        <p
          className={cx(
            "text-gray-600 font-medium text-base lg:text-lg",
            !isOpen && "pl-12"
          )}
        >
          {description}
        </p>
      </div>
      <div className="ml-auto">{end}</div>
    </div>
  );
};
