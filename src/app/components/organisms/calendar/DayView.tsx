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
        bg: "bg-purple/20",
        text: "text-purple",
        border: "border-purple",
      },
      blue: { bg: "bg-blue/20", text: "text-blue", border: "border-blue" },
      pink: {
        bg: "bg-pink-1/20",
        text: "text-pink-1",
        border: "border-pink-1",
      },
      orange: {
        bg: "bg-orange/20",
        text: "text-orange",
        border: "border-orange",
      },
      camille: {
        bg: "bg-purple/20",
        text: "text-purple",
        border: "border-purple",
      },
      maxime: { bg: "bg-blue/20", text: "text-blue", border: "border-blue" },
      alice: {
        bg: "bg-pink-1/20",
        text: "text-pink-1",
        border: "border-pink-1",
      },
      milo: {
        bg: "bg-orange/20",
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

  return (
    <div className="bg-light rounded-2xl p-6 relative">
      <div className="flex">
        {/* Time column */}
        <div className="w-20 flex-shrink-0">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-[60px] flex items-start justify-end pr-2 text-sm text-gray-5 font-inclusive"
            >
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/* Events column */}
        <div className="flex-1 relative">
          {/* Current time indicator */}
          {currentTimePosition !== null && (
            <div
              className="absolute left-0 right-0 z-10 pointer-events-none"
              style={{ top: `${currentTimePosition}px` }}
            >
              <div className="flex items-center">
                <div className="h-0.5 bg-red-1 flex-1"></div>
                <div className="w-3 h-3 bg-red-1 rounded-full"></div>
              </div>
            </div>
          )}

          {/* Hour slots */}
          <div className="relative">
            {hours.map((hour, index) => {
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

                    return (
                      <div
                        key={event.id}
                        className={`${colors.bg} ${colors.text} rounded-lg p-3 border-l-4 ${colors.border} w-full max-w-md flex flex-col gap-1`}
                      >
                        {event.isReminder ? (
                          <>
                            <div className="flex items-center gap-2">
                              <IconBell size={16} className={colors.text} />
                              <span className="font-semibold text-sm font-inclusive">
                                {event.reminderTitle || event.title}
                              </span>
                            </div>
                            {event.details && (
                              <p className="text-xs opacity-80">
                                {event.details}
                              </p>
                            )}
                            <div className="flex gap-2 mt-2">
                              <button className="text-xs px-3 py-1 bg-light rounded border border-gray-2 hover:bg-gray-1 transition-colors">
                                Prendre rendez-vous
                              </button>
                              <button className="text-xs underline">
                                En savoir plus
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-xs font-semibold">
                              {startTime} - {endTime}
                            </div>
                            <div className="font-semibold text-sm font-inclusive">
                              {event.title}
                            </div>
                            {event.address && (
                              <div className="text-xs opacity-80 mt-1">
                                {event.address}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
