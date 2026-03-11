"use server";

import api from "@/lib/api";
import type { CalendarReminderApi } from "@/app/utils/calendarReminders";

export interface ReminderType {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
}

interface ReminderTypesResponse {
  success: boolean;
  data: ReminderType[];
}

interface CreateReminderResponse {
  success: boolean;
  message: string;
  data: unknown;
}

/** Payload attendu par l'API POST /reminders */
export interface CreateReminderPayload {
  /** Id du bénéficiaire du rappel (membre de la famille). Si absent, l'API utilise l'utilisateur connecté. */
  userId?: string;
  typeId: string;
  title: string;
  description?: string;
  /** Format HH:MM:SS */
  scheduledTime: string;
  recurrence?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    daysOfWeek?: number[];
    dayOfMonth?: number;
    interval?: number;
  };
  /** Format YYYY-MM-DD */
  startDate?: string;
  /** Format YYYY-MM-DD */
  endDate?: string;
}

export async function getReminderTypes(): Promise<ReminderType[]> {
  const res = await api.get<ReminderTypesResponse>("/reminder-types", {
    next: { tags: ["reminder-types"] },
  });
  return res.data ?? [];
}

/**
 * Crée un rappel. Si payload.userId est fourni, le rappel est créé pour ce membre de la famille.
 * Sinon le backend utilise l'utilisateur connecté.
 */
export async function createReminder(
  payload: Omit<CreateReminderPayload, "typeId"> & { typeId?: string }
): Promise<void> {
  let typeId = payload.typeId;
  if (!typeId) {
    const types = await getReminderTypes();
    const preferred = types.find(
      (t) =>
        t.name.toLowerCase() === "appointment" ||
        t.name.toLowerCase() === "custom"
    );
    typeId = preferred?.id ?? types[0]?.id;
    if (!typeId) {
      throw new Error("Aucun type de rappel disponible.");
    }
  }

  const body: CreateReminderPayload = {
    ...(payload.userId && { userId: payload.userId }),
    typeId,
    title: payload.title,
    description: payload.description,
    scheduledTime: payload.scheduledTime,
    recurrence: payload.recurrence,
    startDate: payload.startDate,
    endDate: payload.endDate,
  };

  await api.post<CreateReminderResponse>("/reminders", body);
}

interface CalendarRemindersResponse {
  success: boolean;
  data: CalendarReminderApi[];
}

/**
 * Récupère les rappels du calendrier pour la plage [startIso, endIso].
 * Les dates doivent être au format ISO (ex. 2025-11-01T00:00:00.000Z).
 */
export async function getCalendarReminders(
  startIso: string,
  endIso: string
): Promise<CalendarReminderApi[]> {
  const res = await api.get<CalendarRemindersResponse>(
    `/reminders/calendar?start=${encodeURIComponent(startIso)}&end=${encodeURIComponent(endIso)}`,
    { next: { tags: ["reminders"] } }
  );
  return res.data ?? [];
}
