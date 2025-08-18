import type { Meeting } from '@types';
import { MeetingItem } from './MeetingItem';

interface TodaysMeetingsProps {
  meetings: Meeting[];
}

export const TodaysMeetings = ({ meetings }: TodaysMeetingsProps) => {
  return (
    <div className='w-1/3 bg-white rounded-2xl p-4 overflow-y-auto drop-shadow-xl border border-antiflash-white'>
      <h2 className='text-2xl font-medium text-yankees-blue mb-4'>
        Today's Meetings ({meetings.length})
      </h2>
      <div className='space-y-3'>
        {meetings.map((meeting) => (
          <MeetingItem key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};
