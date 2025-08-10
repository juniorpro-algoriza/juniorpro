import Link from 'next/link';

export const SignUpLink = () => (
  <p className='text-sm text-gray-600 text-center'>
    Don't Have An Account?{' '}
    <Link href='/auth/sign-up' className='text-violet-normal font-medium'>
      Register
    </Link>
  </p>
);
