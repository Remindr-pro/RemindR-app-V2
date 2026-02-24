"use client";

import { useState, useMemo } from "react";
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
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date
  const [view, setView] = useState<CalendarView>("month");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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

    setCurrentDate(newDate);
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

    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
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
    setCurrentDate(date);
    setView("day");
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
