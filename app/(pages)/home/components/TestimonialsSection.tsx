"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { testimonials } from "../config";

export const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Initial selection
  }, [emblaApi]);

  return (
    <section className="px-4 py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <div className="relative max-w-4xl mx-auto">
          <div ref={emblaRef} className="overflow-hidden w-full">
            <div className="flex">
              {testimonials.map((testimonial, index) => {
                const isActive = index === selectedIndex;

                return (
                  <div
                    key={testimonial.id}
                    className="flex-[0_0_80%] md:flex-[0_0_60%] px-2 transition-transform duration-300"
                  >
                    <div
                      className={`rounded-2xl border shadow-lg p-6 sm:p-8 md:p-10 h-full transition-all duration-300 ${
                        isActive
                          ? "bg-white scale-100 opacity-100 z-10"
                          : "bg-gray-50 scale-95 opacity-50 z-0"
                      }`}
                    >
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-4">
                        “ {testimonial.title} ”
                      </h3>

                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center mb-6">
                        {testimonial.content}
                      </p>

                      <div className="flex justify-center items-center gap-3">
                        <Image
                          src={testimonial.avatar}
                          alt="avatar"
                          width={40}
                          height={40}
                          className="rounded-full shadow-md"
                        />
                        <div className="text-left text-sm sm:text-base">
                          <p className="font-medium text-blue-600">
                            {testimonial.name}
                          </p>
                          <p className="text-gray-500">{testimonial.age}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
