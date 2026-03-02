"use server";

import api from "@/lib/api";

type BorderColor = "purple" | "blue" | "pink" | "orange";

const BORDER_COLORS: BorderColor[] = ["purple", "blue", "pink", "orange"];

interface FamilyApiUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  dateOfBirth: string;
  genderBirth?: string | null;
  genderActual?: string | null;
  profilePictureUrl?: string | null;
  healthProfile?: {
    bloodType?: string | null;
    height?: number | null;
    weight?: number | null;
    allergies: string[];
    chronicConditions: string[];
    medications: string[];
  } | null;
}

interface FamilyApiResponse {
  success: boolean;
  data: {
    users: FamilyApiUser[];
  };
}

interface MeApiResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    dateOfBirth?: string | null;
    genderBirth?: string | null;
    genderActual?: string | null;
    profilePictureUrl?: string | null;
  } | null;
}

export interface FamilyMemberViewModel {
  id: string;
  name: string;
  role: string;
  gender: "Femme" | "Homme" | "Non renseigné";
  birthdate: string;
  email: string;
  profileCompletion: number;
  borderColor: BorderColor;
}

export interface DashboardFamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface QuestionnaireFamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  dateOfBirth: string;
  genderBirth?: string | null;
  genderActual?: string | null;
  profilePictureUrl?: string | null;
}

function mapGender(
  gender: string | null | undefined,
): "Femme" | "Homme" | "Non renseigné" {
  if (!gender) return "Non renseigné";

  const normalizedGender = gender.toLowerCase();
  if (["male", "m", "homme"].includes(normalizedGender)) return "Homme";
  if (["female", "f", "femme"].includes(normalizedGender)) return "Femme";

  return "Non renseigné";
}

function formatBirthdate(
  date: string,
  gender: string | null | undefined,
): string {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime()))
    return "Date de naissance non renseignée";

  const mappedGender = mapGender(gender);
  const birthPrefix =
    mappedGender === "Homme"
      ? "Né"
      : mappedGender === "Femme"
        ? "Née"
        : "Né(e)";

  return `${birthPrefix} le ${parsedDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

function mapRole(role: string, isCurrentUser: boolean): string {
  if (isCurrentUser) return "Profil principal";

  if (role === "family_member") return "Proche";
  if (role === "professional") return "Professionnel";
  if (role === "admin") return "Administrateur";

  return role;
}

function computeProfileCompletion(user: FamilyApiUser): number {
  const profile = user.healthProfile;
  const fieldsToCheck = [
    !!user.dateOfBirth,
    !!profile?.bloodType,
    profile?.height !== undefined && profile?.height !== null,
    profile?.weight !== undefined && profile?.weight !== null,
    (profile?.allergies?.length ?? 0) > 0,
    (profile?.chronicConditions?.length ?? 0) > 0,
    (profile?.medications?.length ?? 0) > 0,
  ];

  const completedFields = fieldsToCheck.filter(Boolean).length;

  return Math.round((completedFields / fieldsToCheck.length) * 100);
}

export async function getMyFamilyMembers(): Promise<FamilyMemberViewModel[]> {
  const mePayload = await api.get<MeApiResponse>("/auth/me", {
    next: { tags: ["user"] },
  });
  const currentUserId = mePayload.data?.id;

  let users: FamilyApiUser[] = [];

  try {
    const familyPayload = await api.get<FamilyApiResponse>("/families/me", {
      next: { tags: ["family"] },
    });

    users = (familyPayload.data?.users || []).filter(
      (member) => member.isActive,
    );
  } catch {
    users = [];
  }

  if (users.length === 0 && mePayload.data) {
    users = [
      {
        id: mePayload.data.id,
        email: mePayload.data.email,
        firstName: mePayload.data.firstName,
        lastName: mePayload.data.lastName,
        role: mePayload.data.role,
        isActive: true,
        dateOfBirth: mePayload.data.dateOfBirth || "",
        genderBirth: mePayload.data.genderBirth,
        genderActual: mePayload.data.genderActual,
      },
    ];
  }

  const sortedUsers = users.sort((a, b) => {
    const aIsCurrentUser = a.id === currentUserId;
    const bIsCurrentUser = b.id === currentUserId;
    if (aIsCurrentUser && !bIsCurrentUser) return -1;
    if (!aIsCurrentUser && bIsCurrentUser) return 1;

    return `${a.firstName} ${a.lastName}`.localeCompare(
      `${b.firstName} ${b.lastName}`,
      "fr-FR",
    );
  });

  return sortedUsers.map((member, index) => ({
    id: member.id,
    name: `${member.firstName} ${member.lastName}`,
    role: mapRole(member.role, member.id === currentUserId),
    gender: mapGender(member.genderActual ?? member.genderBirth),
    birthdate: formatBirthdate(
      member.dateOfBirth,
      member.genderActual ?? member.genderBirth,
    ),
    email: member.email,
    profileCompletion: computeProfileCompletion(member),
    borderColor: BORDER_COLORS[index % BORDER_COLORS.length],
  }));
}

export async function getDashboardFamilyMembers(): Promise<
  DashboardFamilyMember[]
> {
  const mePayload = await api.get<MeApiResponse>("/auth/me", {
    next: { tags: ["user"] },
  });

  let users: FamilyApiUser[] = [];

  try {
    const familyPayload = await api.get<FamilyApiResponse>("/families/me", {
      next: { tags: ["family"] },
    });

    users = (familyPayload.data?.users || []).filter(
      (member) => member.isActive,
    );
  } catch {
    users = [];
  }

  if (users.length === 0 && mePayload.data) {
    users = [
      {
        id: mePayload.data.id,
        email: mePayload.data.email,
        firstName: mePayload.data.firstName,
        lastName: mePayload.data.lastName,
        role: mePayload.data.role,
        isActive: true,
        dateOfBirth: mePayload.data.dateOfBirth || "",
        genderBirth: mePayload.data.genderBirth,
        genderActual: mePayload.data.genderActual,
      },
    ];
  }

  const currentUserId = mePayload.data?.id;

  return users
    .sort((a, b) => {
      const aIsCurrentUser = a.id === currentUserId;
      const bIsCurrentUser = b.id === currentUserId;
      if (aIsCurrentUser && !bIsCurrentUser) return -1;
      if (!aIsCurrentUser && bIsCurrentUser) return 1;
      return `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`,
        "fr-FR",
      );
    })
    .map((member) => ({
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      isActive: member.isActive,
    }));
}

export async function getQuestionnaireFamilyMembers(): Promise<
  QuestionnaireFamilyMember[]
> {
  const mePayload = await api.get<MeApiResponse>("/auth/me", {
    next: { tags: ["user"] },
  });

  let users: FamilyApiUser[] = [];

  try {
    const familyPayload = await api.get<FamilyApiResponse>("/families/me", {
      next: { tags: ["family"] },
    });

    users = (familyPayload.data?.users || []).filter(
      (member) => member.isActive,
    );
  } catch {
    users = [];
  }

  if (users.length === 0 && mePayload.data) {
    users = [
      {
        id: mePayload.data.id,
        email: mePayload.data.email,
        firstName: mePayload.data.firstName,
        lastName: mePayload.data.lastName,
        role: mePayload.data.role,
        isActive: true,
        dateOfBirth: mePayload.data.dateOfBirth || "",
        genderBirth: mePayload.data.genderBirth,
        genderActual: mePayload.data.genderActual,
        profilePictureUrl: mePayload.data.profilePictureUrl,
      },
    ];
  }

  return users
    .sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`,
        "fr-FR",
      ),
    )
    .map((member) => ({
      id: member.id,
      firstName: member.firstName,
      lastName: member.lastName,
      role: member.role,
      isActive: member.isActive,
      dateOfBirth: member.dateOfBirth,
      genderBirth: member.genderBirth,
      genderActual: member.genderActual,
      profilePictureUrl: member.profilePictureUrl,
    }));
}
