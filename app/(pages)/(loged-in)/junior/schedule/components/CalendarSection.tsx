import type { CalendarDay, CalendarEvent } from '@types';
import { useMemo } from 'react';
import { CalendarGrid } from './CalendarGrid';
import { CalendarNavigation } from './CalendarNavigation';

interface CalendarSectionProps {
  currentDate: Date;
  calendarEvents: CalendarEvent[];
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const CalendarSection = ({
  currentDate,
  calendarEvents,
  onNavigate,
}: CalendarSectionProps) => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const currentDay = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayEvents = calendarEvents.filter(
        (event) =>
          event.date === currentDay.getDate() && currentDay.getMonth() === month
      );

      days.push({
        date: new Date(currentDay),
        dayNumber: currentDay.getDate(),
        isCurrentMonth: currentDay.getMonth() === month,
        isToday: currentDay.getDate() === 16 && currentDay.getMonth() === month,
        events: dayEvents,
      });

      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  }, [currentDate, calendarEvents]);

  return (
    <div className='flex-1 p-4 overflow-hidden bg-white rounded-2xl drop-shadow-xl border border-antiflash-white'>
      <CalendarNavigation
        currentDate={currentDate}
        onNavigate={onNavigate}
        monthNames={monthNames}
      />

      <CalendarGrid calendarDays={calendarDays} daysOfWeek={daysOfWeek} />
    </div>
  );
};
