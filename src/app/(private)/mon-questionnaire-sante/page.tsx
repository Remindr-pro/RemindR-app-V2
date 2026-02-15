"use client";

import { useState, useCallback, useMemo } from "react";
import QuestionnaireProfilesStep from "@/app/components/organisms/QuestionnaireProfilesStep";
import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import ProfileEditModal from "@/app/components/organisms/ProfileEditModal";
import type { ProfileItem } from "@/app/components/organisms/QuestionnaireProfilesStep";
import type { ProfileEditFormData } from "@/app/components/organisms/ProfileEditModal";
import { useAuth } from "@/lib/auth-provider";
import type { User } from "@/lib/auth-provider";
import { BASE_PATH } from "./constants";

function formGenderToProfileItem(
  value: string
): "Femme" | "Homme" | "Non précisé" {
  if (value === "non_precise") return "Non précisé";
  if (value === "Homme") return "Homme";
  if (value === "Femme") return "Femme";
  return "Non précisé";
}

function formatBirthdate(isoDate: string | null | undefined): string {
  if (!isoDate) return "--/--/----";
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "--/--/----";

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  } catch {
    return "--/--/----";
  }
}

function mapGenderToProfile(
  gender: string | null | undefined
): "Femme" | "Homme" | "Non précisé" {
  if (!gender) return "Non précisé";

  const g = gender.toLowerCase();
  if (g === "homme" || g === "male" || g === "m") return "Homme";
  if (g === "femme" || g === "female" || g === "f") return "Femme";

  return "Non précisé";
}

function userToProfileItem(user: User): ProfileItem {
  return {
    id: user.id,
    name:
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      "Profil principal",
    role: "Profil principal",
    birthdate: formatBirthdate(user.dateOfBirth ?? undefined),
    gender: mapGenderToProfile(
      user.genderActual ?? user.genderBirth ?? undefined
    ),
    avatarUrl: user.profilePictureUrl ?? undefined,
  };
}

export default function MonQuestionnaireSanteProfilsPage() {
  const { user } = useAuth();
  const mainProfile = useMemo(
    () => (user ? userToProfileItem(user) : null),
    [user]
  );
  const [showMainProfile, setShowMainProfile] = useState(true);
  const [additionalProfiles, setAdditionalProfiles] = useState<ProfileItem[]>(
    []
  );
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
  const [mainProfileOverride, setMainProfileOverride] = useState<{
    firstName: string;
    birthdate: string;
    gender: "Femme" | "Homme" | "Non précisé";
  } | null>(null);

  const displayedMainProfile = useMemo(() => {
    if (!mainProfile) return null;
    if (!mainProfileOverride) return mainProfile;
    return {
      ...mainProfile,
      name: mainProfileOverride.firstName || mainProfile.name,
      birthdate: mainProfileOverride.birthdate || mainProfile.birthdate,
      gender: mainProfileOverride.gender,
    };
  }, [mainProfile, mainProfileOverride]);

  const profiles = useMemo(
    () =>
      displayedMainProfile && showMainProfile
        ? [displayedMainProfile, ...additionalProfiles]
        : additionalProfiles,
    [displayedMainProfile, showMainProfile, additionalProfiles]
  );

  const profileBeingEdited = useMemo(
    () => profiles.find((p) => p.id === editingProfileId) ?? null,
    [profiles, editingProfileId]
  );

  const handleCompleteProfile = useCallback((id: string) => {
    setEditingProfileId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingProfileId(null);
  }, []);

  const handleValidateProfile = useCallback(
    (profileId: string, data: ProfileEditFormData) => {
      const gender = formGenderToProfileItem(data.genderBirth);

      if (mainProfile?.id === profileId) {
        setMainProfileOverride({
          firstName: data.firstName,
          birthdate: data.birthdate,
          gender,
        });
      } else {
        setAdditionalProfiles((prev) =>
          prev.map((p) =>
            p.id === profileId
              ? {
                  ...p,
                  name: data.firstName,
                  birthdate: data.birthdate,
                  gender,
                }
              : p
          )
        );
      }
    },
    [mainProfile?.id]
  );

  const handleRemoveProfile = useCallback(
    (id: string) => {
      if (mainProfile?.id === id) {
        setShowMainProfile(false);
      } else {
        setAdditionalProfiles((prev) => prev.filter((p) => p.id !== id));
      }
    },
    [mainProfile?.id]
  );

  const handleAddProfile = useCallback(() => {
    const newId = String(Date.now());
    setAdditionalProfiles((prev) => [
      ...prev,
      {
        id: newId,
        name: "Nouveau profil",
        role: "Profil à compléter",
        birthdate: "--/--/----",
        gender: "Femme",
      },
    ]);
  }, []);

  return (
    <>
      <QuestionnaireProfilesStep
        profiles={profiles}
        onCompleteProfile={handleCompleteProfile}
        onRemoveProfile={handleRemoveProfile}
        onAddProfile={handleAddProfile}
        mainProfileId={mainProfile?.id}
      />

      <ProfileEditModal
        isOpen={editingProfileId !== null}
        onClose={handleCloseModal}
        profile={profileBeingEdited}
        onValidate={handleValidateProfile}
      />

      <QuestionnaireStepNavigation
        quitterHref="/dashboard"
        nextHref={`${BASE_PATH}/mesures`}
      />
    </>
  );
}
