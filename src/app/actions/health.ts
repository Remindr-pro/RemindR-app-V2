"use server";

import api, { ApiError } from "@/lib/api";

export interface HealthProfilePayload {
  userId?: string;
  bloodType?: string;
  height?: number;
  heightMeasuredAt?: string;
  weight?: number;
  weightMeasuredAt?: string;
  allergies?: string[];
  chronicConditions?: string[];
  medications?: string[];
  sportRecurrence?: string | null;
  dietType?: string | null;
  addictions?: string[];
  preferences?: Record<string, unknown>;
}

export interface HealthProfileData {
  id: string;
  userId: string;
  allergies?: string[];
  chronicConditions?: string[];
  medications?: string[];
  height: number | null;
  heightMeasuredAt?: string | null;
  weight: number | null;
  weightMeasuredAt?: string | null;
  sportRecurrence?: string | null;
  dietType?: string | null;
  addictions?: string[];
  preferences?: Record<string, unknown> | null;
}

interface HealthProfileApiResponse {
  success: boolean;
  data: HealthProfileData;
}

export async function getMyHealthProfile(): Promise<HealthProfileData | null> {
  try {
    const payload = await api.get<HealthProfileApiResponse>(
      "/health-profiles/me",
      {
        next: { tags: ["health-profile"] },
      },
    );

    return payload.data ?? null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function getHealthProfileByUserId(
  userId: string,
): Promise<HealthProfileData | null> {
  try {
    const payload = await api.get<HealthProfileApiResponse>(
      `/health-profiles/${userId}`,
      {
        next: { tags: ["health-profile"] },
      },
    );

    return payload.data ?? null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createHealthProfile(
  data: HealthProfilePayload,
): Promise<HealthProfileData> {
  const payload = await api.post<HealthProfileApiResponse>(
    "/health-profiles",
    data,
  );

  return payload.data;
}

export async function updateHealthProfile(
  profileId: string,
  data: HealthProfilePayload,
): Promise<HealthProfileData> {
  const payload = await api.put<HealthProfileApiResponse>(
    `/health-profiles/${profileId}`,
    data,
  );

  return payload.data;
}
