import bgGraphic from '@public/images/bg-graphic.png';
import greenCheckMark from '@public/images/green-check-mark.png';
import rightBlueArrow from '@public/images/right-blue-arrow.png';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { heroSteps } from './config';

export const HowItWorkSection = () => {
  return (
    <section className='px-4 py-20 bg-white relative'>
      <div className='max-w-6xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-20'>
          <p className='text-lg text-unitedBlue mb-3'>How it works</p>
          <h2 className='font-bold text-4xl md:text-5xl text-muted-text'>
            How JuniorPro Works
          </h2>
        </div>

        {/* Content Grid */}
        <div className='grid lg:grid-cols-2 gap-16 lg:gap-28 items-center'>
          {/* Left Column - Text Content */}
          <div className='space-y-6 text-center lg:text-start'>
            <div>
              <p className='text-lg font-bold text-unitedBlue mb-4'>
                Free Projects
              </p>
              <h3 className='font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-muted-text mb-6'>
                Start building your skills with our collection of free solo
                projects
              </h3>
              <p className='text-lg text-muted-text leading-relaxed'>
                Build your tech skills by completing at least 5 free solo
                projects. These beginner-friendly tasks are your first step into
                the world of technology.
              </p>
            </div>

            <button className='font-bold text-lg text-unitedBlue flex gap-2 items-center hover:gap-3 transition-all duration-300 group mx-auto lg:mx-0'>
              <span>Start Free Tasks</span>
              <Image
                src={rightBlueArrow}
                alt='Arrow'
                unoptimized
                className='w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300'
              />
            </button>
          </div>

          {/* Right Column - Visual Steps */}
          <div className='relative flex justify-center'>
            <div className='relative'>
              <Image
                src={bgGraphic}
                alt='Background graphic'
                className='w-full max-w-[455px] h-auto'
                unoptimized
              />

              {/* Task Steps Overlay */}
              <div className='absolute inset-0 flex flex-col justify-center items-center space-y-4 p-8'>
                {heroSteps.map((step, index) => (
                  <div
                    key={step}
                    className={twMerge(
                      'relative py-4 px-5 rounded-2xl bg-white shadow-lg flex items-center gap-3 min-w-[280px] hover:shadow-xl transition-all duration-300',
                      index % 2 === 0
                        ? 'lg:mr-auto lg:ml-0'
                        : 'lg:ml-auto lg:mr-0'
                    )}
                  >
                    {/* Task Number Badge */}
                    <div className='absolute -right-2 -top-2 flex flex-col justify-center items-center bg-light-red px-2 py-1 rounded-lg text-xs shadow-md'>
                      <span className='text-bright-red font-semibold'>
                        {index + 1}
                      </span>
                      <span className='text-muted-text'>task</span>
                    </div>

                    {/* Checkmark */}
                    <Image
                      src={greenCheckMark}
                      unoptimized
                      alt='Completed'
                      className='w-6 h-6 flex-shrink-0'
                    />

                    {/* Step Text */}
                    <span className='text-sm font-medium text-muted-text'>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
