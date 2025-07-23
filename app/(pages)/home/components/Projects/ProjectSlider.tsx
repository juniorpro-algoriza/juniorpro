"use client";

import { Button } from "@components";
import { cx } from "cva";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "../../types";

interface ProjectsSliderProps {
  projects: Project[];
}

export const ProjectsSlider = ({ projects }: ProjectsSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="p-4 bg-white">
      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              category={project.category}
              image={project.imageUrl}
              description={project.description}
              rating={project.rating}
              projectType={project.projectType}
              isFree={project.isFree}
              title={project.title}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center py-4">
        <div className="flex gap-2 py-6">
          <Button
            intent="unset"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={cx(
              "p-2 rounded-full border-2 transition-all duration-200",
              canScrollPrev
                ? "border-blue-500 text-blue-500 hover:bg-blue-50"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            )}
          >
            <ChevronLeft size={12} />
          </Button>
          <Button
            intent="unset"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={cx(
              "p-2 rounded-full border-2 transition-all duration-200",
              canScrollNext
                ? "border-blue-500 text-blue-500 hover:bg-blue-50"
                : "border-gray-300 text-gray-300 cursor-not-allowed"
            )}
          >
            <ChevronRight size={12} />
          </Button>
        </div>
        <Button
          intent="tertiary"
          iconPosition="right"
          size="small"
          className="border-none text-unitedBlue"
          icon={<ChevronRight className="w-4 h-4" />}
        >
          View All
        </Button>
      </div>
    </section>
  );
};
