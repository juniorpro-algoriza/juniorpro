"use client";

import type { ReactNode } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface AnimateProps {
  children: ReactNode;
  className?: string;
}
export const Animate = ({ children, className }: AnimateProps) => {
  //   const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const [parent] = useAutoAnimate({
    duration: 500,
  });
  return (
    <div ref={parent} className={className} dir="rtl">
      {children}
    </div>
  );
};
