"use client";

import HabitsProfileCard from "@/app/components/molecules/HabitsProfileCard";

export interface HabitsProfileItem {
  id: string;
  name: string;
  avatarUrl?: string;
  color?: string;
}

export interface ProfileHabitsData {
  sportRecurrence?: string;
  dietType?: string;
  addictions?: string[];
}

interface QuestionnaireHabitudesStepProps {
  profiles: HabitsProfileItem[];
  habitsByProfileId: Record<string, ProfileHabitsData>;
  onCompleteProfile: (id: string) => void;
}

export default function QuestionnaireHabitudesStep({
  profiles,
  habitsByProfileId,
  onCompleteProfile,
}: QuestionnaireHabitudesStepProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center gap-4 md:gap-6">
        {profiles.map((profile) => {
          const habits = habitsByProfileId[profile.id];

          return (
            <HabitsProfileCard
              key={profile.id}
              name={profile.name}
              avatarUrl={profile.avatarUrl}
              color={profile.color}
              hasSport={!!habits?.sportRecurrence}
              hasFood={!!habits?.dietType}
              hasAddictions={!!habits?.addictions?.length}
              onComplete={() => onCompleteProfile(profile.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
