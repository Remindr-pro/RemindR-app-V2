"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  CalendarView,
  CalendarEvent,
  CalendarUser,
} from "@/app/types/calendar";
import MonthView from "./calendar/MonthView";
import WeekView from "./calendar/WeekView";
import DayView from "./calendar/DayView";
import CalendarHeader from "./calendar/CalendarHeader";
import UserFilters from "./calendar/UserFilters";

interface CalendarProps {
  events?: CalendarEvent[];
  users?: CalendarUser[];
}

const Calendar = ({ events = [], users = [] }: CalendarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date
  const [view, setView] = useState<CalendarView>("month");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Helper to update URL with both date and view
  const syncUrl = (date: Date, newView: CalendarView) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const params = new URLSearchParams(searchParams.toString());
    params.set("date", dateString);
    params.set("view", newView);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Listen for changes in URL to update internal state
  useEffect(() => {
    const dateParam = searchParams.get("date");
    const viewParam = searchParams.get("view") as CalendarView;

    if (dateParam) {
      const parsedDate = new Date(dateParam);
      if (!isNaN(parsedDate.getTime())) {
        setCurrentDate(parsedDate);
      }
    }

    if (viewParam && ["month", "week", "day"].includes(viewParam)) {
      setView(viewParam);
    } else if (dateParam && !viewParam) {
      // If date is provided but no view, default to 'day' view as per user request
      setView("day");
    }
  }, [searchParams]);

  // Filter events by selected users
  const filteredEvents = useMemo(() => {
    if (selectedUsers.length === 0) return events;

    return events.filter((event) => selectedUsers.includes(event.userId));
  }, [events, selectedUsers]);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);

    if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }

    syncUrl(newDate, view);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);

    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }

    syncUrl(newDate, view);
  };

  const handleToday = () => {
    syncUrl(new Date(), view);
  };

  const handleViewChange = (newView: CalendarView) => {
    syncUrl(currentDate, newView);
  };

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleViewAll = () => {
    setSelectedUsers([]);
  };

  const handleDayClick = (date: Date) => {
    syncUrl(date, "day");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <UserFilters
        users={users}
        selectedUsers={selectedUsers}
        onUserToggle={handleUserToggle}
        onViewAll={handleViewAll}
      />
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onViewChange={handleViewChange}
      />
      <div className="flex-1 min-h-[600px]">
        {view === "month" && (
          <MonthView
            currentDate={currentDate}
            events={filteredEvents}
            onDayClick={handleDayClick}
          />
        )}
        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            events={filteredEvents}
            onDayClick={handleDayClick}
          />
        )}
        {view === "day" && (
          <DayView currentDate={currentDate} events={filteredEvents} />
        )}
      </div>
    </div>
  );
};

export default Calendar;
