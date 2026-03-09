"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/app/components/molecules/SideBar";
import TopBar from "@/app/components/molecules/TopBar";
import ProfileCreateModal from "@/app/components/organisms/ProfileCreateModal";
import type { ProfileEditFormData } from "@/app/components/organisms/ProfileEditModal";
import { AuthService } from "@/lib/auth-service";
import { sileo } from "sileo";

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
    <div className="flex min-h-screen w-full bg-gray-1">
      <SideBar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-gray-1">
          <TopBar
            onMenuClick={handleOpenSidebar}
            onAddMemberClick={handleOpenCreateMemberModal}
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
    </div>
  );
};

export default DashboardLayoutClient;
