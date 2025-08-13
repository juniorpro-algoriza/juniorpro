import Image from 'next/image';

interface Achievement {
  title: string;
  date: string;
  progress: number;
  badgeUrl: string;
}

interface AchievementSectionProps {
  title: string;
  colorClass: string;
  achievements: Achievement[];
}

const AchievementCard = ({ title, date, progress, badgeUrl }: Achievement) => (
  <div className='flex bg-white rounded-xl shadow-lg overflow-hidden'>
    <div className='flex-1 w-3/5 p-3 space-y-1.5'>
      <p className='text-xs'>Achievement</p>
      <h3 className='text-sm font-medium text-yankees-blue'>{title}</h3>
      <p className='text-xs text-content-secondary'>{date}</p>
      <p className='text-xs text-yankees-blue'>{progress}% complete</p>
      <div className='w-full bg-gray-200 h-2 rounded-full'>
        <div
          className='bg-violet-normal h-2 rounded-full'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>

    <div className='bg-antiflash-white flex items-center justify-center p-3 w-2/5'>
      <Image
        src={badgeUrl}
        alt={title}
        width={64}
        height={64}
        className='w-16 h-16 object-contain'
      />
    </div>
  </div>
);

const AchievementSection = ({
  title,
  colorClass,
  achievements,
}: AchievementSectionProps) => (
  <div
    className={`flex- p-4 rounded-[20px] border border-border-primary shadow-md bg-white`}
  >
    <h2
      className={`text-lg text-center font-medium mb-4 py-2 px-6 rounded-lg text-yankees-blue ${colorClass}`}
    >
      {title}
    </h2>

    <div className='space-y-4'>
      {achievements.map((a, i) => (
        <AchievementCard key={i} {...a} />
      ))}
    </div>
  </div>
);

export const BadgesAchievements = () => {
  const freeTasks: Achievement[] = Array(5).fill({
    title: 'HTML & CSS Basics',
    date: '2025-06-15',
    progress: 48,
    badgeUrl: '/images/Rookie.svg',
  });

  const premiumTasks: Achievement[] = Array(3).fill({
    title: 'HTML & CSS Basics',
    date: '2025-06-15',
    progress: 48,
    badgeUrl: '/images/Expert.svg',
  });

  const teamProjects: Achievement[] = Array(2).fill({
    title: 'HTML & CSS Basics',
    date: '2025-06-15',
    progress: 48,
    badgeUrl: '/images/Mastermind.svg',
  });

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6'>
      <AchievementSection
        title='Free Tasks'
        colorClass='bg-light-mint'
        achievements={freeTasks}
      />
      <AchievementSection
        title='Premium Tasks'
        colorClass='bg-light-yellow'
        achievements={premiumTasks}
      />
      <AchievementSection
        title='Team Projects'
        colorClass='bg-violet-light'
        achievements={teamProjects}
      />
    </div>
  );
};
