import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../../../../public/images/logo.svg';

export const Logo = () => (
  <Link className='block' href='/'>
    <Image
      unoptimized
      className='block'
      src={logoImage}
      alt='Junior Pro Logo'
      width={150}
      height={45}
    />
  </Link>
);
