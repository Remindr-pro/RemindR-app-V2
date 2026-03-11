"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Calendar from "@/app/components/organisms/Calendar";
import { CalendarEvent, CalendarUser } from "@/app/types/calendar";
import type { UserColor } from "@/app/types/calendar";
import { getMyFamilyMembers } from "@/app/actions/family";
import { getCalendarReminders } from "@/app/actions/reminders";
import { mapCalendarRemindersToEvents } from "@/app/utils/calendarReminders";

function mapFamilyMembersToCalendarUsers(
  members: Awaited<ReturnType<typeof getMyFamilyMembers>>,
): CalendarUser[] {
  return members.map((m) => ({
    id: m.id,
    name: m.firstName,
    color: m.borderColor as UserColor,
  }));
}

function getRangeForDate(date: Date, view: "month" | "week" | "day") {
  let start: Date;
  let end: Date;
  if (view === "month") {
    start = new Date(date.getFullYear(), date.getMonth(), 1);
    end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  } else if (view === "week") {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    start = new Date(date);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    end = new Date(start);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else {
    start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    end = new Date(start);
    end.setHours(23, 59, 59, 999);
  }
  return {
    startIso: start.toISOString(),
    endIso: end.toISOString(),
  };
}

export default function CalendarPage() {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<CalendarUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  const currentDate = useMemo(() => {
    const dateParam = searchParams.get("date");
    if (!dateParam) return new Date();
    const parsed = new Date(dateParam);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [searchParams]);

  const view = useMemo<"month" | "week" | "day">(() => {
    const v = searchParams.get("view");
    if (v === "month" || v === "week" || v === "day") return v;
    return "month";
  }, [searchParams]);

  const { startIso, endIso } = useMemo(
    () => getRangeForDate(currentDate, view),
    [currentDate, view]
  );

  useEffect(() => {
    let cancelled = false;
    getMyFamilyMembers()
      .then((members) => {
        if (!cancelled) {
          setUsers(mapFamilyMembersToCalendarUsers(members));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUsersError("Impossible de charger les profils.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setUsersLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const cancelled = { current: false };
    getCalendarReminders(startIso, endIso)
      .then((reminders) => {
        if (cancelled.current) return;
        const userColorMap: Record<string, UserColor> = {};
        users.forEach((u) => {
          userColorMap[u.id] = u.color;
        });
        setEvents(mapCalendarRemindersToEvents(reminders, userColorMap));
      })
      .catch(() => {
        if (!cancelled.current) {
          setEventsError("Impossible de charger les rappels.");
        }
      })
      .finally(() => {
        if (!cancelled.current) {
          setEventsLoading(false);
        }
      });
    return () => {
      cancelled.current = true;
    };
  }, [startIso, endIso, users]);

  if (usersError) {
    return (
      <div className="w-full mx-auto bg-gray-1 rounded-2xl p-8">
        <p className="text-red-500 font-inclusive">{usersError}</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-gray-1 rounded-2xl p-8">
      {usersLoading ? (
        <div className="flex items-center justify-center min-h-[200px] text-gray-4 font-inclusive">
          Chargement des profils…
        </div>
      ) : (
        <>
          {eventsError && (
            <p className="text-red-500 font-inclusive text-sm mb-4">
              {eventsError}
            </p>
          )}
          {eventsLoading && !events.length && (
            <p className="text-gray-4 font-inclusive text-sm mb-4">
              Chargement des rappels…
            </p>
          )}
          <Calendar events={events} users={users} />
        </>
      )}
    </div>
  );
}
