"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import QuestionnaireProfilesStep from "@/app/components/organisms/QuestionnaireProfilesStep";
import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import ProfileEditModal from "@/app/components/organisms/ProfileEditModal";
import type { ProfileItem } from "@/app/components/organisms/QuestionnaireProfilesStep";
import type { ProfileEditFormData } from "@/app/components/organisms/ProfileEditModal";
import {
  getQuestionnaireFamilyMembers,
  type QuestionnaireFamilyMember,
} from "@/app/actions/family";
import { AuthService } from "@/lib/auth-service";
import { useAuth } from "@/lib/auth-provider";
import type { User } from "@/lib/auth-provider";
import { BASE_PATH } from "./constants";

function formGenderToProfileItem(
  value: string,
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
  gender: string | null | undefined,
): "Femme" | "Homme" | "Non précisé" {
  if (!gender) return "Non précisé";

  const g = gender.toLowerCase();
  if (g === "homme" || g === "male" || g === "m") return "Homme";
  if (g === "femme" || g === "female" || g === "f") return "Femme";

  return "Non précisé";
}

function displayBirthdateToIso(displayDate: string): string | null {
  if (!displayDate) return null;

  const match = displayDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) return null;

  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
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
      user.genderActual ?? user.genderBirth ?? undefined,
    ),
    avatarUrl: user.profilePictureUrl ?? undefined,
    color: user.profileColor ?? undefined,
  };
}

function mapRoleToProfileLabel(role: string): string {
  if (role === "family_member") return "Proche";
  if (role === "professional") return "Professionnel";
  if (role === "admin") return "Administrateur";
  return "Proche";
}

function familyUserToProfileItem(
  member: QuestionnaireFamilyMember,
): ProfileItem {
  return {
    id: member.id,
    name:
      [member.firstName, member.lastName].filter(Boolean).join(" ") || "Proche",
    role: mapRoleToProfileLabel(member.role),
    birthdate: formatBirthdate(member.dateOfBirth),
    gender: mapGenderToProfile(member.genderActual ?? member.genderBirth),
    avatarUrl: member.profilePictureUrl ?? undefined,
    color: member.profileColor ?? undefined,
  };
}

export default function MonQuestionnaireSanteProfilsPage() {
  const { user } = useAuth();
  const mainProfile = useMemo(
    () => (user ? userToProfileItem(user) : null),
    [user],
  );
  const [showMainProfile, setShowMainProfile] = useState(true);
  const [additionalProfiles, setAdditionalProfiles] = useState<ProfileItem[]>(
    [],
  );
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
  const [mainProfileOverride, setMainProfileOverride] = useState<{
    firstName: string;
    lastName: string;
    birthdate: string;
    gender: "Femme" | "Homme" | "Non précisé";
    color?: string;
  } | null>(null);

  useEffect(() => {
    const fetchExistingFamilyMembers = async () => {
      if (!user?.id) return;

      try {
        const members = (await getQuestionnaireFamilyMembers())
          .filter((member) => member.isActive)
          .filter((member) => member.id !== user.id)
          .map(familyUserToProfileItem);

        setAdditionalProfiles(members);
      } catch {
        // On garde l'état local si le chargement échoue.
      }
    };

    fetchExistingFamilyMembers();
  }, [user?.id]);

  const displayedMainProfile = useMemo(() => {
    if (!mainProfile) return null;
    if (!mainProfileOverride) return mainProfile;
    return {
      ...mainProfile,
      name:
        [mainProfileOverride.firstName, mainProfileOverride.lastName]
          .filter(Boolean)
          .join(" ") || mainProfile.name,
      birthdate: mainProfileOverride.birthdate || mainProfile.birthdate,
      gender: mainProfileOverride.gender,
      color: mainProfileOverride.color ?? mainProfile.color,
    };
  }, [mainProfile, mainProfileOverride]);

  const profiles = useMemo(
    () =>
      displayedMainProfile && showMainProfile
        ? [displayedMainProfile, ...additionalProfiles]
        : additionalProfiles,
    [displayedMainProfile, showMainProfile, additionalProfiles],
  );

  const profileBeingEdited = useMemo(
    () => profiles.find((p) => p.id === editingProfileId) ?? null,
    [profiles, editingProfileId],
  );

  const handleCompleteProfile = useCallback((id: string) => {
    setEditingProfileId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingProfileId(null);
  }, []);

  const handleValidateProfile = useCallback(
    async (profileId: string, data: ProfileEditFormData) => {
      const gender = formGenderToProfileItem(data.genderBirth);

      if (mainProfile?.id === profileId) {
        const birthDateIso = displayBirthdateToIso(data.birthdate);
        const genderBirth =
          data.genderBirth === "non_precise" || data.genderBirth === ""
            ? ""
            : data.genderBirth;
        const genderActual =
          data.genderActual === "non_precise" || data.genderActual === ""
            ? ""
            : data.genderActual;

        try {
          await AuthService.updateMe({
            firstName: data.firstName || undefined,
            lastName: data.lastName || undefined,
            dateOfBirth: birthDateIso || undefined,
            genderBirth: genderBirth || undefined,
            genderActual: genderActual || undefined,
            profileLink: data.link || "moi",
            profileColor: data.color || undefined,
            profileCompleted: true,
          });
        } catch {
          // On garde la mise à jour locale même si l'API échoue.
        }

        setMainProfileOverride({
          firstName: data.firstName,
          lastName: data.lastName,
          birthdate: data.birthdate,
          gender: formGenderToProfileItem(
            data.genderActual || data.genderBirth,
          ),
          color: data.color || undefined,
        });
      } else {
        setAdditionalProfiles((prev) =>
          prev.map((p) =>
            p.id === profileId
              ? {
                  ...p,
                  name: [data.firstName, data.lastName]
                    .filter(Boolean)
                    .join(" "),
                  birthdate: data.birthdate,
                  gender,
                  color: data.color || undefined,
                }
              : p,
          ),
        );
      }
    },
    [mainProfile?.id],
  );

  const handleRemoveProfile = useCallback(
    (id: string) => {
      if (mainProfile?.id === id) {
        setShowMainProfile(false);
      } else {
        setAdditionalProfiles((prev) => prev.filter((p) => p.id !== id));
      }
    },
    [mainProfile?.id],
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
        color: "#1aa484",
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
