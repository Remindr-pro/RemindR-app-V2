"use client";

import { CalendarEvent } from "@/app/types/calendar";
import {
  getHours,
  formatTime,
  getEventsForTimeSlot,
  isToday,
} from "@/app/utils/calendar";
import IconBell from "@/app/components/atoms/icons/Bell";

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
}

const DayView = ({ currentDate, events }: DayViewProps) => {
  const hours = getHours();
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const isCurrentDay = isToday(currentDate);

  const getColorClasses = (event: CalendarEvent) => {
    const color = event.color || event.userId;
    const colorMap: Record<
      string,
      { bg: string; text: string; border: string }
    > = {
      purple: {
        bg: "bg-purple/10",
        text: "text-purple",
        border: "border-purple",
      },
      blue: { bg: "bg-blue/10", text: "text-blue", border: "border-blue" },
      pink: { bg: "bg-pink-1/10", text: "text-pink-1", border: "border-pink-1" },
      orange: {
        bg: "bg-orange/10",
        text: "text-orange",
        border: "border-orange",
      },
      camille: {
        bg: "bg-purple/10",
        text: "text-purple",
        border: "border-purple",
      },
      maxime: { bg: "bg-blue/10", text: "text-blue", border: "border-blue" },
      alice: {
        bg: "bg-pink-1/10",
        text: "text-pink-1",
        border: "border-pink-1",
      },
      milo: {
        bg: "bg-orange/10",
        text: "text-orange",
        border: "border-orange",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const getCurrentTimePosition = () => {
    if (!isCurrentDay || currentHour < 7 || currentHour >= 20) return null;
    const hourIndex = currentHour - 7;
    const minuteOffset = currentMinute / 60;
    return (hourIndex + minuteOffset) * 60; // 60px per hour
  };

  const currentTimePosition = getCurrentTimePosition();

  // Find biggest reminder to display on the side if any
  const reminderEvent = events.find((e) => e.isReminder && e.details);

  return (
    <div className="bg-light rounded-2xl p-8 relative overflow-hidden border border-gray-2 shadow-sm min-h-[800px]">
      <div className="flex gap-8">
        {/* Time column */}
        <div className="w-16 flex-shrink-0">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-[60px] flex items-start justify-center text-[13px] font-bold text-gray-5 font-inclusive"
            >
              {hour}
            </div>
          ))}
        </div>

        {/* Events column */}
        <div className="flex-1 relative">
          {/* Current time indicator */}
          {currentTimePosition !== null && (
            <div
              className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
              style={{ top: `${currentTimePosition}px` }}
            >
              <div className="w-2 h-2 bg-red-1 rounded-full shrink-0"></div>
              <div className="h-0.5 bg-red-1 flex-1"></div>
              <div className="w-2 h-2 bg-red-1 rounded-full shrink-0"></div>
            </div>
          )}

          {/* Hour slots */}
          <div className="relative border-t border-gray-2">
            {hours.map((hour) => {
              const hourEvents = getEventsForTimeSlot(
                events,
                hour,
                currentDate
              );

              return (
                <div
                  key={hour}
                  className="h-[60px] border-b border-gray-2 flex items-start pt-1 relative"
                >
                  {hourEvents.map((event) => {
                    const colors = getColorClasses(event);
                    const startTime = formatTime(new Date(event.startDate));
                    const endTime = formatTime(new Date(event.endDate));

                    // Don't show the reminder again if it's the one displayed on the side
                    if (event.id === reminderEvent?.id) return null;

                    return (
                      <div
                        key={event.id}
                        className={`${colors.bg} ${colors.text} ${colors.border} rounded-xl p-3 border-l-4 shadow-sm flex flex-col gap-2 w-full max-w-[80%]`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-xs font-inclusive">
                            {event.title}
                          </span>
                          <span className="text-[10px] opacity-60 font-medium">
                            {startTime} - {endTime}
                          </span>
                        </div>
                        {event.address && (
                          <div className="flex items-center gap-1.5 opacity-60 text-[10px] font-inclusive">
                            <span className="shrink-0">📍</span>
                            <span className="truncate">{event.address}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reminder Sidebar (if applicable as per mockup) */}
        {reminderEvent && (
          <div className="w-72 shrink-0">
            <div className="bg-pink-1/10 rounded-2xl p-5 border border-pink-1/30 flex flex-col gap-4 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-1"></div>
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-light shadow-md">
                  <IconBell size={20} className="text-pink-1" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-sm text-pink-1 font-inclusive leading-tight">
                    {reminderEvent.reminderTitle || reminderEvent.title}
                  </h3>
                  <p className="text-[11px] text-pink-1/80 font-inclusive leading-relaxed mt-1">
                    {reminderEvent.details}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button className="w-full py-2 px-4 bg-light text-pink-1 text-[11px] font-bold rounded-full border border-pink-1/20 hover:bg-pink-1 hover:text-light transition-all shadow-sm">
                  Prendre rendez-vous
                </button>
                <button className="text-[11px] font-bold text-pink-1 underline hover:opacity-70 transition-opacity text-center">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayView;
