"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "@lib";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  options?: EmblaOptionsType;
}

export const Carousel = ({ children, className, options }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    ...options,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={cx("relative group", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 px-4">
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] min-w-0"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-4 lg:-translate-x-8 size-8 sm:size-10 md:size-12 rounded-full bg-[#EAECF0] border-2 sm:border-4 border-white shadow-sm flex items-center justify-center text-[#475467] transition-all hover:bg-gray-200 hover:scale-110 active:scale-95 z-10 ring-1 ring-gray-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-3 sm:size-4 md:size-5 stroke-[3]" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-4 lg:translate-x-8 size-8 sm:size-10 md:size-12 rounded-full bg-[#EAECF0] border-2 sm:border-4 border-white shadow-sm flex items-center justify-center text-[#475467] transition-all hover:bg-gray-200 hover:scale-110 active:scale-95 z-10 ring-1 ring-gray-200"
        aria-label="Next slide"
      >
        <ChevronRight className="size-3 sm:size-4 md:size-5 stroke-[3]" />
      </button>
    </div>
  );
};
