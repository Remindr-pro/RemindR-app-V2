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
    const colorMap: Record<string, { bg: string; text: string }> = {
      purple: { bg: "bg-purple/20", text: "text-purple" },
      blue: { bg: "bg-blue/20", text: "text-blue" },
      pink: { bg: "bg-pink-1/20", text: "text-pink-1" },
      orange: { bg: "bg-orange/20", text: "text-orange" },
      camille: { bg: "bg-purple/20", text: "text-purple" },
      maxime: { bg: "bg-blue/20", text: "text-blue" },
      alice: { bg: "bg-pink-1/20", text: "text-pink-1" },
      milo: { bg: "bg-orange/20", text: "text-orange" },
    };

    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-light rounded-2xl p-6">
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-sm font-semibold text-gray-5 text-center py-2 font-inclusive"
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
              className={`min-h-[100px] border border-gray-2 rounded-lg p-2 flex flex-col cursor-pointer hover:bg-gray-1 transition-colors ${
                !isCurrentMonth ? "opacity-40" : ""
              } ${
                isTodayDate ? "bg-greenMain/5 border-greenMain" : "bg-light"
              }`}
            >
              <div
                className={`text-sm font-inclusive mb-1 ${
                  isTodayDate ? "text-greenMain font-bold" : "text-dark"
                }`}
              >
                {day.getDate()}
              </div>
              <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                {dayEvents.slice(0, 2).map((event) => {
                  const colors = getColorClasses(event);
                  return (
                    <div
                      key={event.id}
                      className={`${colors.bg} ${colors.text} rounded px-2 py-1 text-xs font-inclusive truncate flex items-center gap-1`}
                    >
                      {event.isReminder && (
                        <IconBell size={12} className={colors.text} />
                      )}
                      <span className="truncate">{event.title}</span>
                    </div>
                  );
                })}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-5 font-inclusive">
                    +{dayEvents.length - 2} autre
                    {dayEvents.length - 2 > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
