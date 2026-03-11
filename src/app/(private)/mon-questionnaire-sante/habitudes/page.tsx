"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import QuestionnaireHabitudesStep, {
  type HabitsProfileItem,
  type ProfileHabitsData,
} from "@/app/components/organisms/QuestionnaireHabitudesStep";
import HabitsModal, {
  type HabitsFormData,
} from "@/app/components/organisms/HabitsModal";
import {
  getQuestionnaireFamilyMembers,
  type QuestionnaireFamilyMember,
} from "@/app/actions/family";
import {
  getMyHealthProfile,
  getHealthProfileByUserId,
  createHealthProfile,
  updateHealthProfile,
} from "@/app/actions/health";
import { useAuth } from "@/lib/auth-provider";
import type { User } from "@/lib/auth-provider";
import { AuthService } from "@/lib/auth-service";
import { sileo } from "sileo";
import { BASE_PATH } from "@/app/(private)/mon-questionnaire-sante/constants";

function userToHabitsProfile(user: User): HabitsProfileItem {
  return {
    id: user.id,
    name: [user.firstName, user.lastName].filter(Boolean).join(" ") || "Moi",
    avatarUrl: user.profilePictureUrl ?? undefined,
    color: user.profileColor ?? undefined,
  };
}

function familyMemberToHabitsProfile(
  member: QuestionnaireFamilyMember,
): HabitsProfileItem {
  return {
    id: member.id,
    name:
      [member.firstName, member.lastName].filter(Boolean).join(" ") || "Proche",
    avatarUrl: member.profilePictureUrl ?? undefined,
    color: member.profileColor ?? undefined,
  };
}

export default function QuestionnaireHabitudesPage() {
  const { user, refreshUser } = useAuth();
  const [familyProfiles, setFamilyProfiles] = useState<HabitsProfileItem[]>([]);
  const [habitsByProfileId, setHabitsByProfileId] = useState<
    Record<string, ProfileHabitsData>
  >({});
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      if (!user?.id) return;

      try {
        const members = (await getQuestionnaireFamilyMembers())
          .filter((member) => member.isActive)
          .filter((member) => member.id !== user.id)
          .map(familyMemberToHabitsProfile);

        setFamilyProfiles(members);
      } catch {
        setFamilyProfiles([]);
      }
    };

    fetchFamilyMembers();
  }, [user?.id]);

  const profiles = useMemo(() => {
    const main = user ? userToHabitsProfile(user) : null;

    return main ? [main, ...familyProfiles] : familyProfiles;
  }, [user, familyProfiles]);

  useEffect(() => {
    let isCancelled = false;

    const fetchHabits = async () => {
      if (!user?.id || profiles.length === 0) return;

      const entries = await Promise.all(
        profiles.map(async (profile) => {
          try {
            const healthProfile =
              profile.id === user.id
                ? await getMyHealthProfile()
                : await getHealthProfileByUserId(profile.id);

            const data: ProfileHabitsData = {};

            if (healthProfile?.sportRecurrence)
              data.sportRecurrence = healthProfile.sportRecurrence;
            if (healthProfile?.dietType) data.dietType = healthProfile.dietType;
            if (healthProfile?.addictions?.length)
              data.addictions = healthProfile.addictions;

            return [
              profile.id,
              Object.keys(data).length ? data : undefined,
            ] as const;
          } catch {
            return [profile.id, undefined] as const;
          }
        }),
      );

      if (isCancelled) return;

      const next: Record<string, ProfileHabitsData> = {};

      entries.forEach(([id, data]) => {
        if (data) next[id] = data;
      });

      setHabitsByProfileId(next);
    };

    fetchHabits();

    return () => {
      isCancelled = true;
    };
  }, [profiles, user?.id]);

  const profileBeingEdited = useMemo(
    () => profiles.find((profile) => profile.id === editingProfileId) ?? null,
    [profiles, editingProfileId],
  );

  const formDataForModal = useMemo<HabitsFormData | undefined>(() => {
    if (!profileBeingEdited) return undefined;

    const data = habitsByProfileId[profileBeingEdited.id];
    if (!data) return undefined;

    return {
      sportRecurrence: data.sportRecurrence ?? "",
      dietType: data.dietType ?? "",
      addictions: data.addictions ?? [],
    };
  }, [profileBeingEdited, habitsByProfileId]);

  const handleOpenProfileModal = useCallback((profileId: string) => {
    setEditingProfileId(profileId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingProfileId(null);
  }, []);

  const handleValidateHabits = useCallback(
    async (data: HabitsFormData) => {
      if (!profileBeingEdited) return;

      const profileId = profileBeingEdited.id;
      const nextData: ProfileHabitsData = {
        sportRecurrence: data.sportRecurrence || undefined,
        dietType: data.dietType || undefined,
        addictions: data.addictions.length > 0 ? data.addictions : undefined,
      };

      setHabitsByProfileId((prev) => ({
        ...prev,
        [profileId]: nextData,
      }));
      setEditingProfileId(null);

      const habitsPayload = {
        sportRecurrence: nextData.sportRecurrence ?? null,
        dietType: nextData.dietType ?? null,
        addictions: nextData.addictions ?? [],
      };

      try {
        const healthProfile =
          profileId === user?.id
            ? await getMyHealthProfile()
            : await getHealthProfileByUserId(profileId);

        if (healthProfile) {
          await updateHealthProfile(healthProfile.id, habitsPayload);

          sileo.success({ title: "Habitudes enregistrées." });
        } else {
          await createHealthProfile({
            userId: profileId,
            ...habitsPayload,
          });

          sileo.success({ title: "Habitudes enregistrées." });
        }
      } catch {
        sileo.error({
          title: "Impossible d'enregistrer les habitudes pour le moment.",
        });
      }
    },
    [profileBeingEdited, user],
  );

  return (
    <>
      <QuestionnaireHabitudesStep
        profiles={profiles}
        habitsByProfileId={habitsByProfileId}
        onCompleteProfile={handleOpenProfileModal}
      />

      <HabitsModal
        key={editingProfileId ?? "closed"}
        isOpen={editingProfileId !== null}
        profileName={profileBeingEdited?.name ?? "Profil"}
        initialData={formDataForModal}
        onClose={handleCloseModal}
        onSubmit={handleValidateHabits}
      />

      <QuestionnaireStepNavigation
        previousHref={`${BASE_PATH}/maladies`}
        nextHref="/dashboard"
        nextLabel="Terminer le questionnaire"
        onNextClick={async () => {
          try {
            await AuthService.updateMe({ profileCompleted: true });
            await refreshUser();
          } catch {
            sileo.error({
              title: "Impossible de finaliser le questionnaire pour le moment.",
            });
            throw new Error("updateMe failed");
          }
        }}
      />
    </>
  );
}
