// TODO: get image file from ui/ux team as the image in figma is 500x750
// we need an image that is the same size as design

import Image from 'next/image';
// import loginBg from "@public/images/hero-img.jpg";
import loginBg from '@public/images/hero-img.jpg';

export const HeroImage = () => {
  return (
    <div className='items-center h-screen hidden 2xl:flex'>
      <div className='relative'>
        <Image
          className='rounded-4xl max-h-[90vh] opacity-30 w-[740px] h-[854px]'
          src={loginBg}
          alt=''
          priority={true}
          placeholder='blur'
        />
        {/* Text overlay */}
        <TextOverlay />
      </div>
    </div>
  );
};

const TextOverlay = () => {
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center text-center'>
        <div className='flex flex-col items-start'>
          <h1 className='text-[40px] font-medium text-midnight mb-2'>
            Challenge starts here
          </h1>
          <p className='text-[32px] font-medium text-start text-slategray max-w-md'>
            Create an account to Join Our Community
          </p>
        </div>
      </div>
    </div>
  )
}
