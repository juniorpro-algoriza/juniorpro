import Juniorpro from '@public/images/Juniorpro.svg';
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className='bg-gray-100 px-[91px] py-16'>
      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 justify-between gap-8'>
          <div className='lg:col-span-2'>
            <div className='space-y-4'>
              <Image unoptimized src={Juniorpro} alt='' />
              <p className='text-shadowBlue font-medium text-xl leading-relaxed max-w-sm'>
                Connecting Juniorpros with exciting digital products.
              </p>
            </div>
          </div>

          <div className='flex flex-col gap-3 justify-end items-end'>
            <div className='flex gap-3 space-y-4 '>
              <a href='#' className='text-lg font-medium text-shadowBlue'>
                Terms of Service
              </a>
              <a href='#' className='text-lg font-medium text-shadowBlue'>
                Privacy Policy
              </a>
            </div>
            <a
              href='mailto:support@juniorpro.com'
              className='text-xl font-medium text-blue-600 hover:text-blue-800'
            >
              support@juniorpro.com
            </a>
          </div>
        </div>

        <div className='flex gap-5 justify-center items-center'>
          <a href='#' className='text-lg font-medium text-shadowBlue'>
            Home
          </a>
          <a href='#' className='text-lg font-medium text-shadowBlue'>
            Browse Projects
          </a>
          <a href='#' className='text-lg font-medium text-shadowBlue'>
            Success Stories
          </a>
          <a href='#' className='text-lg font-medium text-shadowBlue'>
            About Us
          </a>
        </div>

        <div className='border-t border-gray-200  pt-8'>
          <div className='max-w-6xl mx-auto px-4'>
            <div className='text-center text-gray-500'>
              © 2025 JuniorPro. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
