import type { CalendarEvent, Meeting } from '@types';
import { CalendarWrapper, ScheduleHeader, TodaysMeetings } from './components';

const SchedulePage = () => {
  const todaysMeetings: Meeting[] = [
    {
      id: 1,
      title: 'Python Turtle Graphics',
      time: '10:00 AM',
      contributor: 'Adam',
    },
    {
      id: 2,
      title: 'Python Turtle Graphics',
      time: '10:00 AM',
      contributor: 'Adam',
    },
    {
      id: 3,
      title: 'Python Turtle Graphics',
      time: '10:00 AM',
      contributor: 'Adam',
    },
    {
      id: 4,
      title: 'Python Turtle Graphics',
      time: '10:00 AM',
      contributor: 'Adam',
    },
    {
      id: 5,
      title: 'Python Turtle Graphics',
      time: '10:00 AM',
      contributor: 'Adam',
    },
    {
      id: 6,
      title: 'Python Turtle Graphics',
      time: '10:00 AM',
      contributor: 'Adam',
    },
  ];

  const calendarEvents: CalendarEvent[] = [
    // January events
    { id: 1, title: '8:30', date: 8, time: '8:30 AM' },
    { id: 2, title: '4:30', date: 8, time: '4:30 PM' },
    { id: 3, title: '9:30', date: 8, time: '9:30 AM' },
    { id: 6, title: '4:30', date: 9, time: '4:30 PM' },
    { id: 7, title: '9:30', date: 9, time: '9:30 AM' },
    { id: 10, title: '8:30', date: 15, time: '8:30 AM' },
    { id: 11, title: '4:30', date: 15, time: '4:30 PM' },
    { id: 12, title: '9:30', date: 15, time: '9:30 AM' },
    { id: 13, title: '4:00', date: 15, time: '4:00 PM' },
    { id: 14, title: '4:30', date: 16, time: '4:30 PM' },
    { id: 15, title: '2:00', date: 16, time: '2:00 PM' },
    { id: 16, title: '9:30', date: 16, time: '9:30 AM' },
    { id: 19, title: '4:30', date: 22, time: '4:30 PM' },
    { id: 20, title: '4:00', date: 22, time: '4:00 PM' },
    { id: 23, title: '4:30', date: 23, time: '4:30 PM' },
    { id: 24, title: '8:30', date: 23, time: '8:30 AM' },
    { id: 27, title: '6:30', date: 29, time: '6:30 PM' },
    { id: 28, title: '4:30', date: 29, time: '4:30 PM' },
    { id: 29, title: '9:30', date: 29, time: '9:30 AM' },
    { id: 31, title: '4:30', date: 30, time: '4:30 PM' },
    { id: 32, title: '9:30', date: 30, time: '9:30 AM' },
    { id: 33, title: '4:30', date: 30, time: '4:30 PM' },
  ];

  return (
    <div className='min-h-screen py-3 px-6 space-y-5 bg-stone-50'>
      <ScheduleHeader />

      <div className='flex gap-4'>
        <TodaysMeetings meetings={todaysMeetings} />

        <CalendarWrapper calendarEvents={calendarEvents} />
      </div>
    </div>
  );
};

export default SchedulePage;
