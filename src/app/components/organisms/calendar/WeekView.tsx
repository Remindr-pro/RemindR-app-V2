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

  return (
    <div className="bg-light rounded-2xl p-6">
      <div className="grid grid-cols-7">
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDay(events, day);
          const dayName = dayNames[index];

          return (
            <div
              key={index}
              className="flex flex-col cursor-pointer hover:bg-gray-1 transition-colors"
              onClick={() => onDayClick?.(day)}
            >
              <div className="text-center mb-4">
                <div className="text-sm font-semibold text-gray-5 font-inclusive">
                  {dayName} {day.getDate()}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2 border-l border-gray-2 px-2">
                {dayEvents.map((event) => {
                  const colors = getColorClasses(event);
                  const startTime = formatTime(new Date(event.startDate));
                  const endTime = formatTime(new Date(event.endDate));

                  return (
                    <div
                      key={event.id}
                      className={`${colors.bg} ${colors.text} rounded-lg p-3 border-l-4 ${colors.border} flex flex-col gap-1`}
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
                          <button className="text-xs underline mt-1 text-left">
                            En savoir plus
                          </button>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
