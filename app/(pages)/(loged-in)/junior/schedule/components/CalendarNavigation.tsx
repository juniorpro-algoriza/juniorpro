import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarNavigationProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
  monthNames: string[];
}

export const CalendarNavigation = ({
  currentDate,
  onNavigate,
  monthNames,
}: CalendarNavigationProps) => {
  return (
    <div className='flex items-center justify-between mb-4'>
      <h2 className='text-2xl font-medium text-yankees-blue'>Calendar</h2>

      <div className='flex items-center space-x-4'>
        <button
          onClick={() => onNavigate('prev')}
          className='p-2 hover:bg-gray-100 rounded-md transition-colors hover:cursor-pointer'
        >
          <ChevronLeft className='w-5 h-5 text-gray-600' />
        </button>

        <h3 className='text-lg font-medium text-yankees-blue min-w-0'>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>

        <button
          onClick={() => onNavigate('next')}
          className='p-2 hover:bg-gray-100 rounded-md transition-colors hover:cursor-pointer'
        >
          <ChevronRight className='w-5 h-5 text-gray-600' />
        </button>
      </div>
    </div>
  );
};
