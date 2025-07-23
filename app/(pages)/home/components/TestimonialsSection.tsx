"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react"; // Added useRef and useCallback
import useEmblaCarousel from "embla-carousel-react";
import { testimonials } from "../config";

export const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: false, // Keep this false as we're implementing custom drag
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // State and ref for custom drag behavior
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const containerRef = useRef(null); // Ref to the Embla container for event listeners

  // Sync selected index when Embla fires select event
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // initialize

    return () => {
      emblaApi?.off("select", onSelect);
    };
  }, [emblaApi]);

  const handlePrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(
      (selectedIndex - 1 + testimonials.length) % testimonials.length
    );
  }, [emblaApi, selectedIndex]);

  const handleNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo((selectedIndex + 1) % testimonials.length);
  }, [emblaApi, selectedIndex]);

  // --- Custom Drag Logic ---

  const handlePointerDown = useCallback(
    (event: { clientX: number; touches: { clientX: number }[] }) => {
      setIsDragging(true);
      // Use clientX for both mouse and touch events
      dragStartX.current = event.clientX || event.touches[0].clientX;
      dragCurrentX.current = dragStartX.current; // Initialize currentX
    },
    []
  );

  const handlePointerMove = useCallback(
    (event: { clientX: number; touches: { clientX: number }[] }) => {
      if (!isDragging) return;
      dragCurrentX.current = event.clientX || event.touches[0].clientX;
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return; // Only proceed if a drag was in progress
    setIsDragging(false);

    const dragThreshold = 50; // Pixels to determine a significant drag

    const dragDistance = dragCurrentX.current - dragStartX.current;

    if (dragDistance > dragThreshold) {
      // Dragged right, go to previous
      handlePrev();
    } else if (dragDistance < -dragThreshold) {
      // Dragged left, go to next
      handleNext();
    }
  }, [isDragging, handlePrev, handleNext]);

  // Attach event listeners to the Embla container
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const container = containerRef.current as any;
    if (!container) return;

    // Use pointer events for unified mouse and touch handling
    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointerleave", handlePointerUp); // End drag if pointer leaves the element

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [handlePointerDown, handlePointerMove, handlePointerUp]);

  return (
    <section className="px-4 pt-16 bg-white">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-[32px] font-medium">
          From Curious Beginner to Tech Competition Winner
        </h2>

        {/* Embla container */}
        <div
          className="relative max-w-4xl mx-auto h-[600px] lg:h-[400px] overflow-hidden"
          ref={(node) => {
            emblaRef(node);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            containerRef.current = node as any; // Assign to containerRef as well
          }}
        >
          {/* Stacked Cards */}
          <div className="relative w-full h-full">
            {testimonials.map((testimonial, index) => {
              const position =
                (index - selectedIndex + testimonials.length) %
                testimonials.length;

              let zIndex, transform, opacity, scale;

              if (position === 0) {
                zIndex = 30;
                transform = "translateX(0)";
                opacity = 1;
                scale = 1;
              } else if (position === 1) {
                zIndex = 20;
                transform = "translateX(150px)";
                opacity = 0.8;
                scale = 0.95;
              } else if (position === testimonials.length - 1) {
                zIndex = 20;
                transform = "translateX(-150px)";
                opacity = 0.8;
                scale = 0.95;
              } else {
                zIndex = 10;
                transform = "translateX(0)";
                opacity = 0;
                scale = 0.9;
              }

              return (
                <div
                  key={testimonial.id}
                  className="absolute cursor-move inset-0 flex justify-center items-center transition-all duration-500 ease-out"
                  style={{
                    zIndex,
                    transform: `${transform} scale(${scale})`,
                    opacity,
                  }}
                >
                  <div
                    className={`border ${
                      position === 0 ? "bg-[#F7FCFF]" : "bg-white"
                    } border-[#E7E7E7] rounded-2xl p-8 md:p-10 shadow-xl w-full max-w-2xl`}
                  >
                    <div className="space-y-6">
                      <h3 className="text-lg md:text-xl font-medium leading-relaxed">
                        “{testimonial.title}”
                      </h3>

                      <p className="text-gray-600 leading-7 select-none">
                        {testimonial.content}
                      </p>

                      <div className="flex justify-center items-center gap-3">
                        <Image
                          src={testimonial.avatar}
                          alt="avatar"
                          className="drop-shadow-xl"
                          width={48}
                          height={48}
                        />
                        <div className="text-left space-y-1">
                          <p className="font-medium text-unitedBlue">
                            {testimonial.name}
                          </p>
                          <p className="text-gray-500">{testimonial.age}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={handlePrev}
            className="bg-white rounded-full p-2 border border-unitedBlue transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 text-unitedBlue" />
          </button>

          <button
            onClick={handleNext}
            className="bg-white rounded-full p-2 border border-unitedBlue transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 text-unitedBlue" />
          </button>
        </div>
      </div>
    </section>
  );
};
