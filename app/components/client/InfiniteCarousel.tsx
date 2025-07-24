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

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface InfiniteCarouselProps<T> {
  /** Initial items to display in the carousel */
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

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Default loading spinner component
 */
const DefaultLoadingSpinner = () => (
  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function InfiniteCarousel<T>({
  items: initialItems,
  renderItem,
  getItemKey,
  loadMore,
  maxItems = 50,
  hasMore: initialHasMore = true,
  loadingSpinner = <DefaultLoadingSpinner />,
  carouselOptions = {},
  className = "",
  showNavigation = true,
  showViewAll = true,
  viewAllText = "View All",
  onViewAll,
  navigationButtonProps = {},
}: InfiniteCarouselProps<T>) {
  // ========================================================================
  // STATE AND REFS
  // ========================================================================

  // Ref to store the scroll listener function
  const scrollListenerRef = useRef<() => void>(() => undefined);

  // Flag to control whether scroll events should trigger loading
  const listenForScrollRef = useRef(true);

  // Ref to track if there are more items to load (for internal engine access)
  const hasMoreToLoadRef = useRef(initialHasMore);

  // State for carousel items
  const [items, setItems] = useState(initialItems);

  // State for whether more items can be loaded
  const [hasMoreToLoad, setHasMoreToLoad] = useState(initialHasMore);

  // State for loading indicator
  const [loadingMore, setLoadingMore] = useState(false);

  // Navigation states
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // ========================================================================
  // CAROUSEL CONFIGURATION
  // ========================================================================

  /**
   * Default carousel options with custom slide watching behavior
   * This handles the complex logic of maintaining carousel position during dynamic updates
   */
  const defaultCarouselOptions: EmblaOptionsType = {
    loop: false,
    align: "start",
    dragFree: true,

    // Custom slide watcher to handle dynamic content updates
    watchSlides: (emblaApi) => {
      /**
       * Reloads the carousel while preserving scroll position and state
       */
      const reloadCarousel = (): void => {
        const oldEngine = emblaApi.internalEngine();

        // Reinitialize the carousel
        emblaApi.reInit();
        const newEngine = emblaApi.internalEngine();

        // Copy important engine modules from old to new engine
        const engineModulesToCopy: (keyof EngineType)[] = [
          "scrollBody",
          "location",
          "offsetLocation",
          "previousLocation",
          "target",
        ];

        engineModulesToCopy.forEach((moduleKey) => {
          Object.assign(newEngine[moduleKey], oldEngine[moduleKey]);
        });

        // Restore scroll position and index
        newEngine.translate.to(oldEngine.location.get());
        const { index } = newEngine.scrollTarget.byDistance(0, false);
        newEngine.index.set(index);
        newEngine.animation.start();

        // Reset loading state and re-enable scroll listening
        setLoadingMore(false);
        listenForScrollRef.current = true;
      };

      /**
       * Handles carousel reload after pointer/drag interaction ends
       */
      const handleReloadAfterPointerUp = (): void => {
        emblaApi.off("pointerUp", handleReloadAfterPointerUp);
        reloadCarousel();
      };

      const engine = emblaApi.internalEngine();

      // Handle reload timing based on user interaction state
      if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
        // If user is actively dragging, wait for pointer up
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
        emblaApi.on("pointerUp", handleReloadAfterPointerUp);
      } else {
        // If no active interaction, reload immediately
        reloadCarousel();
      }
    },

    // Merge with user-provided options
    ...carouselOptions,
  };

  // Initialize Embla carousel with configured options
  const [emblaRef, emblaApi] = useEmblaCarousel(defaultCarouselOptions);

  // ========================================================================
  // NAVIGATION FUNCTIONS
  // ========================================================================

  /**
   * Scrolls to the previous slide
   */
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  /**
   * Scrolls to the next slide
   */
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  /**
   * Updates navigation button states based on current scroll position
   */
  const updateNavigationState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // ========================================================================
  // INFINITE SCROLL LOGIC
  // ========================================================================

  /**
   * Handles scroll events to trigger infinite loading
   * Loads more items when the last slide comes into view
   */
  const handleScroll = useCallback(
    (emblaApi: EmblaCarouselType) => {
      // Don't process scroll events if disabled or already loading
      if (!listenForScrollRef.current || loadingMore) return;

      const slideNodes = emblaApi.slideNodes();
      const slidesInView = emblaApi.slidesInView();
      const lastSlideIndex = slideNodes.length - 1;
      const isLastSlideVisible = slidesInView.includes(lastSlideIndex);

      // Only trigger loading if the last slide is visible
      if (!isLastSlideVisible) return;

      // Disable scroll listening during loading to prevent multiple requests
      listenForScrollRef.current = false;
      setLoadingMore(true);

      /**
       * Executes the actual loading of new items
       */
      const executeItemLoading = async () => {
        try {
          const newItems = await loadMore();

          setItems((currentItems) => {
            const updatedItems = [...currentItems, ...newItems];

            // Check if we've reached the maximum item limit
            if (updatedItems.length >= maxItems) {
              setHasMoreToLoad(false);
              // Remove scroll listener when max items reached
              if (emblaApi) {
                emblaApi.off("scroll", scrollListenerRef.current);
              }
            }

            return updatedItems;
          });
        } catch (error) {
          console.error("Failed to load more items:", error);
          // Re-enable scroll listening on error
          setLoadingMore(false);
          listenForScrollRef.current = true;
        }
      };

      // Execute the loading immediately
      executeItemLoading();
    },
    [loadingMore, loadMore, maxItems]
  );

  /**
   * Adds scroll event listener to the carousel
   */
  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => handleScroll(emblaApi);
      emblaApi?.on("scroll", scrollListenerRef.current);
    },
    [handleScroll]
  );

  // ========================================================================
  // EFFECTS
  // ========================================================================

  /**
   * Main effect to initialize carousel event listeners and cleanup
   */
  useEffect(() => {
    if (!emblaApi) return;

    // Initialize navigation state
    updateNavigationState();

    // Set up event listeners
    emblaApi.on("select", updateNavigationState);
    addScrollListener(emblaApi);

    // Handle window resize events
    const handleResize = () => emblaApi.reInit();
    window.addEventListener("resize", handleResize);

    // Cleanup resize listener on carousel destroy
    emblaApi.on("destroy", () =>
      window.removeEventListener("resize", handleResize)
    );

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      emblaApi.off("select", updateNavigationState);
      emblaApi.off("scroll", scrollListenerRef.current);
    };
  }, [emblaApi, updateNavigationState, addScrollListener]);

  /**
   * Sync hasMoreToLoad state with ref for internal engine access
   */
  useEffect(() => {
    hasMoreToLoadRef.current = hasMoreToLoad;
  }, [hasMoreToLoad]);

  // ========================================================================
  // RENDER HELPERS
  // ========================================================================

  // Extract navigation button properties with defaults
  const { className: navClassName = "", size: navIconSize = 12 } =
    navigationButtonProps;

  /**
   * Renders the carousel slides
   */
  const renderCarouselSlides = () => (
    <>
      {/* Render actual items */}
      {items.map((item, index) => (
        <div key={getItemKey(item, index)} className="flex-[0_0_auto] min-w-0">
          {renderItem(item, index)}
        </div>
      ))}

      {/* Render loading indicator slide if more items available */}
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
    </>
  );

  /**
   * Renders navigation buttons
   */
  const renderNavigationButtons = () => (
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
  );

  /**
   * Renders the "View All" button
   */
  const renderViewAllButton = () => (
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
  );

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <section className={cx("p-4 bg-white", className)}>
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">{renderCarouselSlides()}</div>
      </div>

      {/* Navigation Controls */}
      {(showNavigation || showViewAll) && (
        <div className="flex justify-between items-center py-4">
          {/* Left side - Navigation buttons or spacer */}
          {showNavigation ? renderNavigationButtons() : <div />}

          {/* Right side - View All button */}
          {showViewAll && renderViewAllButton()}
        </div>
      )}
    </section>
  );
}
