import { CalendarDay, CalendarEvent } from "@/app/types/calendar";

export const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const days: Date[] = [];

  // Get first day of week (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDay.getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Convert to Monday = 0

  // Add days from previous month
  const prevMonth = new Date(year, month, 0);
  const daysInPrevMonth = prevMonth.getDate();
  for (let i = startOffset - 1; i >= 0; i--) {
    days.push(new Date(year, month - 1, daysInPrevMonth - i));
  }

  // Add days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  // Add days from next month to complete the grid (42 days total = 6 weeks)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i));
  }

  return days;
};

export const getWeekDays = (date: Date): Date[] => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
  const monday = new Date(d.setDate(diff));
  const week: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + i);
    week.push(dayDate);
  }

  return week;
};

export const formatMonthYear = (date: Date): string => {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatDayMonth = (date: Date): string => {
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  return `${days[date.getDay()]} ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const formatWeekRange = (startDate: Date, endDate: Date): string => {
  const months = [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ];
  return `${startDate.getDate()} ${
    months[startDate.getMonth()]
  } ${startDate.getFullYear()} - ${endDate.getDate()} ${
    months[endDate.getMonth()]
  } ${endDate.getFullYear()}`;
};

export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const getEventsForDay = (
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] => {
  return events.filter((event) => {
    const eventStart = new Date(event.startDate);
    return isSameDay(eventStart, date);
  });
};

export const getEventsForWeek = (
  events: CalendarEvent[],
  weekDays: Date[]
): CalendarEvent[] => {
  return events.filter((event) => {
    const eventStart = new Date(event.startDate);
    return weekDays.some((day) => isSameDay(eventStart, day));
  });
};

export const getHours = (): number[] => {
  return Array.from({ length: 14 }, (_, i) => i + 7); // 7h to 20h
};

export const getEventsForTimeSlot = (
  events: CalendarEvent[],
  hour: number,
  date: Date
): CalendarEvent[] => {
  return events.filter((event) => {
    const eventStart = new Date(event.startDate);
    if (!isSameDay(eventStart, date)) return false;
    return eventStart.getHours() === hour;
  });
};
