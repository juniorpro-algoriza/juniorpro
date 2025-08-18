interface CalendarHeaderProps {
  daysOfWeek: string[];
}

export const CalendarHeader = ({ daysOfWeek }: CalendarHeaderProps) => {
  return (
    <div className='grid grid-cols-7 border-b border-[#E8E8E8]'>
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className='p-3 font-medium text-[#969696] border-b border-[#E8E8E8] uppercase tracking-wide'
        >
          {day}
        </div>
      ))}
    </div>
  );
};
