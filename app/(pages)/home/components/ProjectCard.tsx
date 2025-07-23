import { Star } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  category: string;
  image: string;
  description: string;
  rating?: number;
  difficulty?: string;
  isFree?: boolean;
  title?: string;
  onStart?: () => void;
}

export const ProjectCard = ({
  category,
  image,
  description,
  rating = 5,
  difficulty = 'Solo',
  isFree = false,
  title,
  onStart,
}: ProjectCardProps) => {
  return (
    <div className='bg-white rounded-2xl p-3 shadow-lg hover:shadow-xl border border-[#F0F0F0] transition-all duration-300 group'>
      <div className='relative'>
        <Image
          src={image}
          alt='card image'
          width={100}
          height={100}
          className='w-full h-full object-cover rounded-xl'
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
          {difficulty}
        </p>
        {isFree && (
          <span className='w-fit py-2 px-3 text-sm bg-success-50 rounded-full text-success-400'>
            Free
          </span>
        )}
      </div>

      <h4 className='font-medium pb-2'>{title}</h4>
      <p className='text-sm text-gray-500 pb-4'>{description}</p>

      <button
        onClick={() => onStart && onStart()}
        className='w-full bg-gray-100 hover:bg-blue-500 hover:text-white text-gray-700 font-medium py-2 rounded-lg transition-all duration-300'
      >
        Start
      </button>
    </div>
  );
};
