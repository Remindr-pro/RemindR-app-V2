"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/app/components/molecules/SideBar";
import TopBar from "@/app/components/molecules/TopBar";
import ProfileCreateModal from "@/app/components/organisms/ProfileCreateModal";
import EventReminderModal from "@/app/components/organisms/EventReminderModal";
import type { ProfileEditFormData } from "@/app/components/organisms/ProfileEditModal";
import type { EventReminderFormData } from "@/app/components/organisms/EventReminderModal";
import { createReminder } from "@/app/actions/reminders";
import { AuthService } from "@/lib/auth-service";
import { sileo } from "sileo";
import { EventReminderModalContext } from "@/app/(private)/dashboard/EventReminderModalContext";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

function buildCreateMemberPayload(data: ProfileEditFormData) {
  const birthDateIso =
    data.birthdate && /^\d{4}-\d{2}-\d{2}$/.test(data.birthdate)
      ? data.birthdate
      : null;
  const genderBirth =
    data.genderBirth === "non_precise" || data.genderBirth === ""
      ? undefined
      : data.genderBirth;
  const genderActual =
    data.genderActual === "non_precise" || data.genderActual === ""
      ? undefined
      : data.genderActual;
  const shouldCreateConnectedAccount =
    data.createLogin && !!data.link && data.link !== "moi";

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: birthDateIso || "",
    genderBirth: genderBirth || undefined,
    genderActual: genderActual || undefined,
    profileLink: data.link || undefined,
    profileColor: data.color || undefined,
    email: shouldCreateConnectedAccount ? data.email || undefined : undefined,
    createLogin: shouldCreateConnectedAccount,
    password: shouldCreateConnectedAccount
      ? data.password || undefined
      : undefined,
  };
}

const DashboardLayoutClient = ({ children }: DashboardLayoutClientProps) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateMemberModalOpen, setIsCreateMemberModalOpen] = useState(false);
  const [createMemberModalKey, setCreateMemberModalKey] = useState(0);
  const [isEventReminderModalOpen, setIsEventReminderModalOpen] = useState(false);
  const [eventReminderModalInitialType, setEventReminderModalInitialType] = useState<
    "event" | "reminder" | null
  >(null);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleOpenSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleOpenCreateMemberModal = useCallback(() => {
    setCreateMemberModalKey((k) => k + 1);
    setIsCreateMemberModalOpen(true);
  }, []);

  const handleCloseCreateMemberModal = useCallback(() => {
    setIsCreateMemberModalOpen(false);
  }, []);

  const handleOpenEventReminderModal = useCallback(
    (initialType?: "event" | "reminder") => {
      setEventReminderModalInitialType(initialType ?? null);
      setIsEventReminderModalOpen(true);
    },
    []
  );

  const handleCloseEventReminderModal = useCallback(() => {
    setIsEventReminderModalOpen(false);
    setEventReminderModalInitialType(null);
  }, []);

  const eventReminderModalContextValue = useMemo(
    () => ({
      openEventReminderModal: handleOpenEventReminderModal,
    }),
    [handleOpenEventReminderModal]
  );

  const handleSubmitEventReminder = useCallback(
    async (data: EventReminderFormData) => {
      if (data.type === "event") {
        sileo.info({
          title: "Les événements seront bientôt disponibles.",
        });
        return;
      }

      if (!data.title?.trim()) {
        sileo.error({ title: "Veuillez renseigner un titre." });
        return;
      }

      if (!data.participantIds?.length) {
        sileo.error({
          title: "Veuillez sélectionner au moins un participant.",
        });
        return;
      }

      const timeStr =
        data.reminderWithTime && data.startTime
          ? data.startTime.trim()
          : "09:00";
      const [h = "09", m = "00"] = timeStr.split(":");
      const scheduledTimeHHMMSS = `${h.padStart(2, "0")}:${m.padStart(2, "0")}:00`;

      const basePayload = {
        title: data.title.trim(),
        description: data.notes?.trim() || undefined,
        scheduledTime: scheduledTimeHHMMSS,
        recurrence:
          data.recurrence && data.recurrence !== "never"
            ? {
                frequency: data.recurrence as
                  | "daily"
                  | "weekly"
                  | "monthly"
                  | "yearly",
              }
            : undefined,
        startDate: data.startDate || undefined,
        endDate: data.endDate || undefined,
      };

      try {
        for (const userId of data.participantIds) {
          await createReminder({ ...basePayload, userId });
        }
        const count = data.participantIds.length;
        sileo.success({
          title:
            count === 1
              ? "Rappel créé."
              : `${count} rappels créés.`,
        });
        router.refresh();
      } catch (err) {
        sileo.error({
          title:
            err instanceof Error
              ? err.message
              : "Impossible de créer le rappel.",
        });
      }
    },
    [router],
  );

  const handleValidateCreateMember = useCallback(
    async (data: ProfileEditFormData) => {
      if (!data.firstName?.trim() || !data.lastName?.trim()) {
        sileo.error({
          title: "Veuillez renseigner le prénom et le nom.",
        });
        return;
      }
      const payload = buildCreateMemberPayload(data);
      if (!payload.dateOfBirth) {
        sileo.error({
          title: "Veuillez renseigner la date de naissance.",
        });
        return;
      }
      try {
        await AuthService.createFamilyMember(payload);

        const genderLabel = (
          data.genderActual ||
          data.genderBirth ||
          ""
        ).toLowerCase();
        const addedLabel =
          genderLabel === "femme"
            ? "ajoutée"
            : genderLabel === "homme"
              ? "ajouté"
              : "ajouté(e)";
        sileo.success({
          title: `${data.firstName} a bien été ${addedLabel} à vos proches.`,
        });
        router.refresh();
      } catch (err) {
        sileo.error({
          title:
            err instanceof Error
              ? err.message
              : "Impossible d'ajouter ce proche pour le moment.",
        });
      }
    },
    [router],
  );

  return (
    <EventReminderModalContext.Provider value={eventReminderModalContextValue}>
      <div className="flex min-h-screen w-full bg-gray-1">
        <SideBar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 bg-gray-1">
            <TopBar
              onMenuClick={handleOpenSidebar}
              onAddMemberClick={handleOpenCreateMemberModal}
              onAddEventClick={() => handleOpenEventReminderModal()}
            />
          </header>
          <main className="flex-1 px-6 xl:px-10 pb-8">{children}</main>
        </div>

        <ProfileCreateModal
          key={createMemberModalKey}
          isOpen={isCreateMemberModalOpen}
          onClose={handleCloseCreateMemberModal}
          onValidate={handleValidateCreateMember}
        />

        <EventReminderModal
          isOpen={isEventReminderModalOpen}
          onClose={handleCloseEventReminderModal}
          onSubmit={handleSubmitEventReminder}
          initialType={eventReminderModalInitialType ?? undefined}
        />
      </div>
    </EventReminderModalContext.Provider>
  );
};

export default DashboardLayoutClient;
