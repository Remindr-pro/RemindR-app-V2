"use client";

import { useState } from "react";
import Link from "next/link";
import IconBell from "@/app/components/atoms/icons/Bell";
import IconArrowRight from "@/app/components/atoms/icons/ArrowRight";
import IconChevron from "@/app/components/atoms/icons/Chevron";
import IconPin from "@/app/components/atoms/icons/Pin";
import IconContract from "@/app/components/atoms/icons/Contract";
import Button from "@/app/components/atoms/Button";
import IconPlus from "@/app/components/atoms/icons/Plus";

interface Appointment {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  address?: string;
  details?: string;
  color: "pink" | "blue" | "purple";
}

interface Reminder {
  id: string;
  title: string;
  details?: string;
  color: "pink" | "blue" | "purple";
}

export default function DashboardSidebar() {
  const [viewDate, setViewDate] = useState(new Date());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const appointments: Appointment[] = [
    {
      id: "app-1",
      time: "10:00",
      endTime: "10:30",
      title: "RDV médecin",
      address: "31 rue Bruat - 29200 Brest",
      details: '2ème étage, interphone "Dr Roudout"',
      color: "blue",
    },
    {
      id: "app-2",
      time: "18:00",
      endTime: "19:00",
      title: "RDV psychologue",
      color: "purple",
    },
  ];

  const reminders: Reminder[] = [
    {
      id: "rem-1",
      title: "M'T dents tous les ans !",
      details: "Alice fête ses 7 ans ! Profitez d'un examen bucco-dentaire gratuit.",
      color: "pink",
    },
  ];

  const colorClasses = {
    pink: "bg-pink-1/10 border-pink-1",
    blue: "bg-blue/10 border-blue",
    purple: "bg-purple/10 border-purple",
  };

  const textColorClasses = {
    pink: "text-pink-1",
    blue: "text-blue",
    purple: "text-purple",
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
              const month = String(date.fullDate.getMonth() + 1).padStart(2, "0");
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

        <div className="flex flex-col gap-5 mb-4">
          {/* Rappels */}
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
                        <div className={`p-1.5 rounded-lg bg-light shadow-sm shrink-0`}>
                          <IconContract size={16} className={textColorClasses[reminder.color]} />
                        </div>
                        <p className={`text-[13px] font-medium font-inclusive italic ${textColorClasses[reminder.color]} opacity-80 leading-relaxed`}>
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
                    <div className={`px-4 py-2 rounded-lg bg-light border border-${appointment.color}/20 shadow-sm text-[14px] font-bold text-blue flex items-center justify-center min-w-[70px] ${textColorClasses[appointment.color]}`}>
                      {appointment.time}
                    </div>
                    {appointment.endTime && (
                      <div className={`px-4 py-2 rounded-lg bg-light border border-${appointment.color}/20 shadow-sm text-[14px] font-bold text-blue flex items-center justify-center min-w-[70px] ${textColorClasses[appointment.color]}`}>
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
                          <div className={`p-1.5 rounded-lg bg-light shadow-sm shrink-0`}>
                            <IconPin size={16} className={textColorClasses[appointment.color]} />
                          </div>
                          <p className={`text-[13px] font-medium font-inclusive italic ${textColorClasses[appointment.color]} opacity-90`}>
                            {appointment.address}
                          </p>
                        </div>
                      )}
                      {appointment.details && (
                        <div className="flex items-start gap-3">
                          <div className={`p-1.5 rounded-lg bg-light shadow-sm shrink-0`}>
                            <IconContract size={16} className={textColorClasses[appointment.color]} />
                          </div>
                          <p className={`text-[13px] font-medium font-inclusive italic ${textColorClasses[appointment.color]} opacity-80 leading-relaxed`}>
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

        <Link
          href="#"
          className="text-sm text-right text-greenMain hover:underline font-inclusive mb-4 block"
        >
          Tout voir
        </Link>

        <div className="flex flex-col gap-2">
          <Button variant="green" size="sm" className="w-full">
            <IconPlus size={16} />
            Ajouter un événement
          </Button>
          <Button variant="green" size="sm" className="w-full">
            <IconPlus size={16} />
            Ajouter un rappel
          </Button>
        </div>
      </div>
    </div>
  );
}
