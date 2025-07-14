import { Button, Input } from '@components';
import Image from 'next/image';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const LoginSlot = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Left Side - Login Form */}
      <div className='w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          {/* Logo */}
          <div className='mb-10'>
            <Image
              src={'/images/Juniorpro.svg'}
              alt='Junior Pro Logo'
              width={150}
              height={45}
            />
          </div>

          {/* Welcome Message */}
          <div className='mb-8'>
            <h2 className='text-2xl font-medium text-[#2B3453] tracking-wider mb-2'>
              Hello! Welcome back
            </h2>
          </div>

          {/* Social Login Buttons */}
          <div className='mb-6'>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <Button
                variant='secondary'
                className='w-full text-[#737F8E] hover:text-[#737F8E] justify-center bg-white border border-[#E2E6EE] hover:bg-gray-50 rounded-xl shadow text-sm'
                icon={<FcGoogle size={24} />}
              >
                Login With Google
              </Button>
              <Button
                variant='secondary'
                className='w-full text-[#737F8E] hover:text-[#737F8E] justify-center items-center bg-white border border-[#E2E6EE] hover:bg-gray-50 rounded-xl shadow text-sm'
                icon={<FaApple size={24} className='text-black mb-1' />}
              >
                Login With Apple
              </Button>
            </div>

            {/* OR Divider */}
            <div className='relative my-6'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-gray-50 text-gray-500'>OR</span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className='space-y-6'>
            <Input
              label='Email'
              type='email'
              placeholder='Enter email address'
            />

            <div>
              <Input
                label='Password'
                type='password'
                placeholder='Enter Password'
              />
              <div className='text-right mt-2'>
                <a href='#' className='text-sm text-[#96A0B6] font-medium'>
                  Forget Password?
                </a>
              </div>
            </div>

            <Button
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl'
              size='large'
            >
              Login
            </Button>
          </div>

          {/* Register Link */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Don't Have An Account?{' '}
              <a href='#' className='text-[#5879DC] font-medium'>
                Register
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className='w-1/2 relative overflow-hidden'>
        <div className='absolute inset-0 bg-cover bg-center bg-no-repeat rounded-xl m-6 opacity-30 bg-[url(/images/login-bg.jpg)]'></div>

        {/* Main Content */}
        <div className='relative z-10 flex flex-col items-center justify-center h-full text-center p-12'>
          <div className='flex flex-col items-start'>
            <h1 className='text-[40px] font-medium text-[#2B3453] mb-2 leading-tight'>
              Challenge starts here
            </h1>
            <p className='text-[32px] font-medium text-start text-[#737F8E] max-w-md leading-relaxed'>
              Create an account to Join Our Community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSlot;
