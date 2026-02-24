"use client";

import { useState } from "react";
import Link from "next/link";
import IconBell from "../atoms/icons/Bell";
import IconArrowRight from "../atoms/icons/ArrowRight";
import IconChevron from "../atoms/icons/Chevron";
import Button from "../atoms/Button";
import IconPlus from "../atoms/icons/Plus";

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
  color: "pink" | "blue" | "purple";
}

export default function DashboardSidebar() {
  const [currentMonth, setCurrentMonth] = useState("Novembre 2025");
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(
    null,
  );

  const appointments: Appointment[] = [
    {
      id: "1",
      time: "10:00",
      endTime: "10:30",
      title: "RDV médecin",
      address: "31 rue Bruat - 29200 Brest",
      details: '2ème étage, interphone "Dr Roudout"',
      color: "blue",
    },
    {
      id: "2",
      time: "18:00",
      endTime: "19:00",
      title: "RDV psychologue",
      color: "purple",
    },
  ];

  const reminders: Reminder[] = [
    {
      id: "1",
      title: "M'T dents tous les ans !",
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

  // Générer les jours du calendrier pour novembre 2025
  const generateCalendarDays = () => {
    const days = [];
    // Les 4 derniers jours d'octobre (27-30) - affichés en gris
    for (let i = 27; i <= 30; i++) {
      days.push({ day: i, month: "prev", hasEvent: false });
    }
    // Les jours de novembre (1-30)
    for (let i = 1; i <= 30; i++) {
      days.push({
        day: i,
        month: "current",
        hasEvent: i === 6 || i === 13 || i === 20,
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const toggleAppointment = (id: string) => {
    setExpandedAppointment(expandedAppointment === id ? null : id);
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
            <h4 className="text-sm text-gray-5 font-inclusive">
              {currentMonth}
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {}}
                className="p-1 hover:bg-gray-1 rounded transition-colors"
                aria-label="Mois précédent"
              >
                <IconChevron size={16} className="rotate-90" />
              </button>
              <button
                onClick={() => {}}
                className="p-1 hover:bg-gray-1 rounded transition-colors"
                aria-label="Mois suivant"
              >
                <IconChevron size={16} className="-rotate-90" />
              </button>
            </div>
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => (
              <div
                key={index}
                className={`aspect-square flex flex-col items-center justify-center text-xs font-inclusive rounded ${
                  date.month === "prev"
                    ? "text-gray-3"
                    : date.hasEvent
                      ? "text-greenMain font-semibold bg-greenMain/5"
                      : "text-dark hover:bg-gray-1"
                } transition-colors cursor-pointer`}
              >
                <span>{date.day}</span>
                {date.hasEvent && (
                  <div className="flex gap-0.5 mt-0.5">
                    <span className="w-1 h-1 bg-greenMain rounded-full"></span>
                    <span className="w-1 h-1 bg-greenMain rounded-full"></span>
                    <span className="w-1 h-1 bg-greenMain rounded-full"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Rappels & Rendez-vous */}
      <div className="">
        <h3 className="text-base text-dark font-inclusive mb-4">
          Rappels & rendez-vous
        </h3>

        <div className="flex flex-col gap-3 mb-4">
          {/* Rappels */}
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`rounded-lg p-3 border-l-4 ${
                colorClasses[reminder.color]
              } flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow`}
            >
              <div className="flex items-center gap-2 flex-1">
                <IconBell
                  size={18}
                  className={textColorClasses[reminder.color]}
                />
                <span
                  className={`text-sm font-semibold font-inclusive ${
                    textColorClasses[reminder.color]
                  }`}
                >
                  {reminder.title}
                </span>
              </div>
              <IconArrowRight
                size={16}
                className={textColorClasses[reminder.color]}
              />
            </div>
          ))}

          {/* Rendez-vous */}
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`rounded-lg p-3 border-l-4 ${
                colorClasses[appointment.color]
              } cursor-pointer hover:shadow-sm transition-shadow`}
              onClick={() => toggleAppointment(appointment.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-dark font-inclusive">
                      {appointment.time}
                      {appointment.endTime && ` ${appointment.endTime}`}
                    </span>
                  </div>
                  <p
                    className={`text-sm font-semibold font-inclusive ${
                      textColorClasses[appointment.color]
                    }`}
                  >
                    {appointment.title}
                  </p>
                  {expandedAppointment === appointment.id &&
                    appointment.address && (
                      <div className="mt-2 text-xs text-gray-4 font-inclusive">
                        <p>{appointment.address}</p>
                        {appointment.details && (
                          <p className="mt-1">{appointment.details}</p>
                        )}
                      </div>
                    )}
                </div>
                {appointment.address && (
                  <IconChevron
                    size={16}
                    className={`text-gray-4 transition-transform ${
                      expandedAppointment === appointment.id ? "rotate-180" : ""
                    }`}
                  />
                )}
                {!appointment.address && (
                  <IconArrowRight
                    size={16}
                    className={textColorClasses[appointment.color]}
                  />
                )}
              </div>
            </div>
          ))}
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
