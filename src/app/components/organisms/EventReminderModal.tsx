"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/app/components/atoms/Button";
import Input from "@/app/components/atoms/Input";
import Toggle from "@/app/components/atoms/Toggle";
import Textarea from "@/app/components/atoms/Textarea";
import Select from "@/app/components/atoms/Select";
import IconHelp from "@/app/components/atoms/icons/Help";
import ModalCloseButton from "@/app/components/molecules/ModalCloseButton";
import { getMyFamilyMembers } from "@/app/actions/family";
import type { UserColor } from "@/app/types/calendar";

const DEFAULT_AVATAR = "/images/illustrations/avatar.png";

const RECURRENCE_OPTIONS = [
  { value: "never", label: "Jamais" },
  { value: "daily", label: "Tous les jours" },
  { value: "weekly", label: "Toutes les semaines" },
  { value: "monthly", label: "Tous les mois" },
  { value: "yearly", label: "Tous les ans" },
];

const GUESTS_OPTIONS = [
  { value: "none", label: "Aucun" },
  { value: "optional", label: "Optionnel" },
  { value: "required", label: "Requis" },
];

export interface EventReminderFormData {
  type: "event" | "reminder";
  participantIds: string[];
  title: string;
  location: string;
  allDay: boolean;
  reminderWithTime: boolean;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  recurrence: string;
  guests: string;
  notes: string;
}

interface ParticipantChip {
  id: string;
  name: string;
  color: UserColor;
  avatar?: string;
}

export interface EventReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: EventReminderFormData) => void;
  initialType?: "event" | "reminder";
}

const defaultFormData: EventReminderFormData = {
  type: "event",
  participantIds: [],
  title: "",
  location: "",
  allDay: false,
  reminderWithTime: true,
  startDate: "",
  startTime: "12:00",
  endDate: "",
  endTime: "11:00",
  recurrence: "never",
  guests: "none",
  notes: "",
};

function formatDateForInput(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateFriendly(dateStr: string): string {
  if (!dateStr) return "Aujourd'hui";
  const d = new Date(dateStr + "T12:00:00");
  if (Number.isNaN(d.getTime())) return "Aujourd'hui";
  const today = new Date();
  if (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  ) {
    return "Aujourd'hui";
  }
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function EventReminderModal({
  isOpen,
  onClose,
  onSubmit,
  initialType,
}: EventReminderModalProps) {
  const [participants, setParticipants] = useState<ParticipantChip[]>([]);
  const [participantsLoading, setParticipantsLoading] = useState(true);
  const [formData, setFormData] =
    useState<EventReminderFormData>(defaultFormData);

  useEffect(() => {
    if (!isOpen) return;
    queueMicrotask(() => {
      setFormData((prev) => {
        const today = formatDateForInput(new Date());
        const next: EventReminderFormData = {
          ...defaultFormData,
          startDate: prev.startDate || today,
          endDate: prev.endDate || today,
        };
        if (initialType) {
          next.type = initialType;
          if (initialType === "reminder") {
            next.reminderWithTime = true;
            next.startTime = "12:00";
          }
        }
        return next;
      });
    });
  }, [isOpen, initialType]);

  useEffect(() => {
    if (!isOpen) return;
    const cancelled = { current: false };
    queueMicrotask(() => {
      if (!cancelled.current) setParticipantsLoading(true);
    });
    getMyFamilyMembers()
      .then((members) => {
        if (cancelled.current) return;
        setParticipants(
          members.map((m) => ({
            id: m.id,
            name: m.firstName,
            color: m.borderColor as UserColor,
          })),
        );
      })
      .finally(() => {
        if (!cancelled.current) setParticipantsLoading(false);
      });
    return () => {
      cancelled.current = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const toggleParticipant = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      participantIds: prev.participantIds.includes(id)
        ? prev.participantIds.filter((x) => x !== id)
        : [...prev.participantIds, id],
    }));
  };

  const colorClassesOutline: Record<UserColor, string> = {
    green: "text-greenMain border-2 border-greenMain bg-transparent",
    purple: "text-purple border-2 border-purple bg-transparent",
    blue: "text-blue border-2 border-blue bg-transparent",
    pink: "text-pink-1 border-2 border-pink-1 bg-transparent",
    orange: "text-orange border-2 border-orange bg-transparent",
  };

  const colorClassesSelected: Record<UserColor, string> = {
    green: "bg-greenMain text-light border-2 border-greenMain",
    purple: "bg-purple text-light border-2 border-purple",
    blue: "bg-blue text-light border-2 border-blue",
    pink: "bg-pink-1 text-light border-2 border-pink-1",
    orange: "bg-orange text-light border-2 border-orange",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-dark/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-reminder-modal-title"
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] flex flex-col bg-light rounded-2xl shadow-xl pt-12 pb-8 px-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalCloseButton onClose={onClose} ariaLabel="Fermer" />

        <h2
          id="event-reminder-modal-title"
          className="text-xl font-semibold font-inclusive text-dark mb-6"
        >
          Créer un événement ou rappel
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Type */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, type: "event" }))}
              className={`cursor-pointer flex-1 py-2.5 px-4 rounded-full font-inclusive text-sm font-semibold transition-colors ${
                formData.type === "event"
                  ? "bg-greenMain text-light"
                  : "border-2 border-greenMain text-greenMain bg-transparent hover:bg-greenMain/5"
              }`}
            >
              Événement
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  type: "reminder",
                  reminderWithTime: true,
                  startTime: "12:00",
                }))
              }
              className={`cursor-pointer flex-1 py-2.5 px-4 rounded-full font-inclusive text-sm font-semibold transition-colors ${
                formData.type === "reminder"
                  ? "bg-greenMain text-light"
                  : "border-2 border-greenMain text-greenMain bg-transparent hover:bg-greenMain/5"
              }`}
            >
              Rappel
            </button>
          </div>

          {/* Participants */}
          <div>
            <p className="text-dark font-inclusive text-base mb-2">
              Participants
            </p>
            {participantsLoading ? (
              <p className="text-gray-4 text-sm font-inclusive">Chargement…</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {participants.map((p) => {
                  const selected = formData.participantIds.includes(p.id);
                  const classes = selected
                    ? colorClassesSelected[p.color] || colorClassesSelected.blue
                    : colorClassesOutline[p.color] || colorClassesOutline.blue;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => toggleParticipant(p.id)}
                      className={`cursor-pointer inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold font-inclusive transition-colors ${classes}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-light/80 overflow-hidden flex items-center justify-center shrink-0">
                        <Image
                          src={DEFAULT_AVATAR}
                          alt=""
                          width={24}
                          height={24}
                          className="object-cover w-full h-full"
                        />
                      </span>
                      {p.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Titre */}
          <Input
            type="text"
            placeholder="Titre"
            value={formData.title}
            onChange={(e) =>
              setFormData((p) => ({ ...p, title: e.target.value }))
            }
          />

          {/* Lieu : uniquement pour événement */}
          {formData.type === "event" && (
            <Input
              type="text"
              placeholder="Lieu ou appel vidéo"
              value={formData.location}
              onChange={(e) =>
                setFormData((p) => ({ ...p, location: e.target.value }))
              }
            />
          )}

          {/* ——— Rappel : Date + Heure + toggle ——— */}
          {formData.type === "reminder" && (
            <>
              <div>
                <label className="block text-gray-4 font-inclusive text-base mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, startDate: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-greenMain font-inclusive text-base font-medium focus:outline-none focus:ring-2 focus:ring-greenMain"
                />
                <span className="block text-greenMain font-inclusive text-sm font-medium mt-1">
                  {formatDateFriendly(formData.startDate)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-gray-4 font-inclusive text-base mb-1">
                    Heure
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, startTime: e.target.value }))
                    }
                    disabled={!formData.reminderWithTime}
                    className="w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-greenMain font-inclusive text-base font-medium focus:outline-none focus:ring-2 focus:ring-greenMain disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  {formData.reminderWithTime && (
                    <span className="block text-greenMain font-inclusive text-sm font-medium mt-1">
                      {formData.startTime}
                    </span>
                  )}
                </div>
                <div className="flex items-end pb-1">
                  <Toggle
                    id="reminder-with-time"
                    checked={formData.reminderWithTime}
                    onChange={(checked) =>
                      setFormData((p) => ({
                        ...p,
                        reminderWithTime: checked,
                      }))
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* ——— Événement : Jour entier + Début / Fin ——— */}
          {formData.type === "event" && (
            <>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="event-all-day"
                  className="text-dark font-inclusive text-base"
                >
                  Jour entier
                </label>
                <Toggle
                  id="event-all-day"
                  checked={formData.allDay}
                  onChange={(checked) =>
                    setFormData((p) => ({ ...p, allDay: checked }))
                  }
                />
              </div>

              {!formData.allDay && (
                <>
                  <div>
                    <label className="block text-dark font-inclusive text-base mb-1">
                      Début
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            startDate: e.target.value,
                          }))
                        }
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base focus:outline-none focus:ring-2 focus:ring-greenMain"
                      />
                      <input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            startTime: e.target.value,
                          }))
                        }
                        className="w-32 px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base focus:outline-none focus:ring-2 focus:ring-greenMain"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-dark font-inclusive text-base mb-1">
                      Fin
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            endDate: e.target.value,
                          }))
                        }
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base focus:outline-none focus:ring-2 focus:ring-greenMain"
                      />
                      <input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            endTime: e.target.value,
                          }))
                        }
                        className="w-32 px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base focus:outline-none focus:ring-2 focus:ring-greenMain"
                      />
                    </div>
                  </div>
                </>
              )}

              {formData.allDay && (
                <div>
                  <label className="block text-dark font-inclusive text-base mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        startDate: e.target.value,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-3 bg-light text-dark font-inclusive text-base focus:outline-none focus:ring-2 focus:ring-greenMain"
                  />
                </div>
              )}
            </>
          )}

          {/* Récurrence */}
          <Select
            label="Récurrence"
            options={RECURRENCE_OPTIONS}
            value={formData.recurrence}
            onChange={(e) =>
              setFormData((p) => ({ ...p, recurrence: e.target.value }))
            }
          />

          {/* Invités */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Select
                label="Invités ?"
                options={GUESTS_OPTIONS}
                value={formData.guests}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, guests: e.target.value }))
                }
              />
            </div>
            <button
              type="button"
              className="mt-6 p-2 text-gray-4 hover:text-dark transition-colors"
              aria-label="Aide"
            >
              <IconHelp size={20} />
            </button>
          </div>

          {/* Notes */}
          <Textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData((p) => ({ ...p, notes: e.target.value }))
            }
            rows={3}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-5"
            >
              Annuler
            </Button>
            <Button type="submit" variant="green" className="px-5">
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
