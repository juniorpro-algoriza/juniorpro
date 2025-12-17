import { cx } from "@lib";
import React from "react";
import { Animate } from "./Animate";

export const MainCard = ({
  children,
  classname,
  isAnimated = false,
}: {
  children: React.ReactNode;
  classname?: string;
  isAnimated?: boolean;
}) => {
  return isAnimated ? (
    <Animate className={cx("p-5 shadow-main rounded-2xl bg-white border border-gray-100", classname)}>
      {children}
    </Animate>
  ) : (
    <div className={cx("p-5 shadow-main rounded-2xl bg-white border border-gray-100 ", classname)}>
      {children}
    </div>
  );
};
