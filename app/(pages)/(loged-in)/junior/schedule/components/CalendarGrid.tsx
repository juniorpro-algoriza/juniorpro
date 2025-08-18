import type { CalendarDay } from '@types';
import { CalendarDays } from './CalendarDays';
import { CalendarHeader } from './CalendarHeader';

interface CalendarGridProps {
  calendarDays: CalendarDay[];
  daysOfWeek: string[];
}

export const CalendarGrid = ({
  calendarDays,
  daysOfWeek,
}: CalendarGridProps) => {
  return (
    <div className='bg-white rounded-lg border border-[#E8E8E8] overflow-hidden h-full'>
      <CalendarHeader daysOfWeek={daysOfWeek} />

      <div className='grid grid-cols-7 auto-rows-fr h-screen'>
        {calendarDays.map((day, index) => (
          <CalendarDays key={index} day={day} />
        ))}
      </div>
    </div>
  );
};
