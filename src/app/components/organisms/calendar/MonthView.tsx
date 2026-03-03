"use client";

import { CalendarEvent } from "@/app/types/calendar";
import { getDaysInMonth, isToday, getEventsForDay } from "@/app/utils/calendar";
import IconBell from "@/app/components/atoms/icons/Bell";

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick?: (date: Date) => void;
}

const MonthView = ({ currentDate, events, onDayClick }: MonthViewProps) => {
  const days = getDaysInMonth(currentDate);
  const weekDays = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

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

  return (
    <div className="bg-light rounded-2xl overflow-hidden border border-gray-2">
      <div className="grid grid-cols-7">
        {/* Day headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-sm font-semibold text-gray-5 text-center py-3 font-inclusive bg-gray-1 border-b border-gray-2"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(events, day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isTodayDate = isToday(day);

          return (
            <div
              key={index}
              onClick={() => onDayClick?.(day)}
              className={`min-h-[140px] border-b border-r border-gray-2 p-2 flex flex-col cursor-pointer hover:bg-gray-1 transition-colors relative ${
                (index + 1) % 7 === 0 ? "border-r-0" : ""
              } ${!isCurrentMonth ? "bg-gray-1/50" : "bg-light"} ${
                isTodayDate ? "bg-greenMain/5" : ""
              }`}
            >
              <div className="flex-1 flex flex-col gap-1.5 overflow-hidden mb-6">
                {dayEvents.slice(0, 3).map((event) => {
                  const colors = getColorClasses(event);
                  return (
                    <div
                      key={event.id}
                      className={`${colors.bg} ${colors.text} ${colors.border} rounded-lg border-l-4 px-2 py-1.5 text-[11px] font-inclusive truncate flex items-center gap-1.5 shadow-sm`}
                    >
                      {event.isReminder && (
                        <div className={`p-1 rounded-md bg-light shadow-sm`}>
                          <IconBell size={12} className={colors.text} />
                        </div>
                      )}
                      <span className="truncate font-medium">
                        {event.title}
                      </span>
                    </div>
                  );
                })}
                {dayEvents.length > 3 && (
                  <div className="text-[10px] text-gray-5 font-inclusive px-1">
                    +{dayEvents.length - 3} autre
                    {dayEvents.length - 3 > 1 ? "s" : ""}
                  </div>
                )}
              </div>

              <div
                className={`text-xs font-inclusive absolute bottom-2 right-2 ${
                  isTodayDate ? "text-greenMain font-bold" : "text-gray-5"
                } ${!isCurrentMonth ? "opacity-40" : ""}`}
              >
                {day.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
