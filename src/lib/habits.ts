/** Données habitudes telles que stockées dans healthProfile.preferences */
export interface HealthProfileHabitsPreferences {
  sportRecurrence?: string;
  dietType?: string;
  addictions?: string[];
}

/** Extrait les habitudes depuis preferences (pour affichage / formulaire). */
export function getHabitsFromPreferences(
  preferences: Record<string, unknown> | null | undefined,
): HealthProfileHabitsPreferences {
  if (!preferences || typeof preferences !== "object") {
    return {};
  }
  const p = preferences as Record<string, unknown>;
  return {
    sportRecurrence:
      typeof p.sportRecurrence === "string" ? p.sportRecurrence : undefined,
    dietType: typeof p.dietType === "string" ? p.dietType : undefined,
    addictions: Array.isArray(p.addictions)
      ? (p.addictions as string[])
      : undefined,
  };
}
