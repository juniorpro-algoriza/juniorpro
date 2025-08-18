import type { CalendarDay } from '@types';
import { EventBadge } from './EventBadge';

interface CalendarDayProps {
  day: CalendarDay;
}

export const CalendarDays = ({ day }: CalendarDayProps) => {
  return (
    <div className='border-r border-b border-[#E8E8E8] p-2 min-h-[100px] bg-white'>
      {/* Day Number */}
      <div className='flex justify-start mb-1'>
        <div
          className={`font-medium ${
            day.isToday
              ? 'bg-violet-normal text-white w-6 h-6 rounded-full flex items-center justify-center text-xs'
              : 'text-[#969696]'
          }`}
        >
          {day.dayNumber}
        </div>
      </div>

      {/* Events */}
      <div className='space-y-1 overflow-hidden'>
        {day.events.slice(0, 3).map((event) => (
          <EventBadge key={event.id} event={event} />
        ))}
        {day.events.length > 3 && (
          <div className='text-xs text-gray-400 text-center'>
            +{day.events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};
