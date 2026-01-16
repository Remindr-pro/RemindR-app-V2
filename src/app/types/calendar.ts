export type CalendarView = "month" | "week" | "day";

export type UserColor = "purple" | "blue" | "pink" | "orange";

export interface CalendarUser {
  id: string;
  name: string;
  color: UserColor;
  avatar?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  color?: UserColor;
  address?: string;
  details?: string;
  isReminder?: boolean;
  reminderTitle?: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}
