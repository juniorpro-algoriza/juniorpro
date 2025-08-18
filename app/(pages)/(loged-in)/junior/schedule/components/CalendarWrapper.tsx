'use client';

import type { CalendarEvent } from '@types';
import { useState } from 'react';
import { CalendarSection } from './CalendarSection';

interface CalendarWrapperProps {
  calendarEvents: CalendarEvent[];
}

export const CalendarWrapper = ({ calendarEvents }: CalendarWrapperProps) => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 16));

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <CalendarSection
      currentDate={currentDate}
      calendarEvents={calendarEvents}
      onNavigate={navigateMonth}
    />
  );
};
