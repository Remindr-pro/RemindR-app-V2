"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import IconBell from "@/app/components/atoms/icons/Bell";
import IconArrowRight from "@/app/components/atoms/icons/ArrowRight";
import IconChevron from "@/app/components/atoms/icons/Chevron";
import IconPin from "@/app/components/atoms/icons/Pin";
import IconContract from "@/app/components/atoms/icons/Contract";
import Button from "@/app/components/atoms/Button";
import IconPlus from "@/app/components/atoms/icons/Plus";
import { useEventReminderModal } from "@/app/(private)/dashboard/EventReminderModalContext";
import { getCalendarReminders } from "@/app/actions/reminders";
import { getMyFamilyMembers } from "@/app/actions/family";
import type { CalendarReminderApi } from "@/app/utils/calendarReminders";

type SidebarColor = "pink" | "blue" | "purple" | "green" | "orange";

interface Appointment {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  address?: string;
  details?: string;
  color: SidebarColor;
}

interface Reminder {
  id: string;
  title: string;
  details?: string;
  color: SidebarColor;
}

function formatTimeFromApi(scheduledTime: string): string {
  const match = typeof scheduledTime === "string" && scheduledTime.match(/(\d{1,2}):(\d{2})/);
  if (!match) return "09:00";
  return `${match[1].padStart(2, "0")}:${match[2]}`;
}

function getEndTimeFromStart(startDate: string | null, scheduledTime: string, durationMinutes = 30): string {
  const dateStr = startDate?.slice(0, 10) || new Date().toISOString().slice(0, 10);
  const [h, m] = formatTimeFromApi(scheduledTime).split(":").map(Number);
  const end = new Date(`${dateStr}T12:00:00`);
  end.setHours(h, m + durationMinutes, 0, 0);
  return `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
}

export default function DashboardSidebar() {
  const [viewDate, setViewDate] = useState(new Date());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const eventReminderModal = useEventReminderModal();

  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString();
  }, []);
  const todayEnd = useMemo(() => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d.toISOString();
  }, []);

  useEffect(() => {
    const cancelled = { current: false };
    queueMicrotask(() => {
      if (!cancelled.current) setLoading(true);
    });
    Promise.all([
      getCalendarReminders(todayStart, todayEnd),
      getMyFamilyMembers(),
    ])
      .then(([apiReminders, members]) => {
        if (cancelled.current) return;
        const colorByUserId: Record<string, SidebarColor> = {};
        members.forEach((m) => {
          colorByUserId[m.id] = m.borderColor as SidebarColor;
        });
        const defaultColor: SidebarColor = "blue";

        const reminderList: Reminder[] = apiReminders.map((r: CalendarReminderApi) => ({
          id: r.id,
          title: r.title,
          details: r.description ?? undefined,
          color: (colorByUserId[r.user.id] as SidebarColor) ?? defaultColor,
        }));

        const appointmentList: Appointment[] = apiReminders
          .filter((r: CalendarReminderApi) => r.scheduledTime)
          .map((r: CalendarReminderApi) => ({
            id: `app-${r.id}`,
            time: formatTimeFromApi(r.scheduledTime),
            endTime: getEndTimeFromStart(r.startDate, r.scheduledTime),
            title: r.title,
            details: r.description ?? undefined,
            color: (colorByUserId[r.user.id] as SidebarColor) ?? defaultColor,
          }));

        setReminders(reminderList);
        setAppointments(appointmentList);
      })
      .catch(() => {
        if (!cancelled.current) {
          setReminders([]);
          setAppointments([]);
        }
      })
      .finally(() => {
        if (!cancelled.current) setLoading(false);
      });
    return () => {
      cancelled.current = true;
    };
  }, [todayStart, todayEnd]);

  const colorClasses: Record<SidebarColor, string> = {
    pink: "bg-pink-1/10 border-pink-1",
    blue: "bg-blue/10 border-blue",
    purple: "bg-purple/10 border-purple",
    green: "bg-greenMain/10 border-greenMain",
    orange: "bg-orange/10 border-orange",
  };

  const textColorClasses: Record<SidebarColor, string> = {
    pink: "text-pink-1",
    blue: "text-blue",
    purple: "text-purple",
    green: "text-greenMain",
    orange: "text-orange",
  };

  const badgeBorderClasses: Record<SidebarColor, string> = {
    pink: "border border-pink-1/20",
    blue: "border border-blue/20",
    purple: "border border-purple/20",
    green: "border border-greenMain/20",
    orange: "border border-orange/20",
  };

  const currentMonthName = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(viewDate);

  // Générer les jours du calendrier dynamiquement
  const generateCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Jour de la semaine du 1er jour (0 pour Dimanche, on veut 1 pour Lundi)
    let startDay = firstDayOfMonth.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1; // Ajuster pour que Lundi soit 0

    const days = [];

    // Jours du mois précédent
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        month: "prev",
        fullDate: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    // Jours du mois actuel
    const today = new Date();
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      days.push({
        day: i,
        month: "current",
        isToday,
        fullDate: date,
        // Simulation d'événements - à lier avec de vraies données plus tard
        hasEvent: [6, 13, 20].includes(i) && month === today.getMonth(),
      });
    }

    // Compléter avec les jours du mois suivant pour avoir 42 cases (6 semaines)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        month: "next",
        fullDate: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleToggle = (id: string, hasData: boolean) => {
    if (!hasData) return;
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="lg:sticky top-[100px] bg-light flex flex-col gap-6 w-full lg:w-70 xl:w-80 rounded-2xl p-6 shadow-md">
      {/* Section Calendrier */}
      <div>
        <h3 className="text-base text-dark font-inclusive mb-4">
          À venir - pour vous et vos{" "}
          <span className="text-greenMain">proches</span>.
        </h3>

        {/* Calendrier */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm text-gray-5 font-inclusive capitalize">
              {currentMonthName}
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-1 hover:bg-gray-1 rounded transition-colors"
                aria-label="Mois précédent"
              >
                <IconChevron size={16} className="rotate-90" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-1 rounded transition-colors"
                aria-label="Mois suivant"
              >
                <IconChevron size={16} className="-rotate-90" />
              </button>
            </div>
          </div>

          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
              <div
                key={index}
                className="aspect-square flex items-center justify-center text-[10px] font-bold text-gray-3 select-none"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const year = date.fullDate.getFullYear();
              const month = String(date.fullDate.getMonth() + 1).padStart(
                2,
                "0",
              );
              const day = String(date.fullDate.getDate()).padStart(2, "0");
              const dateString = `${year}-${month}-${day}`;

              return (
                <Link
                  key={index}
                  href={`/dashboard/calendrier?date=${dateString}`}
                  className={`aspect-square flex flex-col items-center justify-center text-xs font-inclusive rounded relative ${
                    date.month !== "current"
                      ? "text-gray-2"
                      : date.isToday
                        ? "bg-greenMain text-white font-bold shadow-sm"
                        : date.hasEvent
                          ? "text-greenMain font-semibold bg-greenMain/5"
                          : "text-dark hover:bg-gray-1"
                  } transition-all cursor-pointer`}
                >
                  <span>{date.day}</span>
                  {date.hasEvent && !date.isToday && (
                    <div className="absolute bottom-1 flex gap-0.5">
                      <span className="w-1 h-1 bg-greenMain rounded-full"></span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section Rappels & Rendez-vous */}
      <div className="">
        <h3 className="text-base text-dark font-inclusive mb-4">
          Rappels & rendez-vous
        </h3>

        {loading ? (
          <p className="text-gray-4 font-inclusive text-sm mb-4">
            Chargement…
          </p>
        ) : (
        <div className="flex flex-col gap-5 mb-4">
          {/* Rappels */}
          {reminders.length === 0 && appointments.length === 0 ? (
            <p className="text-gray-4 font-inclusive text-sm">
              Aucun rappel ni rendez-vous aujourd&apos;hui.
            </p>
          ) : null}
          {reminders.map((reminder) => {
            const hasData = !!reminder.details;
            const isExpanded = expandedId === reminder.id;

            return (
              <div
                key={reminder.id}
                className={`rounded-2xl p-6 border-l-[6px] ${
                  colorClasses[reminder.color]
                } flex flex-col gap-4 transition-all shadow-sm relative ${
                  hasData ? "cursor-pointer hover:shadow-md" : ""
                }`}
                onClick={() => handleToggle(reminder.id, hasData)}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-light shadow-sm">
                    <IconBell
                      size={22}
                      className={textColorClasses[reminder.color]}
                    />
                  </div>
                  {hasData ? (
                    <IconChevron
                      size={20}
                      className={`text-gray-5 opacity-60 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  ) : (
                    <IconArrowRight size={20} className="opacity-40" />
                  )}
                </div>
                <div className="flex-1">
                  <span
                    className={`text-[17px] font-bold font-inclusive ${
                      textColorClasses[reminder.color]
                    }`}
                  >
                    {reminder.title}
                  </span>
                  {isExpanded && reminder.details && (
                    <div className="mt-4 animate-fade-in pt-4 border-t border-gray-2/30">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-1.5 rounded-lg bg-light shadow-sm shrink-0`}
                        >
                          <IconContract
                            size={16}
                            className={textColorClasses[reminder.color]}
                          />
                        </div>
                        <p
                          className={`text-[13px] font-medium font-inclusive italic ${textColorClasses[reminder.color]} opacity-80 leading-relaxed`}
                        >
                          {reminder.details}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Rendez-vous */}
          {appointments.map((appointment) => {
            const hasData = !!(appointment.address || appointment.details);
            const isExpanded = expandedId === appointment.id;

            return (
              <div
                key={appointment.id}
                className={`rounded-2xl p-6 border-l-[6px] ${
                  colorClasses[appointment.color]
                } transition-all shadow-sm flex flex-col gap-4 ${
                  hasData ? "cursor-pointer hover:shadow-md" : ""
                }`}
                onClick={() => handleToggle(appointment.id, hasData)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-4 py-2 rounded-lg bg-light shadow-sm text-[14px] font-bold flex items-center justify-center min-w-[70px] ${textColorClasses[appointment.color]} ${badgeBorderClasses[appointment.color]}`}
                    >
                      {appointment.time}
                    </div>
                    {appointment.endTime && (
                      <div
                        className={`px-4 py-2 rounded-lg bg-light shadow-sm text-[14px] font-bold flex items-center justify-center min-w-[70px] ${textColorClasses[appointment.color]} ${badgeBorderClasses[appointment.color]}`}
                      >
                        {appointment.endTime}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    {hasData ? (
                      <IconChevron
                        size={20}
                        className={`text-gray-5 opacity-60 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    ) : (
                      <IconArrowRight size={20} className="opacity-40" />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <p
                    className={`text-[17px] font-bold font-inclusive ${
                      textColorClasses[appointment.color]
                    }`}
                  >
                    {appointment.title}
                  </p>
                  {isExpanded && (
                    <div className="mt-4 flex flex-col gap-3 animate-fade-in pt-4 border-t border-gray-2/30">
                      {appointment.address && (
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1.5 rounded-lg bg-light shadow-sm shrink-0`}
                          >
                            <IconPin
                              size={16}
                              className={textColorClasses[appointment.color]}
                            />
                          </div>
                          <p
                            className={`text-[13px] font-medium font-inclusive italic ${textColorClasses[appointment.color]} opacity-90`}
                          >
                            {appointment.address}
                          </p>
                        </div>
                      )}
                      {appointment.details && (
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-1.5 rounded-lg bg-light shadow-sm shrink-0`}
                          >
                            <IconContract
                              size={16}
                              className={textColorClasses[appointment.color]}
                            />
                          </div>
                          <p
                            className={`text-[13px] font-medium font-inclusive italic ${textColorClasses[appointment.color]} opacity-80 leading-relaxed`}
                          >
                            {appointment.details}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        )}

        <Link
          href="/dashboard/calendrier"
          className="text-sm text-right text-greenMain hover:underline font-inclusive mb-4 block"
        >
          Tout voir
        </Link>

        <div className="flex flex-col gap-2">
          <Button
            variant="green"
            size="sm"
            className="w-full"
            onClick={() => eventReminderModal?.openEventReminderModal("event")}
          >
            <IconPlus size={16} />
            Ajouter un événement
          </Button>
          <Button
            variant="green"
            size="sm"
            className="w-full"
            onClick={() =>
              eventReminderModal?.openEventReminderModal("reminder")
            }
          >
            <IconPlus size={16} />
            Ajouter un rappel
          </Button>
        </div>
      </div>
    </div>
  );
}
