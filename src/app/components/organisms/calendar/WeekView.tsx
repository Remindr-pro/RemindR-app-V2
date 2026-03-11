"use client";

import { CalendarEvent } from "@/app/types/calendar";
import { getWeekDays, formatTime, getEventsForDay } from "@/app/utils/calendar";
import IconBell from "@/app/components/atoms/icons/Bell";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick?: (date: Date) => void;
}

const WeekView = ({ currentDate, events, onDayClick }: WeekViewProps) => {
  const weekDays = getWeekDays(new Date(currentDate));
  const dayNames = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const getColorClasses = (event: CalendarEvent) => {
    const color = event.color || "blue";
    const colorMap: Record<
      string,
      { bg: string; text: string; border: string }
    > = {
      green: {
        bg: "bg-greenMain/10",
        text: "text-greenMain",
        border: "border-greenMain",
      },
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
    };

    return colorMap[color] || colorMap.blue;
  };

  const isTodayDate = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="bg-light rounded-2xl overflow-hidden border border-gray-2 flex flex-col">
      <div className="grid grid-cols-7 flex-1">
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDay(events, day);
          const dayName = dayNames[index];
          const isActive = isTodayDate(day);

          return (
            <div
              key={index}
              className={`flex flex-col cursor-pointer transition-colors min-h-[600px] border-r border-gray-2 last:border-r-0 ${
                isActive ? "bg-gray-1/50" : "hover:bg-gray-1"
              }`}
              onClick={() => onDayClick?.(day)}
            >
              <div
                className={`text-center py-3 shrink-0 border-b border-gray-2 bg-gray-1 font-inclusive text-sm font-semibold ${
                  isActive ? "text-dark" : "text-gray-5"
                }`}
              >
                {dayName} {day.getDate()}
              </div>
              <div className="flex-1 p-2 flex flex-col gap-3">
                {dayEvents.map((event) => {
                  const colors = getColorClasses(event);
                  const startTime = formatTime(new Date(event.startDate));
                  const endTime = formatTime(new Date(event.endDate));

                  return (
                    <div
                      key={event.id}
                      className={`${colors.bg} ${colors.text} ${colors.border} rounded-xl p-3 border-l-4 shadow-sm flex flex-col gap-2`}
                    >
                      {event.isReminder ? (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded-md bg-light shadow-sm">
                              <IconBell size={14} className={colors.text} />
                            </div>
                            <span className="font-bold text-xs font-inclusive truncate">
                              {event.reminderTitle || event.title}
                            </span>
                          </div>
                          {event.details && (
                            <p className="text-[10px] leading-relaxed opacity-90 font-inclusive line-clamp-3">
                              {event.details}
                            </p>
                          )}
                          <button className="text-[10px] font-bold underline text-left hover:opacity-70 transition-opacity">
                            En savoir plus
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                            <span className="text-[10px] font-bold bg-blue/10 px-2 py-0.5 rounded text-blue">
                              {startTime}
                            </span>
                            <span className="text-[10px] font-bold bg-blue/10 px-2 py-0.5 rounded text-blue">
                              {endTime}
                            </span>
                          </div>
                          <div className="font-bold text-xs font-inclusive truncate">
                            {event.title}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
