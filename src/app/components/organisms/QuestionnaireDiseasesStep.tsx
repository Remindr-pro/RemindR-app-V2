"use client";

import DiseaseProfileCard, {
  DiseaseProfileCardSkeleton,
} from "@/app/components/molecules/DiseaseProfileCard";

export interface DiseaseProfileItem {
  id: string;
  name: string;
  avatarUrl?: string;
  color?: string;
}

export interface ProfileDiseaseData {
  allergies: string[];
  chronicConditions: string[];
  medications: string[];
}

interface QuestionnaireDiseasesStepProps {
  profiles: DiseaseProfileItem[];
  diseasesByProfileId: Record<string, ProfileDiseaseData>;
  onCompleteProfile: (id: string) => void;
  loading?: boolean;
}

export default function QuestionnaireDiseasesStep({
  profiles,
  diseasesByProfileId,
  onCompleteProfile,
  loading = false,
}: QuestionnaireDiseasesStepProps) {
  if (loading) {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center gap-4 md:gap-6">
          {[1, 2, 3].map((i) => (
            <DiseaseProfileCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center gap-4 md:gap-6">
        {profiles.map((profile) => {
          const profileDiseases = diseasesByProfileId[profile.id];

          return (
            <DiseaseProfileCard
              key={profile.id}
              name={profile.name}
              avatarUrl={profile.avatarUrl}
              color={profile.color}
              allergiesLabel={
                profileDiseases?.allergies?.length
                  ? `${profileDiseases.allergies.length} allergie(s)`
                  : "Allergies"
              }
              diseasesLabel={
                profileDiseases?.chronicConditions?.length
                  ? `${profileDiseases.chronicConditions.length} maladie(s)`
                  : "Maladies"
              }
              onComplete={() => onCompleteProfile(profile.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
