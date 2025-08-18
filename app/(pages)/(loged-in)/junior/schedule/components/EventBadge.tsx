import type { CalendarEvent } from '@types';

interface EventBadgeProps {
  event: CalendarEvent;
}

export const EventBadge = ({ event }: EventBadgeProps) => {
  return (
    <div
      className='text-xs bg-[#F984364D] bg-opacity-30 text-[#969696] px-2 py-1 rounded text-center font-medium truncate w-fit'
      title={`${event.title} - ${event.time}`}
    >
      {event.title}
    </div>
  );
};
