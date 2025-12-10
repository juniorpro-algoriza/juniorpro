import { cx } from "@lib";
import React from "react";

export const Progress = ({
  width,
  className,
  height
}: {
  width: number;
  className?: string;
  height?:string
}) => {
  return (
    <div className="relative h-2.5 w-full bg-gray-100 rounded-full" style={{height}}>
      <div
        className={cx(
          "absolute h-full [background:linear-gradient(90deg,#615FFF_0%,#AD46FF_100%)] rounded-full",
          className
        )}
        style={{
          width: `${width}%`,
        }}
      ></div>
    </div>
  );
};
