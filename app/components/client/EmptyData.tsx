import SearchIcon from '@public/images/search_icon.svg';
import Image from 'next/image';

interface EmptyDataProps {
  description: string;
}

export const EmptyData = ({ description }: EmptyDataProps) => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center p-8'>
      <Image
        src={SearchIcon}
        alt='search icon'
        className='w-fit h-fit object-cover'
      />
      <p className='font-medium text-storm-500 text-xl'>{description}</p>
    </div>
  );
};
