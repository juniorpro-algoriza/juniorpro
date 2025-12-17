import { useSidebar } from "@atoms";
import { cx } from "@lib";
import React from "react";

export const Header = ({
  title,
  description,
  end,
  startIndent=false,
}: {
  title: string;
  description: string | React.ReactNode;
  end?: React.ReactNode;
  startIndent?: boolean;
}) => {
  const { isOpen } = useSidebar();
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1
          className={cx(
            "lg:text-[32px] text-[24px] font-bold text-yankees-blue mt-2",
            !isOpen && startIndent && "pl-12"
          )}
        >
          {title}
        </h1>
        <p
          className={cx(
            "text-gray-600 font-medium text-base lg:text-lg",
            !isOpen && startIndent && "pl-12"
          )}
        >
          {description}
        </p>
      </div>
      <div className="ml-auto">{end}</div>
    </div>
  );
};
