"use client";

import type { ReactNode } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface AnimateProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}
export const Animate = ({
  children,
  className,
  duration = 500,
}: AnimateProps) => {
  //   const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const [parent] = useAutoAnimate({
    duration,
  });
  return (
    <div ref={parent} className={className} dir="rtl">
      {children}
    </div>
  );
};
