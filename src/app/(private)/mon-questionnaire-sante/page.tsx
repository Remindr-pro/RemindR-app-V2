"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QuestionnaireProfilesStep from "@/app/components/organisms/QuestionnaireProfilesStep";
import QuestionnaireStepNavigation from "@/app/components/molecules/QuestionnaireStepNavigation";
import ProfileEditModal from "@/app/components/organisms/ProfileEditModal";
import Button from "@/app/components/atoms/Button";
import type { ProfileItem } from "@/app/components/organisms/QuestionnaireProfilesStep";
import type { ProfileEditFormData } from "@/app/components/organisms/ProfileEditModal";
import {
  getQuestionnaireFamilyMembers,
  type QuestionnaireFamilyMember,
} from "@/app/actions/family";
import { AuthService } from "@/lib/auth-service";
import { useAuth } from "@/lib/auth-provider";
import type { User } from "@/lib/auth-provider";
import { sileo } from "sileo";
import { BASE_PATH, PROFILE_ID_SEARCH_PARAM } from "@/app/(private)/mon-questionnaire-sante/constants";

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

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

const PROFILE_LINK_LABELS: Record<string, string> = {
  moi: "Moi-même",
  conjoint: "Conjoint(e)",
  enfant: "Enfant",
  parent: "Parent",
  autre: "Autre",
};

function mapProfileLinkToLabel(profileLink: string | null | undefined): string | null {
  if (!profileLink || typeof profileLink !== "string") return null;
  const key = profileLink.trim().toLowerCase();
  return PROFILE_LINK_LABELS[key] ?? null;
}

function mapRoleToProfileLabel(role: string): string {
  if (role === "family_member") return "Proche";
  if (role === "professional") return "Professionnel";
  if (role === "admin") return "Administrateur";
  return "Proche";
}

function userToProfileItem(user: User): ProfileItem {
  return {
    id: user.id,
    name:
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      "Profil principal",
    role:
      mapProfileLinkToLabel(user.profileLink ?? "moi") ?? "Profil principal",
    birthdate: formatBirthdate(user.dateOfBirth ?? undefined),
    gender: mapGenderToProfile(
      user.genderActual ?? user.genderBirth ?? undefined,
    ),
    avatarUrl: user.profilePictureUrl ?? undefined,
    color: user.profileColor ?? undefined,
    link: user.profileLink ?? "moi",
    email: user.email,
  };
}

function familyUserToProfileItem(
  member: QuestionnaireFamilyMember,
): ProfileItem {
  return {
    id: member.id,
    name:
      [member.firstName, member.lastName].filter(Boolean).join(" ") || "Proche",
    role:
      mapProfileLinkToLabel(member.profileLink) ??
      mapRoleToProfileLabel(member.role),
    birthdate: formatBirthdate(member.dateOfBirth),
    gender: mapGenderToProfile(member.genderActual ?? member.genderBirth),
    avatarUrl: member.profilePictureUrl ?? undefined,
    color: member.profileColor ?? undefined,
    link: member.profileLink ?? undefined,
    email: member.email,
  };
}

export default function MonQuestionnaireSanteProfilsPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mainProfile = useMemo(
    () => (user ? userToProfileItem(user) : null),
    [user],
  );
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
  const [pendingDeletion, setPendingDeletion] = useState<{
    id: string;
    name: string;
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
      displayedMainProfile
        ? [displayedMainProfile, ...additionalProfiles]
        : additionalProfiles,
    [displayedMainProfile, additionalProfiles],
  );

  const profileBeingEdited = useMemo(
    () => profiles.find((p) => p.id === editingProfileId) ?? null,
    [profiles, editingProfileId],
  );

  useEffect(() => {
    const profileIdFromUrl = searchParams.get(PROFILE_ID_SEARCH_PARAM);
    if (!profileIdFromUrl || profiles.length === 0) return;
    const exists = profiles.some((p) => p.id === profileIdFromUrl);
    if (exists) {
      setEditingProfileId(profileIdFromUrl);
      router.replace(BASE_PATH, { scroll: false });
    }
  }, [searchParams, profiles, router]);

  const handleCompleteProfile = useCallback((id: string) => {
    setEditingProfileId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingProfileId(null);
  }, []);

  const handleValidateProfile = useCallback(
    async (profileId: string, data: ProfileEditFormData) => {
      const gender = formGenderToProfileItem(data.genderBirth);
      const birthDateIso = displayBirthdateToIso(data.birthdate);
      const genderBirth =
        data.genderBirth === "non_precise" || data.genderBirth === ""
          ? ""
          : data.genderBirth;
      const genderActual =
        data.genderActual === "non_precise" || data.genderActual === ""
          ? ""
          : data.genderActual;

      if (mainProfile?.id === profileId) {
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
        if (!birthDateIso || !data.firstName || !data.lastName) {
          return;
        }

        const shouldCreateConnectedAccount =
          data.createLogin && !!data.link && data.link !== "moi";

        const payload = {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: birthDateIso,
          genderBirth: genderBirth || undefined,
          genderActual: genderActual || undefined,
          profileLink: data.link || undefined,
          profileColor: data.color || undefined,
          email: shouldCreateConnectedAccount
            ? data.email || undefined
            : undefined,
          createLogin: shouldCreateConnectedAccount,
          password: shouldCreateConnectedAccount
            ? data.password || undefined
            : undefined,
        };

        try {
          if (isUuid(profileId)) {
            const response = await AuthService.updateFamilyMember(
              profileId,
              payload,
            );
            const updatedId = response?.data?.id || profileId;
            setAdditionalProfiles((prev) =>
              prev.map((p) =>
                p.id === profileId
                  ? {
                      ...p,
                      id: updatedId,
                      role:
                        mapProfileLinkToLabel(data.link) ??
                        mapRoleToProfileLabel(p.role),
                      name: [data.firstName, data.lastName]
                        .filter(Boolean)
                        .join(" "),
                      birthdate: data.birthdate,
                      gender,
                      color: data.color || undefined,
                      link: data.link || undefined,
                      email: data.email || p.email,
                    }
                  : p,
              ),
            );
          } else {
            const response = await AuthService.createFamilyMember(payload);
            const createdId = response?.data?.member?.id || profileId;
            const accountEmail = response?.data?.account?.email;
            setAdditionalProfiles((prev) =>
              prev.map((p) =>
                p.id === profileId
                  ? {
                      ...p,
                      id: createdId,
                      role:
                        mapProfileLinkToLabel(data.link) ??
                        mapRoleToProfileLabel(p.role),
                      name: [data.firstName, data.lastName]
                        .filter(Boolean)
                        .join(" "),
                      birthdate: data.birthdate,
                      gender,
                      color: data.color || undefined,
                      link: data.link || undefined,
                      email: accountEmail || data.email || p.email,
                    }
                  : p,
              ),
            );
            const normalizedToastGender = (
              data.genderActual ||
              data.genderBirth ||
              ""
            ).toLowerCase();
            const addedLabel =
              normalizedToastGender === "femme"
                ? "ajoutée"
                : normalizedToastGender === "homme"
                  ? "ajouté"
                  : "ajouté(e)";
            sileo.success({
              title: `${data.firstName} a bien été ${addedLabel} aux profils.`,
            });
          }
        } catch {
          // En cas d'échec API, on ne marque pas localement comme "sauvegardé".
        }
      }
    },
    [mainProfile?.id],
  );

  const handleRemoveProfile = useCallback(
    (id: string) => {
      const profile = profiles.find((p) => p.id === id);
      if (!profile) return;
      setPendingDeletion({ id, name: profile.name || "ce profil" });
    },
    [profiles],
  );

  const handleCancelDeletion = useCallback(() => {
    setPendingDeletion(null);
  }, []);

  const handleConfirmDeletion = useCallback(async () => {
    if (!pendingDeletion) return;

    const id = pendingDeletion.id;
    const deletedProfile = profiles.find((profile) => profile.id === id);

    if (mainProfile?.id === id) {
      setPendingDeletion(null);
      return;
    }

    try {
      if (isUuid(id)) {
        await AuthService.deleteFamilyMember(id);
      }
      setAdditionalProfiles((prev) => prev.filter((p) => p.id !== id));
      const deletedLabel =
        deletedProfile?.gender === "Femme"
          ? "supprimée"
          : deletedProfile?.gender === "Homme"
            ? "supprimé"
            : "supprimé(e)";

      sileo.success({
        title: `${pendingDeletion.name} a bien été ${deletedLabel} des profils.`,
      });
    } catch {
      // Si suppression API impossible, on conserve la carte.
    } finally {
      setPendingDeletion(null);
    }
  }, [mainProfile?.id, pendingDeletion, profiles]);

  const handleAddProfile = useCallback(() => {
    const newId = String(Date.now());
    setAdditionalProfiles((prev) => [
      ...prev,
      {
        id: newId,
        name: "Nouveau profil",
        role: "Profil à compléter",
        birthdate: "--/--/----",
        gender: "Non précisé",
        color: "#1aa484",
        link: "",
        email: "",
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

      {pendingDeletion && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-dark/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-light rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-dark font-inclusive mb-3">
              Confirmation de suppression
            </h3>
            <p className="text-sm text-gray-4 font-inclusive mb-6">
              Etes-vous sur de vouloir supprimer le profil{" "}
              <span className="font-semibold text-dark">
                {pendingDeletion.name}
              </span>{" "}
              ?
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelDeletion}
              >
                Annuler
              </Button>
              <Button
                type="button"
                variant="green"
                onClick={handleConfirmDeletion}
              >
                Confirmer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
