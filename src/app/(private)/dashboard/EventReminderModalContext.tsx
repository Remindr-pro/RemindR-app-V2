"use client";

import { createContext, useContext } from "react";

interface EventReminderModalContextValue {
  /** Ouvre la modale événement/rappel avec le type présélectionné (optionnel) */
  openEventReminderModal: (initialType?: "event" | "reminder") => void;
}

export const EventReminderModalContext = createContext<EventReminderModalContextValue | null>(null);

export function useEventReminderModal(): EventReminderModalContextValue | null {
  return useContext(EventReminderModalContext);
}
