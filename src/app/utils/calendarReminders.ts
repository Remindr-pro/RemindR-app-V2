import type { CalendarEvent, UserColor } from "@/app/types/calendar";

/** Rappel tel que renvoyé par GET /reminders/calendar */
export interface CalendarReminderApi {
  id: string;
  userId: string;
  typeId: string;
  title: string;
  description: string | null;
  scheduledTime: string;
  startDate: string | null;
  endDate: string | null;
  recurrence: unknown;
  isActive: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

/**
 * Transforme les rappels API en événements calendrier.
 * userColorMap : id utilisateur -> couleur (ex. depuis les membres famille).
 */
export function mapCalendarRemindersToEvents(
  reminders: CalendarReminderApi[],
  userColorMap: Record<string, UserColor>
): CalendarEvent[] {
  const defaultColor: UserColor = "blue";
  return reminders.map((r) => {
    const rawDate = r.startDate || new Date().toISOString();
    const dateStr = rawDate.includes("T") ? rawDate.slice(0, 10) : rawDate;
    const [y, m, d] = dateStr.split("-").map(Number);
    const timePart = r.scheduledTime;
    let hours = 9;
    let minutes = 0;
    if (typeof timePart === "string") {
      const match = timePart.match(/(\d{1,2}):(\d{2})/);
      if (match) {
        hours = parseInt(match[1], 10);
        minutes = parseInt(match[2], 10);
      }
    }
    const startDate = new Date(y, m - 1, d, hours, minutes, 0);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);
    return {
      id: r.id,
      title: r.title,
      startDate,
      endDate,
      userId: r.user.id,
      color: userColorMap[r.user.id] ?? defaultColor,
      details: r.description ?? undefined,
      isReminder: true,
      reminderTitle: r.title,
    };
  });
}
