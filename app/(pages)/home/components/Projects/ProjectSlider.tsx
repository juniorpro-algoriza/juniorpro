"use client";

import { Button } from "@components";
import { cx } from "cva";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "../../types";
import type { EmblaCarouselType, EngineType } from "embla-carousel";

interface ProjectsSliderProps {
  projects: Project[];
}

const mockApiCall = (
  minWait: number,
  maxWait: number,
  callback: () => void
): void => {
  const min = Math.ceil(minWait);
  const max = Math.floor(maxWait);
  const wait = Math.floor(Math.random() * (max - min + 1)) + min;
  setTimeout(callback, wait);
};

export const ProjectsSlider = ({
  projects: initialProjects,
}: ProjectsSliderProps) => {
  const scrollListenerRef = useRef<() => void>(() => undefined);
  const listenForScrollRef = useRef(true);
  const hasMoreToLoadRef = useRef(true);
  const [projectSlides, setProjectSlides] = useState(initialProjects);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    watchSlides: (emblaApi) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaApi.internalEngine();

        emblaApi.reInit();
        const newEngine = emblaApi.internalEngine();
        const copyEngineModules: (keyof EngineType)[] = [
          "scrollBody",
          "location",
          "offsetLocation",
          "previousLocation",
          "target",
        ];
        copyEngineModules.forEach((engineModule) => {
          Object.assign(newEngine[engineModule], oldEngine[engineModule]);
        });

        newEngine.translate.to(oldEngine.location.get());
        const { index } = newEngine.scrollTarget.byDistance(0, false);
        newEngine.index.set(index);
        newEngine.animation.start();

        setLoadingMore(false);
        listenForScrollRef.current = true;
      };

      const reloadAfterPointerUp = (): void => {
        emblaApi.off("pointerUp", reloadAfterPointerUp);
        reloadEmbla();
      };

      const engine = emblaApi.internalEngine();

      if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
        emblaApi.on("pointerUp", reloadAfterPointerUp);
      } else {
        reloadEmbla();
      }
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

  const onScroll = useCallback(
    (emblaApi: EmblaCarouselType) => {
      if (!listenForScrollRef.current) return;

      const lastSlide = emblaApi.slideNodes().length - 1;
      const lastSlideInView = emblaApi.slidesInView().includes(lastSlide);

      // Only proceed if last slide is in view and we're not already loading
      if (!lastSlideInView || loadingMore) return;

      console.log({
        lastSlide,
        lastSlideInView,
        loadingMore,
        slidesLength: emblaApi.slideNodes().length,
      });

      // Disable listening for scroll events during loading
      listenForScrollRef.current = false;
      setLoadingMore(true);

      mockApiCall(1000, 2000, () => {
        setProjectSlides((currentSlides) => {
          if (currentSlides.length >= 50) {
            setHasMoreToLoad(false);
            setLoadingMore(false);
            // Remove scroll listener when we reach the limit
            if (emblaApi) {
              emblaApi.off("scroll", scrollListenerRef.current);
            }
            return currentSlides;
          }

          const last = currentSlides[currentSlides.length - 1];
          const newProj = {
            ...last,
            id: `${last.id}-${Date.now()}`,
            title: `new ${currentSlides.length + 1}`,
          };

          // The loading state and scroll listener will be re-enabled
          // in the watchSlides callback after reInit
          return [...currentSlides, newProj];
        });
      });
    },
    [loadingMore]
  );

  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => onScroll(emblaApi);
      emblaApi?.on("scroll", scrollListenerRef.current);
    },
    [onScroll]
  );

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    addScrollListener(emblaApi);

    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    emblaApi.on("destroy", () =>
      window.removeEventListener("resize", onResize)
    );

    return () => {
      window.removeEventListener("resize", onResize);
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", scrollListenerRef.current);
    };
  }, [emblaApi, onSelect, addScrollListener]);

  useEffect(() => {
    hasMoreToLoadRef.current = hasMoreToLoad;
  }, [hasMoreToLoad]);

  return (
    <section className="p-4 bg-white">
      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {projectSlides.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="flex-[0_0_auto] min-w-0"
            >
              <ProjectCard
                category={project.category}
                image={project.imageUrl}
                description={project.description}
                rating={project.rating}
                projectType={project.projectType}
                isFree={project.isFree}
                title={project.title}
              />
            </div>
          ))}
          {hasMoreToLoad && (
            <div
              className={cx(
                "flex items-center justify-center min-w-[200px] flex-[0_0_auto]",
                loadingMore ? "opacity-50" : ""
              )}
            >
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
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
