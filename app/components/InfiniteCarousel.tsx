"use client";

import { Button } from "@components";
import { cx } from "cva";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, ReactNode } from "react";
import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EngineType,
} from "embla-carousel";

interface InfiniteCarouselProps<T> {
  /** Initial items to display */
  items: T[];

  /** Function to render each item - receives the item and its index */
  renderItem: (item: T, index: number) => ReactNode;

  /** Function to generate a unique key for each item */
  getItemKey: (item: T, index: number) => string;

  /** Function to load more items - should return a promise that resolves to new items */
  loadMore: () => Promise<T[]>;

  /** Maximum number of items to load (optional, defaults to 50) */
  maxItems?: number;

  /** Whether there are more items to load initially (optional, defaults to true) */
  hasMore?: boolean;

  /** Loading delay range in milliseconds (optional, defaults to [1000, 2000]) */
  loadingDelay?: [number, number];

  /** Custom loading spinner component (optional) */
  loadingSpinner?: ReactNode;

  /** Embla carousel options (optional) */
  carouselOptions?: EmblaOptionsType;

  /** Additional CSS classes for the carousel container */
  className?: string;

  /** Whether to show navigation buttons (optional, defaults to true) */
  showNavigation?: boolean;

  /** Whether to show "View All" button (optional, defaults to true) */
  showViewAll?: boolean;

  /** Custom "View All" button text (optional, defaults to "View All") */
  viewAllText?: string;

  /** Callback when "View All" is clicked */
  onViewAll?: () => void;

  /** Custom navigation button styling */
  navigationButtonProps?: {
    className?: string;
    size?: number;
  };
}

const defaultMockApiCall = (
  minWait: number,
  maxWait: number,
  callback: () => void
): void => {
  const min = Math.ceil(minWait);
  const max = Math.floor(maxWait);
  const wait = Math.floor(Math.random() * (max - min + 1)) + min;
  setTimeout(callback, wait);
};

const DefaultLoadingSpinner = () => (
  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
);

export function InfiniteCarousel<T>({
  items: initialItems,
  renderItem,
  getItemKey,
  loadMore,
  maxItems = 50,
  hasMore: initialHasMore = true,
  loadingDelay = [1000, 2000],
  loadingSpinner = <DefaultLoadingSpinner />,
  carouselOptions = {},
  className = "",
  showNavigation = true,
  showViewAll = true,
  viewAllText = "View All",
  onViewAll,
  navigationButtonProps = {},
}: InfiniteCarouselProps<T>) {
  const scrollListenerRef = useRef<() => void>(() => undefined);
  const listenForScrollRef = useRef(true);
  const hasMoreToLoadRef = useRef(initialHasMore);
  const [items, setItems] = useState(initialItems);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);

  const defaultCarouselOptions: EmblaOptionsType = {
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
    ...carouselOptions,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(defaultCarouselOptions);

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

      // Disable listening for scroll events during loading
      listenForScrollRef.current = false;
      setLoadingMore(true);

      // Use either custom delay or mock API call
      const executeLoad = async () => {
        try {
          const newItems = await loadMore();

          setItems((currentItems) => {
            const updatedItems = [...currentItems, ...newItems];

            if (updatedItems.length >= maxItems) {
              setHasMoreToLoad(false);
              if (emblaApi) {
                emblaApi.off("scroll", scrollListenerRef.current);
              }
            }

            return updatedItems;
          });
        } catch (error) {
          console.error("Failed to load more items:", error);
          // Re-enable listening on error
          setLoadingMore(false);
          listenForScrollRef.current = true;
        }
      };

      // Add delay to simulate loading
      defaultMockApiCall(loadingDelay[0], loadingDelay[1], executeLoad);
    },
    [loadingMore, loadMore, maxItems, loadingDelay]
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

  const { className: navClassName = "", size: navIconSize = 12 } =
    navigationButtonProps;

  return (
    <section className={cx("p-4 bg-white", className)}>
      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {items.map((item, index) => (
            <div
              key={getItemKey(item, index)}
              className="flex-[0_0_auto] min-w-0"
            >
              {renderItem(item, index)}
            </div>
          ))}
          {hasMoreToLoad && (
            <div
              className={cx(
                "flex items-center justify-center min-w-[200px] flex-[0_0_auto]",
                loadingMore ? "opacity-50" : ""
              )}
            >
              {loadingSpinner}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      {(showNavigation || showViewAll) && (
        <div className="flex justify-between items-center py-4">
          {showNavigation && (
            <div className="flex gap-2 py-6">
              <Button
                intent="unset"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={cx(
                  "p-2 rounded-full border-2 transition-all duration-200",
                  canScrollPrev
                    ? "border-blue-500 text-blue-500 hover:bg-blue-50"
                    : "border-gray-300 text-gray-300 cursor-not-allowed",
                  navClassName
                )}
              >
                <ChevronLeft size={navIconSize} />
              </Button>
              <Button
                intent="unset"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={cx(
                  "p-2 rounded-full border-2 transition-all duration-200",
                  canScrollNext
                    ? "border-blue-500 text-blue-500 hover:bg-blue-50"
                    : "border-gray-300 text-gray-300 cursor-not-allowed",
                  navClassName
                )}
              >
                <ChevronRight size={navIconSize} />
              </Button>
            </div>
          )}

          {!showNavigation && <div />}

          {showViewAll && (
            <Button
              intent="tertiary"
              iconPosition="right"
              size="small"
              className="border-none text-unitedBlue"
              icon={<ChevronRight className="w-4 h-4" />}
              onClick={onViewAll}
            >
              {viewAllText}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
