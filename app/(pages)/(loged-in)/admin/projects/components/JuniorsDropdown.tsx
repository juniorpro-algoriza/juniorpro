"use client";

import { Animate } from "@components";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type RefObject, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useOnClickOutside } from "usehooks-ts";

interface JuniorsDropdownProps {
  juniors: string[];
}
export const JuniorsDropdown = ({ juniors }: JuniorsDropdownProps) => {
  const searchParams = useSearchParams();
  const [junior, setJunior] = useState(searchParams.get("junior"));
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const junior = searchParams.get("junior");
    setJunior(junior);
  }, [searchParams]);

  useOnClickOutside(ref as RefObject<HTMLElement>, () => setOpen(false));

  return (
    <div className="relative focus:ring ring-blue-500 bg-transparent" ref={ref}>
      <button
        className={twMerge(
          "border capitalize transition duration-100 border-black/20 shadow-soft px-6 py-3 pr-9 rounded-lg",
          open ? "ring-blue-500 ring-2" : ""
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        {junior}
      </button>
      <Animate
        duration={300}
        className={twMerge(
          "absolute top-full left-0 z-30 roundded-lg w-full bg-black/10 shadow-lg drop-shadow-2xl"
        )}
      >
        {open && (
          <div className="bg-white mt-4 rounded-lg">
            {juniors.map((j) => {
              const isSelected = j === junior;
              const link = `/contributor/projects?junior=${encodeURIComponent(j)}`;
              return (
                <Link
                  onClick={() => setOpen(false)}
                  className={twMerge(
                    "text-center capitalize block px-6 focus:border-0 hover:border- rounded-lg py-3 hover:ring rin-blue-500 transition-colors duration-100",
                    isSelected && "ring ring-blue-500"
                  )}
                  href={link}
                  key={j}
                >
                  <span>{j}</span>
                </Link>
              );
            })}
          </div>
        )}
      </Animate>
      <ChevronDownIcon className="w-3.5 absolute right-0 top-1/2 transform -translate-y-1/2 mr-3" />
    </div>
  );
};
