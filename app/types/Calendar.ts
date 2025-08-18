export interface Meeting {
  id: number;
  title: string;
  time: string;
  contributor: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: number;
  time: string;
}

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}
