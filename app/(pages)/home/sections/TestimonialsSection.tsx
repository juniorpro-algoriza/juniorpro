'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { testimonials } from './config';

export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 150);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial(
          (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
        setIsAnimating(false);
      }, 150);
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 150);
    }
  };

  return (
    <section className='px-4 py-20 bg-white'>
      <div className='max-w-6xl mx-auto text-center space-y-6'>
        <h2 className='text-3xl md:text-[32px] font-medium'>
          From Curious Beginner to Tech Competition Winner
        </h2>

        {/* Stacked Cards Container */}
        <div className='relative max-w-4xl mx-auto h-[400px] flex items-center justify-center'>
          {testimonials.map((testimonial, index) => {
            // Calculate position relative to current testimonial
            const position =
              (index - currentTestimonial + testimonials.length) %
              testimonials.length;

            let zIndex, transform, opacity, scale;

            if (position === 0) {
              // Current/front card
              zIndex = 30;
              transform = 'translateX(0) translateY(0) rotate(0deg)';
              opacity = 1;
              scale = 1;
            } else if (position === 1) {
              // Next card (slightly behind and to the right)
              zIndex = 20;
              transform = 'translateX(150px)';
              opacity = 0.8;
              scale = 0.95;
            } else if (position === testimonials.length - 1) {
              // Previous card (slightly behind and to the left)
              zIndex = 20;
              transform = 'translateX(-150px)';
              opacity = 0.8;
              scale = 0.95;
            } else {
              // Hidden cards
              zIndex = 10;
              transform = 'translateX(0) translateY(0px) rotate(0deg)';
              opacity = 0;
              scale = 0.9;
            }

            return (
              <div
                key={testimonial.id}
                className={`absolute ${position === 0 ? 'bg-[#F7FCFF]' : 'bg-white'} border border-[#E7E7E7] rounded-2xl p-8 md:p-10 shadow-xl w-full max-w-2xl transition-all duration-500 ease-out ${
                  isAnimating ? 'duration-150' : ''
                }`}
                style={{
                  zIndex,
                  transform: `${transform} scale(${scale})`,
                  opacity,
                }}
              >
                <div>
                  <div className='space-y-6'>
                    <h3 className='text-lg md:text-xl font-medium leading-relaxed'>
                      “{testimonial.title}”
                    </h3>

                    <p className='text-gray-600 leading-7'>
                      {testimonial.content}
                    </p>

                    {/* Profile */}
                    <div className='flex justify-center items-center gap-3'>
                      <Image
                        src={testimonial.avatar}
                        alt='avatar image'
                        className='drop-shadow-xl'
                      />
                      <div className='text-left space-y-1'>
                        <p className='font-medium text-unitedBlue'>
                          {testimonial.name}
                        </p>
                        <p className='text-gray-500'>{testimonial.age}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <div className='flex justify-center gap-3'>
          <button
            onClick={handlePrevious}
            className=' bg-white rounded-full p-2 border border-unitedBlue transition-all duration-300 hover:scale-110'
            aria-label='Previous testimonial'
          >
            <ChevronLeft className='w-4 h-4 text-unitedBlue' />
          </button>

          <button
            onClick={handleNext}
            className=' bg-white rounded-full p-2 border border-unitedBlue transition-all duration-300 hover:scale-110'
            aria-label='Next testimonial'
          >
            <ChevronRight className='w-4 h-4 text-unitedBlue' />
          </button>
        </div>
      </div>
    </section>
  );
};
