"use client";

import MeasurementProfileCard, {
  MeasurementProfileCardSkeleton,
} from "@/app/components/molecules/MeasurementProfileCard";

export interface MeasureProfileItem {
  id: string;
  name: string;
  avatarUrl?: string;
  color?: string;
}

export interface ProfileMeasureData {
  height?: string;
  heightMeasuredAt?: string;
  weight?: string;
  weightMeasuredAt?: string;
}

interface QuestionnaireMeasuresStepProps {
  profiles: MeasureProfileItem[];
  measuresByProfileId: Record<string, ProfileMeasureData>;
  onCompleteProfile: (id: string) => void;
  loading?: boolean;
}

export default function QuestionnaireMeasuresStep({
  profiles,
  measuresByProfileId,
  onCompleteProfile,
  loading = false,
}: QuestionnaireMeasuresStepProps) {
  if (loading) {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <MeasurementProfileCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center gap-4 md:gap-6">
        {profiles.map((profile) => {
          const profileMeasures = measuresByProfileId[profile.id];

          return (
            <MeasurementProfileCard
              key={profile.id}
              name={profile.name}
              avatarUrl={profile.avatarUrl}
              color={profile.color}
              heightValue={
                profileMeasures?.height ? `${profileMeasures.height} cm` : undefined
              }
              weightValue={
                profileMeasures?.weight ? `${profileMeasures.weight} kg` : undefined
              }
              onComplete={() => onCompleteProfile(profile.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
