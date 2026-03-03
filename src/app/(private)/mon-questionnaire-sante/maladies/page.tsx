"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import QuestionnaireDiseasesStep, {
  type DiseaseProfileItem,
  type ProfileDiseaseData,
} from "@/app/components/organisms/QuestionnaireDiseasesStep";
import DiseaseModal, {
  type DiseaseFormData,
} from "@/app/components/organisms/DiseaseModal";
import {
  getQuestionnaireFamilyMembers,
  type QuestionnaireFamilyMember,
} from "@/app/actions/family";
import {
  createHealthProfile,
  getHealthProfileByUserId,
  getMyHealthProfile,
  updateHealthProfile,
  type HealthProfileData,
} from "@/app/actions/health";
import { useAuth } from "@/lib/auth-provider";
import type { User } from "@/lib/auth-provider";
import { sileo } from "sileo";
import { BASE_PATH } from "@/app/(private)/mon-questionnaire-sante/constants";

type PersistedDiseaseData = ProfileDiseaseData & {
  healthProfileId?: string;
};

function userToDiseaseProfile(user: User): DiseaseProfileItem {
  return {
    id: user.id,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "Moi",
    avatarUrl: user.profilePictureUrl ?? undefined,
    color: user.profileColor ?? undefined,
  };
}

function familyUserToDiseaseProfile(
  member: QuestionnaireFamilyMember,
): DiseaseProfileItem {
  return {
    id: member.id,
    name:
      [member.firstName, member.lastName].filter(Boolean).join(" ") || "Proche",
    avatarUrl: member.profilePictureUrl ?? undefined,
    color: member.profileColor ?? undefined,
  };
}

function mapHealthProfileToDiseaseData(
  healthProfile: HealthProfileData,
): PersistedDiseaseData {
  const allergies = Array.isArray((healthProfile as { allergies?: unknown }).allergies)
    ? ((healthProfile as { allergies?: string[] }).allergies ?? [])
    : [];
  const chronicConditions = Array.isArray(
    (healthProfile as { chronicConditions?: unknown }).chronicConditions,
  )
    ? ((healthProfile as { chronicConditions?: string[] }).chronicConditions ?? [])
    : [];
  const medications = Array.isArray(
    (healthProfile as { medications?: unknown }).medications,
  )
    ? ((healthProfile as { medications?: string[] }).medications ?? [])
    : [];

  return {
    healthProfileId: healthProfile.id,
    allergies,
    chronicConditions,
    medications,
  };
}

function normalizeList(items: string[]): string[] {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

export default function QuestionnaireMaladiesPage() {
  const { user } = useAuth();
  const [familyProfiles, setFamilyProfiles] = useState<DiseaseProfileItem[]>([]);
  const [diseasesByProfileId, setDiseasesByProfileId] = useState<
    Record<string, PersistedDiseaseData>
  >({});
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      if (!user?.id) return;

      try {
        const members = (await getQuestionnaireFamilyMembers())
          .filter((member) => member.isActive)
          .filter((member) => member.id !== user.id)
          .map(familyUserToDiseaseProfile);

        setFamilyProfiles(members);
      } catch {
        setFamilyProfiles([]);
      }
    };

    fetchFamilyMembers();
  }, [user?.id]);

  const profiles = useMemo(() => {
    const main = user ? userToDiseaseProfile(user) : null;
    return main ? [main, ...familyProfiles] : familyProfiles;
  }, [user, familyProfiles]);

  useEffect(() => {
    let isCancelled = false;

    const fetchDiseaseData = async () => {
      if (!user?.id || profiles.length === 0) return;

      const fetchedEntries = await Promise.all(
        profiles.map(async (profile) => {
          try {
            const healthProfile =
              profile.id === user.id
                ? await getMyHealthProfile()
                : await getHealthProfileByUserId(profile.id);

            if (!healthProfile) return [profile.id, undefined] as const;

            return [profile.id, mapHealthProfileToDiseaseData(healthProfile)] as const;
          } catch {
            return [profile.id, undefined] as const;
          }
        }),
      );

      if (isCancelled) return;

      const nextState: Record<string, PersistedDiseaseData> = {};
      fetchedEntries.forEach(([profileId, diseaseData]) => {
        if (diseaseData) nextState[profileId] = diseaseData;
      });

      setDiseasesByProfileId(nextState);
    };

    fetchDiseaseData();

    return () => {
      isCancelled = true;
    };
  }, [profiles, user?.id]);

  const profileBeingEdited = useMemo(
    () => profiles.find((profile) => profile.id === editingProfileId) ?? null,
    [profiles, editingProfileId],
  );

  const formDataForModal = useMemo<DiseaseFormData | undefined>(() => {
    if (!profileBeingEdited) return undefined;

    const data = diseasesByProfileId[profileBeingEdited.id];
    if (!data) return undefined;

    return {
      allergies: data.allergies.length ? data.allergies : [""],
      chronicConditions: data.chronicConditions.length ? data.chronicConditions : [""],
      allergyTreatments: data.medications.length ? data.medications : [""],
      diseaseTreatments: data.medications.length ? data.medications : [""],
      noAllergy: data.allergies.length === 0,
      noDisease: data.chronicConditions.length === 0,
    };
  }, [profileBeingEdited, diseasesByProfileId]);

  const handleOpenProfileModal = useCallback((profileId: string) => {
    setEditingProfileId(profileId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingProfileId(null);
  }, []);

  const handleValidateDiseases = useCallback(
    async (data: DiseaseFormData) => {
      if (!profileBeingEdited) return;

      const profileId = profileBeingEdited.id;
      const currentProfileData = diseasesByProfileId[profileId];
      const normalizedAllergies = normalizeList(data.allergies);
      const normalizedDiseases = normalizeList(data.chronicConditions);
      const normalizedAllergyTreatments = normalizeList(data.allergyTreatments);
      const normalizedDiseaseTreatments = normalizeList(data.diseaseTreatments);
      const normalizedTreatments = [
        ...new Set([...normalizedAllergyTreatments, ...normalizedDiseaseTreatments]),
      ];

      const nextLocalData: PersistedDiseaseData = {
        healthProfileId: currentProfileData?.healthProfileId,
        allergies: data.noAllergy ? [] : normalizedAllergies,
        chronicConditions: data.noDisease ? [] : normalizedDiseases,
        medications: normalizedTreatments,
      };

      setDiseasesByProfileId((prev) => ({
        ...prev,
        [profileId]: nextLocalData,
      }));
      setEditingProfileId(null);

      try {
        if (currentProfileData?.healthProfileId) {
          const updatedProfile = await updateHealthProfile(
            currentProfileData.healthProfileId,
            {
              allergies: data.noAllergy ? [] : normalizedAllergies,
              chronicConditions: data.noDisease ? [] : normalizedDiseases,
              medications: normalizedTreatments,
            },
          );

          setDiseasesByProfileId((prev) => ({
            ...prev,
            [profileId]: {
              ...prev[profileId],
              healthProfileId: updatedProfile.id,
            },
          }));
          sileo.success({
            title: "Maladies et allergies enregistrées avec succès.",
          });
          return;
        }

        const createdProfile = await createHealthProfile({
          userId: profileId,
          allergies: data.noAllergy ? [] : normalizedAllergies,
          chronicConditions: data.noDisease ? [] : normalizedDiseases,
          medications: normalizedTreatments,
        });

        setDiseasesByProfileId((prev) => ({
          ...prev,
          [profileId]: {
            ...prev[profileId],
            healthProfileId: createdProfile.id,
          },
        }));

        sileo.success({
          title: "Maladies et allergies enregistrées avec succès.",
        });
      } catch {
        sileo.error({
          title: "Impossible d'enregistrer les maladies et allergies.",
        });
      }
    },
    [diseasesByProfileId, profileBeingEdited],
  );

  return (
    <>
      <QuestionnaireDiseasesStep
        profiles={profiles}
        diseasesByProfileId={diseasesByProfileId}
        onCompleteProfile={handleOpenProfileModal}
      />

      <DiseaseModal
        key={editingProfileId ?? "closed"}
        isOpen={editingProfileId !== null}
        profileName={profileBeingEdited?.name ?? "Profil"}
        initialData={formDataForModal}
        onClose={handleCloseModal}
        onSubmit={handleValidateDiseases}
      />

      <QuestionnaireStepNavigation
        previousHref={`${BASE_PATH}/mesures`}
        nextHref={`${BASE_PATH}/habitudes`}
      />
    </>
  );
}
