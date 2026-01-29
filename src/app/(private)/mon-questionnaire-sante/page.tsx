"use client";

import { useState, useCallback } from "react";
import QuestionnaireProfilesStep from "@/app/components/organisms/QuestionnaireProfilesStep";
import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import type { ProfileItem } from "@/app/components/organisms/QuestionnaireProfilesStep";
import { BASE_PATH } from "./constants";

const INITIAL_PROFILES: ProfileItem[] = [
  {
    id: "1",
    name: "Camille",
    role: "Profil principal",
    birthdate: "18/04/1988",
    gender: "Femme",
  },
];

export default function MonQuestionnaireSanteProfilsPage() {
  const [profiles, setProfiles] = useState<ProfileItem[]>(INITIAL_PROFILES);

  const handleCompleteProfile = useCallback((id: string) => {
    // TODO: navigation vers formulaire de complétion du profil
    console.log("Compléter le profil", id);
  }, []);

  const handleRemoveProfile = useCallback((id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleAddProfile = useCallback(() => {
    const newId = String(Date.now());
    setProfiles((prev) => [
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
      />

      <QuestionnaireStepNavigation
        quitterHref="/dashboard"
        nextHref={`${BASE_PATH}/mesures`}
      />
    </>
  );
}
