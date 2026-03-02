"use server";

import api from "@/lib/api";

export interface DashboardCalendarReminder {
  id: string;
  title: string;
  startDate?: string | null;
  createdAt?: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface DashboardNotificationItem {
  id: string;
  title?: string | null;
  message?: string | null;
  sentAt: string;
}

interface CalendarResponse {
  success: boolean;
  data: DashboardCalendarReminder[];
}

interface NotificationResponse {
  success: boolean;
  data: DashboardNotificationItem[];
}

export async function getDashboardMemberData(
  selectedMemberId: string,
  startIso: string,
  endIso: string
): Promise<{
  reminders: DashboardCalendarReminder[];
  notifications: DashboardNotificationItem[];
}> {
  const [calendarPayload, notificationPayload] = await Promise.all([
    api.get<CalendarResponse>(
      `/reminders/calendar?start=${encodeURIComponent(startIso)}&end=${encodeURIComponent(endIso)}`
    ),
    api.get<NotificationResponse>(
      `/notifications?userId=${encodeURIComponent(selectedMemberId)}&limit=20`
    ),
  ]);

  return {
    reminders: calendarPayload.data || [],
    notifications: notificationPayload.data || [],
  };
}
