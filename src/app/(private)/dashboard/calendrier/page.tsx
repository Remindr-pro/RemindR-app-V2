"use client";

import Calendar from "@/app/components/organisms/Calendar";
import { CalendarEvent, CalendarUser } from "@/app/types/calendar";

export default function CalendarPage() {
  // Données d'exemple basées sur les images
  const users: CalendarUser[] = [
    { id: "camille", name: "Camille", color: "purple" },
    { id: "maxime", name: "Maxime", color: "blue" },
    { id: "alice", name: "Alice", color: "pink" },
    { id: "milo", name: "Milo", color: "orange" },
  ];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const events: CalendarEvent[] = [
    // Événements du 4
    {
      id: "1",
      title: "Mammographie...",
      startDate: new Date(year, month, 4),
      endDate: new Date(year, month, 4),
      userId: "camille",
      color: "purple",
      isReminder: true,
      reminderTitle: "Mammographie...",
    },
    {
      id: "2",
      title: "RDV médecin",
      startDate: new Date(year, month, 4),
      endDate: new Date(year, month, 4),
      userId: "alice",
      color: "pink",
    },
    // Événements du 6
    {
      id: "3",
      title: "M'T dents tous les ans !",
      startDate: new Date(year, month, 6),
      endDate: new Date(year, month, 6),
      userId: "alice",
      color: "pink",
      isReminder: true,
      reminderTitle: "M'T dents tous les ans !",
      details:
        "Aujourd'hui, Alice fête ses 7 ans ! 🎉 Grâce au programme M'T Dents, vous bénéficiez d'un rendez-vous gratuit chez le dentiste pour elle, pris en charge à 100% par l'Assurance Maladie.",
    },
    {
      id: "4",
      title: "RDV médecin",
      startDate: new Date(year, month, 6, 10, 0),
      endDate: new Date(year, month, 6, 10, 30),
      userId: "maxime",
      color: "blue",
    },
    {
      id: "5",
      title: "RDV psychologue",
      startDate: new Date(year, month, 6, 18, 0),
      endDate: new Date(year, month, 6, 19, 0),
      userId: "camille",
      color: "purple",
      address: "14 rue Paul Fort - 29200 Brest",
    },
    // Événement d'aujourd'hui pour tester DayView
    {
      id: "6",
      title: "Réunion test",
      startDate: new Date(year, month, today.getDate(), 14, 0),
      endDate: new Date(year, month, today.getDate(), 15, 0),
      userId: "maxime",
      color: "blue",
    },
  ];

  return (
    <div className="w-full mx-auto bg-gray-1 rounded-2xl p-8">
      <Calendar events={events} users={users} />
    </div>
  );
}
