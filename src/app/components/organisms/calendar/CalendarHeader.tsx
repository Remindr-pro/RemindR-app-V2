"use client";

import { CalendarView } from "@/app/types/calendar";
import {
  formatMonthYear,
  formatWeekRange,
  formatDayMonth,
  getWeekDays,
} from "@/app/utils/calendar";
import IconChevron from "@/app/components/atoms/icons/Chevron";

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
}

const CalendarHeader = ({
  currentDate,
  view,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
}: CalendarHeaderProps) => {
  const getDateLabel = () => {
    if (view === "month") {
      return formatMonthYear(currentDate);
    } else if (view === "week") {
      const weekDays = getWeekDays(new Date(currentDate));
      return formatWeekRange(weekDays[0], weekDays[6]);
    } else {
      return formatDayMonth(currentDate);
    }
  };

  const getViewLabel = () => {
    const labels = {
      month: "Mois",
      week: "Semaine",
      day: "Jour",
    };
    return labels[view];
  };

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onPrevious}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-2 transition-colors"
          aria-label="Précédent"
        >
          <IconChevron size={20} className="rotate-90" />
        </button>
        <h2 className="text-lg font-inclusive min-w-[200px] text-center">
          {getDateLabel()}
        </h2>
        <button
          onClick={onNext}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-2 transition-colors"
          aria-label="Suivant"
        >
          <IconChevron size={20} className="-rotate-90" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            value={view}
            onChange={(e) => onViewChange(e.target.value as CalendarView)}
            className="appearance-none bg-light border border-gray-2 rounded-lg px-4 py-2 pr-8 text-sm font-inclusive cursor-pointer hover:bg-gray-1 transition-colors"
          >
            <option value="month">Mois</option>
            <option value="week">Semaine</option>
            <option value="day">Jour</option>
          </select>
          <IconChevron
            size={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
        {view === "day" && (
          <div className="relative">
            <select
              defaultValue="07:00 - 20:00"
              className="appearance-none bg-light border border-gray-2 rounded-lg px-4 py-2 pr-8 text-sm font-inclusive cursor-pointer hover:bg-gray-1 transition-colors"
            >
              <option value="07:00 - 20:00">07:00 - 20:00</option>
            </select>
            <IconChevron
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        )}
        <button
          onClick={onToday}
          className="px-4 py-2 bg-light border border-gray-2 rounded-lg text-sm font-inclusive hover:bg-gray-1 transition-colors"
        >
          Aujourd&apos;hui
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
