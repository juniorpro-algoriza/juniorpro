import { Button } from '@components';
import type { Project, ProjectType } from '@types';
import { CalendarDaysIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type BadgeText = 'Certifcate Earned' | 'In Progress' | ProjectType;
interface ProjectCardProps {
  project: Project;
  showDescription: boolean;
  showDueDate: boolean;
  showJuniors: boolean;
  showRating: boolean;
  showBadge: boolean;
  showBadgeNextToDueDate: boolean;
  badgeText: 'projectType' | 'status';
  className?: string;
  buttonText?: string;
}

export const ProjectCard = ({
  project,
  showDescription,
  showBadge,
  showDueDate,
  showJuniors,
  showRating,
  showBadgeNextToDueDate,
  className,
  buttonText = 'Report',
}: ProjectCardProps) => {
  const {
    id,
    category,
    description,
    imageUrl,
    isFree,
    projectType,
    rating,
    title,
    status,
    dueDate,
    juniors,
  } = project;

  //! TODO: When api is ready determine buttonText based on project status
  // let buttonText = "";
  // if (status === "not-started") buttonText = "Start";
  // if (status === "in-progress") buttonText = "Report";

  let badgeText: BadgeText = projectType;
  // if (status === "not-started") badgeText = projectType;
  if (status === 'completed') badgeText = 'Certifcate Earned';
  if (status === 'in-progress') badgeText = 'In Progress';

  return (
    <div
      data-id={id}
      className={`bg-white rounded-2xl space-y-3 p-3 shadow hover:shadow-xl border border-antiflash-white transition-all duration-300 group flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_25%] ${className}`}
    >
      <Header category={category} imageUrl={imageUrl} />
      {showRating && <Rating rating={rating} />}

      <div>
        <Main
          badgeText={badgeText}
          isFree={isFree}
          title={title}
          description={description}
          showDescription={showDescription}
          showBadge={showBadge}
          showBadgeNextToDueDate={showBadgeNextToDueDate}
        />
        {showDueDate && !showBadgeNextToDueDate && (
          <DueDate dueDate={dueDate} />
        )}

        {showJuniors && <Juniors juniors={juniors} />}

        <Button
          intent='unset'
          className='w-full border text-violet-normal border-violet-normal'
        >
          {/* TODO: When api is ready determine buttonText based on project status */}
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

const Header = ({ imageUrl = '', category = '' }) => {
  return (
    <div className='relative'>
      <Image
        src={imageUrl}
        alt='card image'
        width={100}
        height={100}
        // w-[330px] h-[183px]
        className='object-cover w-full rounded-xl max-h-[200px]'
      />
      <span className='absolute z-10 px-3 py-1 text-xs font-medium rounded-full top-2 left-2 bg-violet-50 text-violet-normal'>
        {category}
      </span>
    </div>
  );
};

const Rating = ({ rating = 0 }) => {
  return (
    <div className='flex items-center gap-1 py-2'>
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

interface BadeProps {
  isFree: boolean;
  text: BadgeText;
}
const Badge = ({ isFree, text }: BadeProps) => {
  let badgeClassName = '';

  if (text === 'Certifcate Earned')
    badgeClassName = 'bg-sucess-hover text-sucess-normal';
  return (
    <div className='flex items-center gap-2 pb-2'>
      <p
        className={twMerge(
          'px-3 py-2 text-sm capitalize bg-gray-100 rounded-full w-fit text-shadowBlue',
          badgeClassName
        )}
      >
        {text}
      </p>
      <span
        className={twMerge(
          'px-3 py-2 text-sm rounded-full w-fit',
          isFree
            ? 'bg-success-50 text-success-400'
            : 'bg-light-orange text-dark-orange'
        )}
      >
        {isFree ? 'Free' : 'Premium'}
      </span>
    </div>
  );
};

const Main = ({
  badgeText = '' as BadgeText,
  isFree = false,
  title = '',
  showDescription = true,
  showBadge = true,
  description = '',
  showBadgeNextToDueDate = false,
}) => {
  if (showBadgeNextToDueDate) {
    return (
      <>
        <h4 className='pb-2 font-medium'>{title}</h4>
        <div className='flex gap-2'>
          <DueDate />
          <Badge text={badgeText} isFree={isFree} />
        </div>
      </>
    );
  }

  return (
    <>
      {showBadge && <Badge text={badgeText} isFree={isFree} />}

      <h4 className='pb-2 font-medium'>{title}</h4>

      {showDescription && (
        <p className='pb-4 text-sm text-gray-500'>{description}</p>
      )}
    </>
  );
};

const DueDate = ({ dueDate = new Date() }) => {
  return (
    <div className='flex items-center gap-2 pb-2 text-content-secondary'>
      <CalendarDaysIcon />
      <p>{dueDate?.toISOString().split('T')[0]}</p>
    </div>
  );
};

const Juniors = ({ juniors }: { juniors: string[] }) => {
  return (
    <p className='pb-2 space-x-1'>
      <span className='text-content-secondary'>Juniors:</span>
      <span className='font-medium capitalize'>
        {juniors[0] === 'all juniors' ? ['Anas, Marwa'] : juniors.join(', ')}
      </span>
    </p>
  );
};
