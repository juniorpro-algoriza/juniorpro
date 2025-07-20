import { Button, Input } from '@components';
import NotFoundIcon from '@public/images/404 Error.svg';
import AboutUsImage from '@public/images/aboutus 1.svg';
import bgGraphic from '@public/images/bg-graphic.png';
import CSharp from '@public/images/C Sharp.svg';
import CSSIcon from '@public/images/Css3.svg';
import GitIcon from '@public/images/gitlab-2.svg';
import greenCheckMark from '@public/images/green-check-mark.png';
import HTMLIcon from '@public/images/Html.svg';
import MetalCodeIcon from '@public/images/Metal_Code.svg';
import rightBlueArrow from '@public/images/right-blue-arrow.png';
import VSCodeIcon from '@public/images/Visual Studio Code.svg';
import { ChevronRight, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const heroText = [
  {
    number: '1K+',
    text: 'Projects Available',
  },
  {
    number: '5K+',
    text: 'Active Students',
  },
  {
    number: '200+',
    text: 'Expert Mentors',
  },
  {
    number: '4.9/5',
    text: 'Student Rating',
  },
];

const heroSteps = [
  'Complete your first task',
  'Complete your second task',
  'Complete your third task',
  'Complete your fourth task',
  'Complete your fifth task',
];

const floatingIcons = [
  { src: CSSIcon, alt: 'CSS Icon', position: 'top-40 left-36' },
  { src: GitIcon, alt: 'Git Icon', position: 'top-80 left-24' },
  { src: NotFoundIcon, alt: '404 Error', position: 'top-96 left-72' },
  { src: CSharp, alt: 'C# Icon', position: 'top-[512px] left-36' },
  {
    src: VSCodeIcon,
    alt: 'Visual Studio Code Icon',
    position: 'top-28 right-56',
  },
  { src: HTMLIcon, alt: 'HTML Icon', position: 'top-64 right-40' },
  { src: MetalCodeIcon, alt: 'Metal Code Icon', position: 'top-92 right-60' },
];

const HomePage = () => {
  return (
    <main>
      {/* Background */}
      <div className='bg-linear-to-b fixed from-light-blue to-white inset-0 -z-10'></div>

      {/* Section 1: Hero Section */}
      <section className='px-4 py-20 overflow-hidden'>
        {/* Floating Technology Icons */}
        <div className='hidden lg:block'>
          {floatingIcons.map((icon, index) => (
            <div
              key={index}
              className={`absolute ${icon.position} p-1.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                unoptimized
                className='w-8 h-8 rounded-full'
              />
            </div>
          ))}
        </div>

        <div className='max-w-6xl mx-auto text-center relative z-10'>
          {/* Hero Heading */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl leading-[140%] font-semibold text-semi-blue pt-[89px] max-w-4xl mx-auto'>
            Connecting Juniorpros with exciting digital products.
          </h1>

          {/* Hero Subtext */}
          <p className='font-medium text-shadowBlue text-xl md:text-2xl pt-5 max-w-4xl mx-auto'>
            Expert-designed projects that make learning engaging, safe, and
            effective.
          </p>

          {/* Search Section */}
          <div className='pt-[72px] flex justify-center'>
            <div className='relative w-full max-w-xl'>
              <Input
                placeholder='Search for projects, skills, or technologies...'
                className='drop-shadow-blue-alpha drop-shadow-md rounded-4xl w-full placeholder-storm-500 py-5 pr-32'
              />
              <Button
                variant='primary'
                className='absolute right-2 top-2 rounded-4xl bg-unitedBlue py-3.5 px-6 hover:bg-opacity-90 transition-all duration-300'
              >
                Find Now
              </Button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className='pt-[69px] grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 max-w-4xl mx-auto'>
            {heroText.map(({ number, text }) => (
              <div
                key={number}
                className='flex flex-col gap-1.5 justify-center items-center hover:transform hover:scale-105 transition-transform duration-300'
              >
                <p className='text-3xl md:text-5xl font-bold text-muted-text'>
                  {number}
                </p>
                <p className='text-sm md:text-lg font-semibold text-center'>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: How It Works */}
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
                  projects. These beginner-friendly tasks are your first step
                  into the world of technology.
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

      {/* Section 3: Premium Tasks */}
      <section className='px-4 py-20 bg-white relative'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-16 lg:gap-20 items-start'>
            {/* Left Column - Dashboard Visual */}
            <div className='relative order-2 lg:-order-1'>
              {/* Main Dashboard Container */}
              <div className='bg-white rounded-3xl p-6 drop-shadow-2xl max-w-[420px] mx-auto lg:mx-0 relative'>
                <h3 className='text-lg font-semibold text-gray-800 pb-3'>
                  Daily Snapshot
                </h3>

                <div className='flex items-start justify-between'>
                  {/* Left Side - Stats */}
                  <div className='space-y-4'>
                    {/* Total Hours Card */}
                    <div className='bg-gray-100 rounded-2xl p-4 w-48'>
                      <p className='text-4xl font-bold text-orange-500 mb-1'>
                        3.2
                      </p>
                      <p className='text-sm'>Total Hours</p>
                    </div>

                    {/* Juniors Card */}
                    <div className='bg-gray-100 rounded-2xl p-4 w-48'>
                      <p className='text-4xl font-bold text-orange-500 mb-1'>
                        400
                      </p>
                      <p className='text-sm'>Juniors</p>
                    </div>
                  </div>

                  {/* Right Side - Donut Chart */}
                  <div className='relative w-24 h-24'>
                    <svg
                      className='w-24 h-24 transform -rotate-90'
                      viewBox='0 0 42 42'
                    >
                      {/* Background circle */}
                      <circle
                        cx='21'
                        cy='21'
                        r='15.5'
                        fill='none'
                        stroke='#fef3e2'
                        strokeWidth='6'
                      />
                      {/* Progress segments */}
                      <circle
                        cx='21'
                        cy='21'
                        r='15.5'
                        fill='none'
                        stroke='#fed7aa'
                        strokeWidth='6'
                        strokeDasharray='30 67'
                        strokeDashoffset='0'
                      />
                      <circle
                        cx='21'
                        cy='21'
                        r='15.5'
                        fill='none'
                        stroke='#fb923c'
                        strokeWidth='6'
                        strokeDasharray='25 72'
                        strokeDashoffset='-30'
                      />
                      <circle
                        cx='21'
                        cy='21'
                        r='15.5'
                        fill='none'
                        stroke='#ea580c'
                        strokeWidth='6'
                        strokeDasharray='20 77'
                        strokeDashoffset='-55'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Premium Tasks Badge */}
              <div className='absolute -bottom-28 left-1/4 lg:-left-8 bg-white rounded-xl w-fit px-12 py-4 border-none drop-shadow-xl border border-gray-100 flex items-center gap-2'>
                <div className='rounded flex items-center justify-center'>
                  <Star className=' text-yellow-600' />
                </div>
                <span className='text-lg font-medium text-yellow-600'>
                  Premium Tasks
                </span>
              </div>

              {/* Decorative Elements */}
              <div className='absolute -bottom-8 left-12 lg:-left-12 text-gray-200'>
                <Sparkles size={48} />
              </div>
              <div className='absolute -bottom-18 right-28 text-gray-200'>
                <Sparkles size={48} />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className='space-y-6 text-center lg:text-left'>
              <div>
                <p className='text-lg font-bold text-unitedBlue mb-4'>
                  Premium Tasks
                </p>
                <h3 className='font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-muted-text mb-6'>
                  Unlock More by Completing Premium Tasks
                </h3>
              </div>

              <div className='space-y-4'>
                <h4 className='font-semibold text-xl text-muted-text'>
                  Ready to go further?
                </h4>
                <p className='text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0'>
                  Complete at least 3 premium projects to level up your learning
                  and unlock team collaboration.
                </p>
              </div>

              <button className='font-bold text-lg text-unitedBlue flex gap-2 items-center hover:gap-3 transition-all duration-300 group mx-auto lg:mx-0'>
                <span>Explore Premium Tasks</span>
                <Image
                  src={rightBlueArrow}
                  alt='Arrow'
                  unoptimized
                  className='w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300'
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: CTA Section */}
      <section className='px-4 pt-12 bg-orange-50 relative overflow-hidden'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            {/* Left Column - Content */}
            <div className='space-y-8 text-center lg:text-left'>
              <div className='space-y-2'>
                <h2 className='font-medium text-[32px] leading-tight'>
                  Ready to Start Your Tech Journey?
                </h2>
                <p className='text-xl md:text-2xl text-shadowBlue leading-relaxed'>
                  Join thousands of juniors who are building their future in
                  technology.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-8 justify-center lg:justify-start items-center'>
                <Button className='bg-primary-400 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium text-lg transition-all duration-300'>
                  Get Started
                </Button>
                <button className='text-unitedBlue font-medium text-lg flex items-center gap-2 hover:gap-3 transition-all duration-300'>
                  Browse Project
                  <ChevronRight />
                </button>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className='flex justify-center'>
              <Image src={AboutUsImage} alt='About US' />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
