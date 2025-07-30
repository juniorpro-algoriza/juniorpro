import { Button } from '@components';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    id,
    category,
    description,
    imageUrl,
    isFree,
    projectType,
    rating,
    title,
  } = project;
  return (
    <div
      data-id={id}
      className='bg-white rounded-2xl p-3 shadow-lg hover:shadow-xl border border-antiflash-white transition-all duration-300 group flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_25%]'
    >
      <div className='relative'>
        <Image
          src={imageUrl}
          alt='card image'
          width={100}
          height={100}
          className='w-[330px] h-[183px] object-cover rounded-xl'
        />
        <span className='absolute top-2 left-2 bg-violet-50 text-unitedBlue text-xs font-medium px-3 py-1 rounded-full z-10'>
          {category}
        </span>
      </div>

      <div className='flex items-center gap-1 py-2'>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>

      <div className='flex items-center gap-2 pb-2'>
        <p className='w-fit py-2 px-3 text-sm bg-gray-100 rounded-full text-shadowBlue'>
          {projectType}
        </p>
        {isFree && (
          <span className='w-fit py-2 px-3 text-sm bg-success-50 rounded-full text-success-400'>
            Free
          </span>
        )}
      </div>

      <h4 className='font-medium pb-2'>{title}</h4>
      <p className='text-sm text-gray-500 pb-4'>{description}</p>

      <Button
        intent='unset'
        className='w-full text-unitedBlue border border-unitedBlue'
      >
        Start
      </Button>
    </div>
  );
};
