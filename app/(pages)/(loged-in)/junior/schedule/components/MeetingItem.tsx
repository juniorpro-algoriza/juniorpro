import type { Meeting } from '@types';
import { ClockIcon } from 'lucide-react';

interface MeetingItemProps {
  meeting: Meeting;
}

export const MeetingItem = ({ meeting }: MeetingItemProps) => {
  return (
    <div className='flex items-start space-x-3 p-4 shadow-lg rounded-2xl border border-gray-100'>
      <div className='flex-1 min-w-0'>
        <h3 className='font-medium text-violet-normal mb-1 truncate'>
          {meeting.title}
        </h3>
        <div className='flex items-center text-content-secondary space-x-1'>
          <ClockIcon size={20} />
          <span className='mt-0.5'>{meeting.time}</span>
        </div>
        <div className='text-content-secondary mt-1'>
          contributor:{' '}
          <span className='text-yankees-blue'>{meeting.contributor}</span>
        </div>
      </div>
    </div>
  );
};
