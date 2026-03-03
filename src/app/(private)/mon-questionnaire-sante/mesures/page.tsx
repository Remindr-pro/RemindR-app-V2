"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import QuestionnaireMeasuresStep, {
  type MeasureProfileItem,
  type ProfileMeasureData,
} from "@/app/components/organisms/QuestionnaireMeasuresStep";
import MeasurementModal, {
  type MeasurementFormData,
} from "@/app/components/organisms/MeasurementModal";
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

function userToMeasureProfile(user: User): MeasureProfileItem {
  return {
    id: user.id,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "Moi",
    avatarUrl: user.profilePictureUrl ?? undefined,
    color: user.profileColor ?? undefined,
  };
}

function familyUserToMeasureProfile(
  member: QuestionnaireFamilyMember,
): MeasureProfileItem {
  return {
    id: member.id,
    name:
      [member.firstName, member.lastName].filter(Boolean).join(" ") || "Proche",
    avatarUrl: member.profilePictureUrl ?? undefined,
    color: member.profileColor ?? undefined,
  };
}

function toDisplayDate(value: string): string {
  if (!value) return "";

  const datePart = value.includes("T") ? value.split("T")[0] : value;
  const isoMatch = datePart.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!isoMatch) return value;

  const [, year, month, day] = isoMatch;
  return `${day}/${month}/${year}`;
}

function toInputDate(value: string): string {
  if (!value) return "";

  const displayMatch = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!displayMatch) return value;

  const [, day, month, year] = displayMatch;
  return `${year}-${month}-${day}`;
}

type PersistedMeasureData = ProfileMeasureData & {
  healthProfileId?: string;
};

function toDisplayMeasureValue(
  value: number | string | null | undefined,
): string {
  if (value === null || value === undefined) return "";

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return "";

  return Number.isInteger(numericValue)
    ? String(numericValue)
    : numericValue.toString();
}

function parsePositiveNumber(
  rawValue: string,
  fieldLabel: "taille" | "poids",
): number | undefined {
  const normalized = rawValue.trim().replace(",", ".");
  if (!normalized) return undefined;

  const numericValue = Number(normalized);
  if (Number.isNaN(numericValue) || numericValue <= 0) {
    sileo.error({ title: `Veuillez saisir une ${fieldLabel} valide.` });
    return undefined;
  }

  return numericValue;
}

function toApiDateTime(value: string): string | undefined {
  if (!value.trim()) return undefined;

  const normalized = toInputDate(value.trim());
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) return undefined;
  return `${normalized}T00:00:00.000Z`;
}

function mapHealthProfileToMeasureData(
  healthProfile: HealthProfileData,
): PersistedMeasureData {
  return {
    healthProfileId: healthProfile.id,
    height: toDisplayMeasureValue(healthProfile.height),
    weight: toDisplayMeasureValue(healthProfile.weight),
    heightMeasuredAt: toDisplayDate(healthProfile.heightMeasuredAt ?? ""),
    weightMeasuredAt: toDisplayDate(healthProfile.weightMeasuredAt ?? ""),
  };
}

export default function QuestionnaireMesuresPage() {
  const { user } = useAuth();
  const [familyProfiles, setFamilyProfiles] = useState<MeasureProfileItem[]>(
    [],
  );
  const [measuresByProfileId, setMeasuresByProfileId] = useState<
    Record<string, PersistedMeasureData>
  >({});
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      if (!user?.id) return;

      try {
        const members = (await getQuestionnaireFamilyMembers())
          .filter((member) => member.isActive)
          .filter((member) => member.id !== user.id)
          .map(familyUserToMeasureProfile);

        setFamilyProfiles(members);
      } catch {
        // En cas d'erreur API, on garde juste le profil principal.
        setFamilyProfiles([]);
      }
    };

    fetchFamilyMembers();
  }, [user?.id]);

  const profiles = useMemo(() => {
    const main = user ? userToMeasureProfile(user) : null;
    return main ? [main, ...familyProfiles] : familyProfiles;
  }, [user, familyProfiles]);

  useEffect(() => {
    let isCancelled = false;

    const fetchMeasures = async () => {
      if (!user?.id || profiles.length === 0) return;

      const fetchedEntries = await Promise.all(
        profiles.map(async (profile) => {
          try {
            const healthProfile =
              profile.id === user.id
                ? await getMyHealthProfile()
                : await getHealthProfileByUserId(profile.id);

            if (!healthProfile) {
              return [profile.id, undefined] as const;
            }

            return [
              profile.id,
              mapHealthProfileToMeasureData(healthProfile),
            ] as const;
          } catch {
            return [profile.id, undefined] as const;
          }
        }),
      );

      if (isCancelled) return;

      const nextMeasures: Record<string, PersistedMeasureData> = {};
      fetchedEntries.forEach(([profileId, measureData]) => {
        if (measureData) {
          nextMeasures[profileId] = measureData;
        }
      });

      setMeasuresByProfileId(nextMeasures);
    };

    fetchMeasures();

    return () => {
      isCancelled = true;
    };
  }, [profiles, user?.id]);

  const profileBeingEdited = useMemo(
    () => profiles.find((profile) => profile.id === editingProfileId) ?? null,
    [profiles, editingProfileId],
  );

  const formDataForModal = useMemo<MeasurementFormData | undefined>(() => {
    if (!profileBeingEdited) return undefined;

    const data = measuresByProfileId[profileBeingEdited.id];

    if (!data) return undefined;

    return {
      height: data.height ?? "",
      heightMeasuredAt: toInputDate(data.heightMeasuredAt ?? ""),
      weight: data.weight ?? "",
      weightMeasuredAt: toInputDate(data.weightMeasuredAt ?? ""),
    };
  }, [profileBeingEdited, measuresByProfileId]);

  const handleOpenProfileModal = useCallback((profileId: string) => {
    setEditingProfileId(profileId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingProfileId(null);
  }, []);

  const handleValidateMeasures = useCallback(
    async (data: MeasurementFormData) => {
      if (!profileBeingEdited) return;

      const parsedHeight = parsePositiveNumber(data.height, "taille");
      const parsedWeight = parsePositiveNumber(data.weight, "poids");

      if (data.height.trim() && parsedHeight === undefined) return;
      if (data.weight.trim() && parsedWeight === undefined) return;

      const profileId = profileBeingEdited.id;
      const currentProfileData = measuresByProfileId[profileId];
      const heightMeasuredAtIso = toApiDateTime(data.heightMeasuredAt);
      const weightMeasuredAtIso = toApiDateTime(data.weightMeasuredAt);

      const nextLocalData: PersistedMeasureData = {
        healthProfileId: currentProfileData?.healthProfileId,
        height: data.height || undefined,
        heightMeasuredAt: toDisplayDate(data.heightMeasuredAt),
        weight: data.weight || undefined,
        weightMeasuredAt: toDisplayDate(data.weightMeasuredAt),
      };

      setMeasuresByProfileId((prev) => ({
        ...prev,
        [profileId]: nextLocalData,
      }));
      setEditingProfileId(null);

      try {
        if (currentProfileData?.healthProfileId) {
          const updatedProfile = await updateHealthProfile(
            currentProfileData.healthProfileId,
            {
              height: parsedHeight,
              heightMeasuredAt: heightMeasuredAtIso,
              weight: parsedWeight,
              weightMeasuredAt: weightMeasuredAtIso,
            },
          );

          if (updatedProfile?.id) {
            setMeasuresByProfileId((prev) => ({
              ...prev,
              [profileId]: {
                ...prev[profileId],
                healthProfileId: updatedProfile.id,
              },
            }));
          }
          sileo.success({ title: "Mesures enregistrées avec succès." });
          return;
        }

        const createdProfile = await createHealthProfile({
          userId: profileId,
          height: parsedHeight,
          heightMeasuredAt: heightMeasuredAtIso,
          weight: parsedWeight,
          weightMeasuredAt: weightMeasuredAtIso,
        });

        if (createdProfile?.id) {
          setMeasuresByProfileId((prev) => ({
            ...prev,
            [profileId]: {
              ...prev[profileId],
              healthProfileId: createdProfile.id,
            },
          }));
        }
        sileo.success({ title: "Mesures enregistrées avec succès." });
      } catch {
        sileo.error({
          title: "Impossible d'enregistrer les mesures pour le moment.",
        });
      }
    },
    [measuresByProfileId, profileBeingEdited],
  );

  return (
    <>
      <QuestionnaireMeasuresStep
        profiles={profiles}
        measuresByProfileId={measuresByProfileId}
        onCompleteProfile={handleOpenProfileModal}
      />

      <MeasurementModal
        key={editingProfileId ?? "closed"}
        isOpen={editingProfileId !== null}
        profileName={profileBeingEdited?.name ?? "Profil"}
        initialData={formDataForModal}
        onClose={handleCloseModal}
        onSubmit={handleValidateMeasures}
      />

      <QuestionnaireStepNavigation
        previousHref={BASE_PATH}
        nextHref={`${BASE_PATH}/maladies`}
      />
    </>
  );
}
