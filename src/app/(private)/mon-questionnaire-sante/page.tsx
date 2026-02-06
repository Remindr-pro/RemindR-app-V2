"use client";

import { useState, useCallback, useMemo } from "react";
import QuestionnaireProfilesStep from "@/app/components/organisms/QuestionnaireProfilesStep";
import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import type { ProfileItem } from "@/app/components/organisms/QuestionnaireProfilesStep";
import { useAuth } from "@/lib/auth-provider";
import type { User } from "@/lib/auth-provider";
import { BASE_PATH } from "./constants";

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
  const profiles = useMemo(
    () =>
      mainProfile && showMainProfile
        ? [mainProfile, ...additionalProfiles]
        : additionalProfiles,
    [mainProfile, showMainProfile, additionalProfiles]
  );

  const handleCompleteProfile = useCallback((id: string) => {
    // TODO: navigation vers formulaire de complétion du profil
    console.log("Compléter le profil", id);
  }, []);

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

      <QuestionnaireStepNavigation
        quitterHref="/dashboard"
        nextHref={`${BASE_PATH}/mesures`}
      />
    </>
  );
}
